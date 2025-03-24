import OpenAI from 'openai';
import type { AIProvider, AIProviderConfig, ChatCompletionOptions, ChatCompletionResponse } from '../types';

export class DeepSeekAdapter implements AIProvider {
  private client: OpenAI;

  constructor(config: AIProviderConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL ?? 'https://api.deepseek.com',
    });
  }

  async chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const response = await this.client.chat.completions.create({
      model: options.model,
      messages: options.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        name: msg.name,
      })),
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      top_p: options.topP,
      frequency_penalty: options.frequencyPenalty,
      presence_penalty: options.presencePenalty,
      stop: options.stop,
    });

    return {
      id: response.id,
      choices: response.choices.map(choice => ({
        message: {
          role: choice.message.role,
          content: choice.message.content ?? '',
        },
        finishReason: choice.finish_reason,
        index: choice.index,
      })),
      created: response.created,
      model: response.model,
      usage: {
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0,
      },
    };
  }
} 