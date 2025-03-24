import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, AIProviderConfig, ChatCompletionOptions, ChatCompletionResponse } from '../types';

export class AnthropicAdapter implements AIProvider {
  private client: Anthropic;

  constructor(config: AIProviderConfig) {
    this.client = new Anthropic({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
  }

  async chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const response = await this.client.messages.create({
      model: options.model,
      messages: options.messages.map(msg => ({
        role: msg.role === 'system' ? 'assistant' : msg.role,
        content: msg.content,
      })),
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1000,
      top_p: options.topP ?? 1,
      stop_sequences: options.stop,
    });

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
        promptTokens: response.usage?.input_tokens ?? 0,
        completionTokens: response.usage?.output_tokens ?? 0,
        totalTokens: (response.usage?.input_tokens ?? 0) + (response.usage?.output_tokens ?? 0),
      },
    };
  }
} 