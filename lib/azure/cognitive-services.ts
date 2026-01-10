// Azure Cognitive Services Integration
// Provides additional AI capabilities for cognitive twin analysis

export interface AzureCognitiveConfig {
  endpoint: string;
  subscriptionKey: string;
}

export interface TextAnalyticsOptions {
  text: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  scores: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface KeyPhraseResult {
  keyPhrases: string[];
}

export interface LanguageDetectionResult {
  language: string;
  confidence: number;
}

export class AzureCognitiveServices {
  private config: AzureCognitiveConfig | null = null;

  constructor(config?: AzureCognitiveConfig) {
    if (config) {
      this.config = config;
    } else if (typeof window !== 'undefined') {
      const endpoint = process.env.NEXT_PUBLIC_AZURE_COGNITIVE_ENDPOINT;
      const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_COGNITIVE_KEY;
      
      if (endpoint && subscriptionKey) {
        this.config = { endpoint, subscriptionKey };
      }
    }
  }

  async analyzeSentiment(options: TextAnalyticsOptions): Promise<SentimentAnalysisResult> {
    if (!this.config) {
      throw new Error('Azure Cognitive Services not configured');
    }

    try {
      const response = await fetch(`${this.config.endpoint}/text/analytics/v3.1/sentiment`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: [
            {
              id: '1',
              text: options.text,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Sentiment analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      const document = result.documents[0];

      return {
        sentiment: document.sentiment.toLowerCase() as 'positive' | 'neutral' | 'negative',
        confidence: Math.max(
          document.confidenceScores.positive,
          document.confidenceScores.neutral,
          document.confidenceScores.negative
        ),
        scores: {
          positive: document.confidenceScores.positive,
          neutral: document.confidenceScores.neutral,
          negative: document.confidenceScores.negative,
        },
      };
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      // Return neutral sentiment as fallback
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        scores: {
          positive: 0.33,
          neutral: 0.34,
          negative: 0.33,
        },
      };
    }
  }

  async extractKeyPhrases(options: TextAnalyticsOptions): Promise<KeyPhraseResult> {
    if (!this.config) {
      throw new Error('Azure Cognitive Services not configured');
    }

    try {
      const response = await fetch(`${this.config.endpoint}/text/analytics/v3.1/keyPhrases`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: [
            {
              id: '1',
              text: options.text,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Key phrase extraction failed: ${response.statusText}`);
      }

      const result = await response.json();
      const document = result.documents[0];

      return {
        keyPhrases: document.keyPhrases || [],
      };
    } catch (error) {
      console.error('Key phrase extraction error:', error);
      return { keyPhrases: [] };
    }
  }

  async detectLanguage(options: TextAnalyticsOptions): Promise<LanguageDetectionResult> {
    if (!this.config) {
      throw new Error('Azure Cognitive Services not configured');
    }

    try {
      const response = await fetch(`${this.config.endpoint}/text/analytics/v3.1/languages`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: [
            {
              id: '1',
              text: options.text,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Language detection failed: ${response.statusText}`);
      }

      const result = await response.json();
      const document = result.documents[0];
      const language = document.detectedLanguage;

      return {
        language: language.iso6391Name,
        confidence: language.confidenceScore,
      };
    } catch (error) {
      console.error('Language detection error:', error);
      return { language: 'en', confidence: 0 };
    }
  }
}
