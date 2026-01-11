// Azure Speech Services Integration
// Provides advanced speech-to-text and text-to-speech capabilities

export interface AzureSpeechConfig {
  subscriptionKey: string;
  region: string;
  endpoint?: string;
}

export interface SpeechRecognitionOptions {
  language: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export interface TextToSpeechOptions {
  text: string;
  language?: string;
  voice?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

// Azure Speech-to-Text Service
export class AzureSpeechToTextService {
  private config: AzureSpeechConfig | null = null;
  private recognitionContext: AudioContext | null = null;
  private recognitionStream: MediaStream | null = null;
  private recognitionSocket: WebSocket | null = null;

  constructor(config?: AzureSpeechConfig) {
    if (config) {
      this.config = config;
    } else if (typeof window !== 'undefined') {
      // Fallback to environment variables
      const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;
      if (subscriptionKey && region) {
        this.config = { subscriptionKey, region };
      }
    }
  }

  async startRecognition(options: SpeechRecognitionOptions): Promise<void> {
    if (!this.config) {
      options.onError?.('Azure Speech Services not configured');
      return;
    }

    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recognitionStream = stream;

      // Create audio context
      this.recognitionContext = new AudioContext({ sampleRate: 16000 });
      const source = this.recognitionContext.createMediaStreamSource(stream);
      const processor = this.recognitionContext.createScriptProcessor(4096, 1, 1);

      // Get access token
      const token = await this.getAccessToken();

      // Create WebSocket connection to Azure Speech Service
      const wsUrl = `wss://${this.config.region}.stt.speech.microsoft.com/speech/universal/v2?language=${options.language}&format=detailed`;
      const ws = new WebSocket(wsUrl, [], {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      this.recognitionSocket = ws;

      ws.onopen = () => {
        // Start sending audio
        processor.onaudioprocess = (e) => {
          if (ws.readyState === WebSocket.OPEN) {
            const audioData = e.inputBuffer.getChannelData(0);
            const pcm16 = this.convertFloat32ToPCM16(audioData);
            ws.send(pcm16.buffer);
          }
        };

        source.connect(processor);
        if (this.recognitionContext?.destination) {
          processor.connect(this.recognitionContext.destination);
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.RecognitionStatus === 'Success' && data.DisplayText) {
            options.onResult?.(data.DisplayText, true);
          } else if (data.Text && data.RecognitionStatus === 'Intermediate') {
            options.onResult?.(data.Text, false);
          }
        } catch (e) {
          // Ignore parse errors for non-JSON messages
        }
      };

      ws.onerror = () => {
        options.onError?.('Speech recognition error');
        this.stopRecognition();
      };

    } catch (error) {
      options.onError?.(`Failed to start recognition: ${error}`);
    }
  }

  stopRecognition(): void {
    if (this.recognitionStream) {
      this.recognitionStream.getTracks().forEach(track => track.stop());
      this.recognitionStream = null;
    }
    if (this.recognitionSocket) {
      this.recognitionSocket.close();
      this.recognitionSocket = null;
    }
    if (this.recognitionContext) {
      this.recognitionContext.close();
      this.recognitionContext = null;
    }
  }

  private async getAccessToken(): Promise<string> {
    if (!this.config) throw new Error('Azure Speech not configured');

    const response = await fetch(
      `https://${this.config.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    return await response.text();
  }

  private convertFloat32ToPCM16(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Array;
  }
}

// Azure Text-to-Speech Service
export class AzureTextToSpeechService {
  private config: AzureSpeechConfig | null = null;

  constructor(config?: AzureSpeechConfig) {
    if (config) {
      this.config = config;
    } else if (typeof window !== 'undefined') {
      const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
      const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;
      if (subscriptionKey && region) {
        this.config = { subscriptionKey, region };
      }
    }
  }

  async synthesizeSpeech(options: TextToSpeechOptions): Promise<Blob | null> {
    if (!this.config) {
      options.onError?.('Azure Speech Services not configured');
      return null;
    }

    try {
      const ssml = this.generateSSML(options.text, options.language || 'en-US', options.voice);
      
      const response = await fetch(
        `https://${this.config.region}.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          },
          body: ssml,
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      return audioBlob;
    } catch (error) {
      options.onError?.(`Speech synthesis failed: ${error}`);
      return null;
    }
  }

  async speak(options: TextToSpeechOptions): Promise<void> {
    const audioBlob = await this.synthesizeSpeech(options);
    if (!audioBlob) return;

    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    options.onStart?.();
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      options.onEnd?.();
    };
    
    audio.onerror = () => {
      options.onError?.('Audio playback failed');
      URL.revokeObjectURL(audioUrl);
    };

    await audio.play();
  }

  private generateSSML(text: string, language: string, voice?: string): string {
    // Default voices for common languages
    const defaultVoices: Record<string, string> = {
      'en-US': 'en-US-AriaNeural',
      'en-GB': 'en-GB-SoniaNeural',
      'es-ES': 'es-ES-ElviraNeural',
      'fr-FR': 'fr-FR-DeniseNeural',
      'de-DE': 'de-DE-KatjaNeural',
      'hi-IN': 'hi-IN-SwaraNeural',
      'zh-CN': 'zh-CN-XiaoxiaoNeural',
      'ja-JP': 'ja-JP-NanamiNeural',
      'ar-SA': 'ar-SA-ZariyahNeural',
    };

    const selectedVoice = voice || defaultVoices[language] || defaultVoices['en-US'];

    return `
      <speak version="1.0" xml:lang="${language}">
        <voice xml:lang="${language}" name="${selectedVoice}">
          ${this.escapeXml(text)}
        </voice>
      </speak>
    `.trim();
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  async getAvailableVoices(language?: string): Promise<any[]> {
    if (!this.config) return [];

    try {
      const response = await fetch(
        `https://${this.config.region}.tts.speech.microsoft.com/cognitiveservices/voices/list`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          },
        }
      );

      if (!response.ok) return [];

      const voices = await response.json();
      if (language) {
        return voices.filter((v: any) => v.Locale.toLowerCase().startsWith(language.toLowerCase()));
      }
      return voices;
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      return [];
    }
  }
}
