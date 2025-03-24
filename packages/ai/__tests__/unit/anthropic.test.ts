import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnthropicAdapter } from '../../src/adapters/anthropic';
import { MessageRole } from '../../src/types';
import { mockAnthropicCreate } from '../setup';

describe('AnthropicAdapter', () => {
  let adapter: AnthropicAdapter;

  const mockConfig = {
    apiKey: 'test-api-key',
    defaultModel: 'claude-3-opus-20240229',
  };

  const mockResponse = {
    id: 'msg_123',
    type: 'message',
    role: 'assistant',
    content: [{ type: 'text', text: 'Hello, how can I help you?' }],
    model: 'claude-3-opus-20240229',
    usage: {
      input_tokens: 10,
      output_tokens: 20,
    },
    stop_reason: 'stop',
    stop_sequence: null,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    mockAnthropicCreate.mockReturnValue(Promise.resolve(mockResponse));
    adapter = new AnthropicAdapter(mockConfig);
  });

  describe('chatCompletion', () => {
    it('should create a chat completion successfully', async () => {
      const options = {
        model: 'claude-3-opus-20240229',
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
        id: 'msg_123',
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
        created: expect.any(Number),
        model: 'claude-3-opus-20240229',
        usage: {
          promptTokens: 10,
          completionTokens: 20,
          totalTokens: 30,
        },
      });

      expect(mockAnthropicCreate).toHaveBeenCalledWith({
        model: 'claude-3-opus-20240229',
        messages: [
          {
            role: 'user',
            content: 'Hello!',
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        stop_sequences: undefined,
      });
    });

    it('should handle errors from the Anthropic API', async () => {
      const mockError = new Error('API Error');
      mockAnthropicCreate.mockRejectedValueOnce(mockError);

      const options = {
        model: 'claude-3-opus-20240229',
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
      const options = {
        model: 'claude-3-opus-20240229',
        messages: [
          {
            role: MessageRole.System,
            content: 'You are a helpful assistant.',
          },
          {
            role: MessageRole.User,
            content: 'Hello!',
          },
        ],
        temperature: 0.5,
        maxTokens: 150,
        topP: 0.9,
        stop: ['stop1', 'stop2'],
      };

      await adapter.chatCompletion(options);

      expect(mockAnthropicCreate).toHaveBeenCalledWith({
        model: 'claude-3-opus-20240229',
        messages: [
          {
            role: 'assistant',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: 'Hello!',
          },
        ],
        temperature: 0.5,
        max_tokens: 150,
        top_p: 0.9,
        stop_sequences: ['stop1', 'stop2'],
      });
    });
  });
}); 