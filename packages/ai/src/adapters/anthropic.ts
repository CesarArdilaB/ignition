import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, AIProviderConfig, ChatCompletionOptions, ChatCompletionResponse } from '../types';

export class AnthropicAdapter implements AIProvider {
  private client: Anthropic;

  constructor(config: AIProviderConfig) {
    console.log('Creating Anthropic client with config:', config);
    this.client = new Anthropic({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
    console.log('Client created:', this.client);
  }

  async chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    console.log('Calling messages.create with options:', options);
    const response = await Promise.resolve(this.client.messages.create({
      model: options.model,
      messages: options.messages.map(msg => ({
        role: msg.role === 'system' ? 'assistant' : msg.role,
        content: msg.content,
      })),
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
      top_p: options.topP ?? 1,
      stop_sequences: options.stop,
    }));
    console.log('Raw response from Anthropic:', response);

    return {
      id: response.id,
      choices: [{
        message: {
          role: response.role,
          content: response.content[0].text,
        },
        finishReason: response.stop_reason ?? 'stop',
        index: 0,
      }],
      created: Date.now(),
      model: response.model,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      },
    };
  }
} 