import { AIProviderInterface, ChatMessage, GenerateOptions, GenerationResult, StreamResult } from '../types';

export class AzureProvider implements AIProviderInterface {
  name = 'azure';

  private get config() {
    return {
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4',
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
    };
  }

  async isAvailable(): Promise<boolean> {
    const { endpoint, apiKey } = this.config;
    return !!(endpoint && apiKey);
  }

  async generate(messages: ChatMessage[], options?: GenerateOptions): Promise<GenerationResult> {
    const { endpoint, apiKey, deployment, apiVersion } = this.config;
    
    const response = await fetch(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey!,
        },
        body: JSON.stringify({
          messages,
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1000,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Azure generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      text: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
      provider: this.name
    };
  }

  async stream(messages: ChatMessage[], options?: GenerateOptions): Promise<StreamResult> {
    const { endpoint, apiKey, deployment, apiVersion } = this.config;
    
    const response = await fetch(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey!,
        },
        body: JSON.stringify({
          messages,
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1000,
          stream: true,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error(`Azure streaming failed: ${response.statusText}`);
    }

    return {
      stream: response.body,
      provider: this.name
    };
  }
}
