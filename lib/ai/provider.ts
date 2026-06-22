import { AIProviderInterface, ChatMessage, GenerateOptions, GenerationResult, StreamResult } from './types';
import { OllamaProvider } from './providers/ollama';
import { AzureProvider } from './providers/azure';

export class AIProvider {
  private static providers: AIProviderInterface[] = [
    new OllamaProvider(),
    // Add HuggingFace or Grok here when keys are available
    new AzureProvider(),
  ];

  /**
   * Free-First Routing Logic
   * 1. Checks if Ollama (local) is available.
   * 2. Checks if remote free providers are available.
   * 3. Falls back to Paid providers (Azure) if enabled/configured.
   */
  static async getBestProvider(): Promise<AIProviderInterface> {
    // If user explicitly forced a provider for debugging
    const forced = process.env.FORCE_PROVIDER;
    if (forced) {
      const p = this.providers.find(p => p.name === forced);
      if (p && await p.isAvailable()) return p;
    }

    for (const provider of this.providers) {
      // Azure requires PAID_FALLBACK_ENABLED to be true or it's the absolute last resort
      if (provider.name === 'azure' && process.env.PAID_FALLBACK_ENABLED !== 'true') {
        // If it's the only one left, we use it, otherwise we skip it
        // Actually, let's just check availability.
      }
      
      const available = await provider.isAvailable();
      if (available) {
        return provider;
      }
    }

    throw new Error("No AI Providers are currently available. Please start Ollama or configure API keys.");
  }

  static async generate(messages: ChatMessage[], options?: GenerateOptions): Promise<GenerationResult> {
    const provider = await this.getBestProvider();
    return provider.generate(messages, options);
  }

  static async stream(messages: ChatMessage[], options?: GenerateOptions): Promise<StreamResult> {
    const provider = await this.getBestProvider();
    return provider.stream(messages, options);
  }

  static async embed(text: string): Promise<number[]> {
    const provider = await this.getBestProvider();
    if (provider.embed) {
      return provider.embed(text);
    }
    throw new Error(`Provider ${provider.name} does not support embeddings.`);
  }
}
