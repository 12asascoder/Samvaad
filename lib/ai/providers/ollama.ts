import { AIProviderInterface, ChatMessage, GenerateOptions, GenerationResult, StreamResult } from '../types';

export class OllamaProvider implements AIProviderInterface {
  name = 'ollama';
  private baseUrl = 'http://localhost:11434/api';
  private defaultModel = 'llama3.2'; // Fast local model as default

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/tags`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      return response.ok;
    } catch {
      return false;
    }
  }

  async generate(messages: ChatMessage[], options?: GenerateOptions): Promise<GenerationResult> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.defaultModel,
        messages: messages,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.7,
        },
        format: options?.jsonMode ? 'json' : undefined,
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      text: data.message.content,
      usage: {
        promptTokens: data.prompt_eval_count || 0,
        completionTokens: data.eval_count || 0,
        totalTokens: (data.prompt_eval_count || 0) + (data.eval_count || 0)
      },
      provider: this.name
    };
  }

  async stream(messages: ChatMessage[], options?: GenerateOptions): Promise<StreamResult> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.defaultModel,
        messages: messages,
        stream: true,
        options: {
          temperature: options?.temperature ?? 0.7,
        }
      })
    });

    if (!response.ok || !response.body) {
      throw new Error(`Ollama streaming failed: ${response.statusText}`);
    }

    // Convert Ollama's NDJSON stream to SSE format to match our frontend expectations
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.message?.content) {
              // Convert to the OpenAI-like SSE format the frontend currently expects
              const sseChunk = `data: {"choices":[{"delta":{"content":${JSON.stringify(data.message.content)}}}]}\n\n`;
              controller.enqueue(new TextEncoder().encode(sseChunk));
            }
            if (data.done) {
              controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            }
          } catch (e) {
            // ignore partial
          }
        }
      }
    });

    return {
      stream: response.body.pipeThrough(transformStream),
      provider: this.name
    };
  }

  async embed(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mxbai-embed-large', // Excellent local embedding model
        prompt: text
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama embedding failed`);
    }

    const data = await response.json();
    return data.embedding;
  }
}
