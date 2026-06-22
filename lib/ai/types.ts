export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface GenerationResult {
  text: string;
  usage?: AIUsageMetrics;
  provider: string;
}

export interface StreamResult {
  stream: ReadableStream<Uint8Array>;
  provider: string;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface AIProviderInterface {
  name: string;
  isAvailable(): Promise<boolean>;
  generate(messages: ChatMessage[], options?: GenerateOptions): Promise<GenerationResult>;
  stream(messages: ChatMessage[], options?: GenerateOptions): Promise<StreamResult>;
  embed?(text: string): Promise<number[]>;
}
