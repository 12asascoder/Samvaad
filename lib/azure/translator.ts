// Azure Translator Service Integration
// Provides multilingual translation capabilities for global accessibility

export interface AzureTranslatorConfig {
  subscriptionKey: string;
  endpoint: string;
  region?: string;
}

export interface TranslationOptions {
  text: string;
  from?: string; // Source language (auto-detect if not provided)
  to: string;    // Target language
}

export interface TranslationResult {
  text: string;
  detectedLanguage?: string;
  confidence?: number;
}

// Supported languages for Samvaad
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh-Hans', name: 'Chinese (Simplified)', nativeName: '中文(简体)' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
] as const;

export class AzureTranslatorService {
  private config: AzureTranslatorConfig | null = null;

  constructor(config?: AzureTranslatorConfig) {
    if (config) {
      this.config = config;
    } else if (typeof window !== 'undefined') {
      // Try to get from environment variables
      const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY;
      const endpoint = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT;
      const region = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_REGION;
      
      if (subscriptionKey && endpoint) {
        this.config = { subscriptionKey, endpoint, region };
      }
    }
  }

  async translate(options: TranslationOptions): Promise<TranslationResult> {
    if (!this.config) {
      throw new Error('Azure Translator not configured');
    }

    try {
      const url = new URL(`${this.config.endpoint}/translate`);
      url.searchParams.append('api-version', '3.0');
      url.searchParams.append('to', options.to);
      
      if (options.from) {
        url.searchParams.append('from', options.from);
      }

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Ocp-Apim-Subscription-Region': this.config.region || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            text: options.text,
          },
        ]),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Translation failed: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      const translation = result[0]?.translations[0];

      return {
        text: translation?.text || options.text,
        detectedLanguage: result[0]?.detectedLanguage?.language,
        confidence: result[0]?.detectedLanguage?.score,
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async detectLanguage(text: string): Promise<{ language: string; confidence: number }> {
    if (!this.config) {
      throw new Error('Azure Translator not configured');
    }

    try {
      const url = new URL(`${this.config.endpoint}/detect`);
      url.searchParams.append('api-version', '3.0');

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Ocp-Apim-Subscription-Region': this.config.region || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            text,
          },
        ]),
      });

      if (!response.ok) {
        throw new Error(`Language detection failed: ${response.statusText}`);
      }

      const result = await response.json();
      const detection = result[0];

      return {
        language: detection?.language || 'en',
        confidence: detection?.score || 0,
      };
    } catch (error) {
      console.error('Language detection error:', error);
      return { language: 'en', confidence: 0 };
    }
  }

  async translateBatch(
    texts: string[],
    to: string,
    from?: string
  ): Promise<TranslationResult[]> {
    if (!this.config) {
      throw new Error('Azure Translator not configured');
    }

    try {
      const url = new URL(`${this.config.endpoint}/translate`);
      url.searchParams.append('api-version', '3.0');
      url.searchParams.append('to', to);
      
      if (from) {
        url.searchParams.append('from', from);
      }

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Ocp-Apim-Subscription-Region': this.config.region || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          texts.map(text => ({ text }))
        ),
      });

      if (!response.ok) {
        throw new Error(`Batch translation failed: ${response.statusText}`);
      }

      const results = await response.json();
      return results.map((result: any, index: number) => ({
        text: result.translations[0]?.text || texts[index],
        detectedLanguage: result.detectedLanguage?.language,
        confidence: result.detectedLanguage?.score,
      }));
    } catch (error) {
      console.error('Batch translation error:', error);
      throw error;
    }
  }

  getLanguageName(code: string): string {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
    return lang?.name || code;
  }

  getNativeLanguageName(code: string): string {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
    return lang?.nativeName || code;
  }
}
