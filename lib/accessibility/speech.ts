// Speech and Accessibility Services
// Text-to-Speech and Speech-to-Text utilities using Web APIs

// Types are declared in @/types/speech.d.ts

export interface VoiceSettings {
  pitch: number;
  rate: number;
  volume: number;
  voice?: string;
  language: string;
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  pitch: 1.0,
  rate: 1.0,
  volume: 1.0,
  language: 'en-US'
};

// Text-to-Speech Service
export class TextToSpeechService {
  private synthesis: SpeechSynthesis | null = null;
  private settings: VoiceSettings;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor(settings: VoiceSettings = DEFAULT_VOICE_SETTINGS) {
    this.settings = settings;
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
    }
  }

  // Get available voices
  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  // Get voices for a specific language
  getVoicesForLanguage(lang: string): SpeechSynthesisVoice[] {
    return this.getVoices().filter(voice => voice.lang.startsWith(lang));
  }

  // Speak text
  speak(text: string, onEnd?: () => void, onError?: (error: string) => void): void {
    if (!this.synthesis) {
      onError?.('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = this.settings.pitch;
    utterance.rate = this.settings.rate;
    utterance.volume = this.settings.volume;
    utterance.lang = this.settings.language;

    // Set voice if specified
    if (this.settings.voice) {
      const voices = this.getVoices();
      const selectedVoice = voices.find(v => v.name === this.settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onend = () => onEnd?.();
    utterance.onerror = (event) => onError?.(event.error);

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  // Stop speaking
  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  // Pause speaking
  pause(): void {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  // Resume speaking
  resume(): void {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  // Check if currently speaking
  isSpeaking(): boolean {
    return this.synthesis?.speaking ?? false;
  }

  // Update settings
  updateSettings(settings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }
}

// Speech-to-Text Service using Web Speech API
export class SpeechToTextService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isListening: boolean = false;
  private language: string;

  constructor(language: string = 'en-US') {
    this.language = language;
    this.initializeRecognition();
  }

  private initializeRecognition(): void {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionConstructor) {
      this.recognition = new SpeechRecognitionConstructor();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;
    }
  }

  // Start listening
  startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError?: (error: string) => void,
    onEnd?: () => void
  ): void {
    if (!this.recognition) {
      onError?.('Speech recognition not supported');
      return;
    }

    if (this.isListening) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      onResult({
        transcript: result[0].transcript,
        confidence: result[0].confidence,
        isFinal: result.isFinal
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd?.();
    };

    this.recognition.start();
    this.isListening = true;
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Check if currently listening
  getIsListening(): boolean {
    return this.isListening;
  }

  // Update language
  setLanguage(language: string): void {
    this.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }
}

// Accessibility settings interface
export interface AccessibilitySettings {
  highContrast: boolean;
  textToSpeech: boolean;
  speechToText: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReaderOptimized: boolean;
  keyboardNavigation: boolean;
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  textToSpeech: false,
  speechToText: false,
  reducedMotion: false,
  fontSize: 'medium',
  screenReaderOptimized: false,
  keyboardNavigation: true
};

// Get CSS classes based on accessibility settings
export function getAccessibilityClasses(settings: AccessibilitySettings): string {
  const classes: string[] = [];

  if (settings.highContrast) {
    classes.push('high-contrast');
  }

  if (settings.reducedMotion) {
    classes.push('reduced-motion');
  }

  classes.push(`font-size-${settings.fontSize}`);

  return classes.join(' ');
}

// Font size multipliers
export const FONT_SIZE_MULTIPLIERS: Record<AccessibilitySettings['fontSize'], number> = {
  'small': 0.875,
  'medium': 1,
  'large': 1.25,
  'extra-large': 1.5
};
