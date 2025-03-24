import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenAIAdapter } from '../../src/adapters/openai';
import { MessageRole } from '../../src/types';

// Import the mocked module
import OpenAI from 'openai';

describe('OpenAIAdapter', () => {
  let adapter: OpenAIAdapter;
  let mockCreate: ReturnType<typeof vi.fn>;

  const mockConfig = {
    apiKey: 'test-api-key',
    baseURL: 'https://api.openai.com/v1',
  };

  beforeEach(() => {
    vi.resetAllMocks();
    // Setup the mock response
    mockCreate = vi.fn().mockResolvedValue({
      id: 'test-id',
      choices: [
        {
          message: {
            role: 'assistant',
            content: 'Hello, how can I help you?',
          },
          finish_reason: 'stop',
          index: 0,
        },
      ],
      created: 1616483601,
      model: 'gpt-4',
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30,
      },
    });

    // Set up the mock for OpenAI
    const mockOpenAIInstance = {
      chat: {
        completions: {
          create: mockCreate
        }
      }
    };
    
    // Override the constructor in the mocked module
    vi.mocked(OpenAI).mockReturnValue(mockOpenAIInstance as unknown as OpenAI);
    
    adapter = new OpenAIAdapter(mockConfig);
  });

  describe('chatCompletion', () => {
    it('should create a chat completion successfully', async () => {
      const mockResponse = {
        id: 'test-id',
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Hello, how can I help you?',
            },
            finish_reason: 'stop',
            index: 0,
          },
        ],
        created: 1616483601,
        model: 'gpt-4',
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      mockCreate.mockResolvedValueOnce(mockResponse);

      const options = {
        model: 'gpt-4',
        messages: [
          {
            role: MessageRole.User,
            content: 'Hello!',
          },
        ],
        temperature: 0.7,
        maxTokens: 100,
      };

      const result = await adapter.chatCompletion(options);

      expect(result).toEqual({
        id: 'test-id',
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Hello, how can I help you?',
            },
            finishReason: 'stop',
            index: 0,
          },
        ],
        created: 1616483601,
        model: 'gpt-4',
        usage: {
          promptTokens: 10,
          completionTokens: 20,
          totalTokens: 30,
        },
      });

      expect(mockCreate).toHaveBeenCalledWith({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Hello!',
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
        top_p: undefined,
        frequency_penalty: undefined,
        presence_penalty: undefined,
        stop: undefined,
      });
    });

    it('should handle errors from the OpenAI API', async () => {
      const mockError = new Error('API Error');
      mockCreate.mockRejectedValueOnce(mockError);

      const options = {
        model: 'gpt-4',
        messages: [
          {
            role: MessageRole.User,
            content: 'Hello!',
          },
        ],
      };

      await expect(adapter.chatCompletion(options)).rejects.toThrow('API Error');
    });

    it('should handle optional parameters correctly', async () => {
      const mockResponse = {
        id: 'test-id',
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Response with optional params',
            },
            finish_reason: 'stop',
            index: 0,
          },
        ],
        created: 1616483601,
        model: 'gpt-4',
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      mockCreate.mockResolvedValueOnce(mockResponse);

      const options = {
        model: 'gpt-4',
        messages: [
          {
            role: MessageRole.System,
            content: 'You are a helpful assistant.',
            name: 'system',
          },
          {
            role: MessageRole.User,
            content: 'Hello!',
            name: 'user',
          },
        ],
        temperature: 0.5,
        maxTokens: 150,
        topP: 0.9,
        frequencyPenalty: 0.5,
        presencePenalty: 0.5,
        stop: ['stop1', 'stop2'],
      };

      await adapter.chatCompletion(options);

      expect(mockCreate).toHaveBeenCalledWith({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
            name: 'system',
          },
          {
            role: 'user',
            content: 'Hello!',
            name: 'user',
          },
        ],
        temperature: 0.5,
        max_tokens: 150,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stop: ['stop1', 'stop2'],
      });
    });
  });
}); 