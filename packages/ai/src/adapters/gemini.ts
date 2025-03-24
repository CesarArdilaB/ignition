import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIProvider, AIProviderConfig, ChatCompletionOptions, ChatCompletionResponse } from '../types';

export class GeminiAdapter implements AIProvider {
  private client: GoogleGenerativeAI;

  constructor(config: AIProviderConfig) {
    this.client = new GoogleGenerativeAI(config.apiKey);
  }

  async chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    const model = this.client.getGenerativeModel({ model: options.model });
    const chat = model.startChat({
      history: options.messages.map(msg => ({
        role: msg.role === 'system' ? 'user' : msg.role,
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        topP: options.topP,
        stopSequences: options.stop,
      },
    });

    const result = await chat.sendMessage(options.messages[options.messages.length - 1].content);
    const response = await result.response;

    return {
      id: Date.now().toString(),
      choices: [{
        message: {
          role: 'assistant',
          content: response.text(),
        },
        finishReason: 'stop',
        index: 0,
      }],
      created: Date.now(),
      model: options.model,
      usage: {
        promptTokens: 0, // Gemini doesn't provide token counts
        completionTokens: 0,
        totalTokens: 0,
      },
    };
  }
} 