import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appRouter } from '../../src/root';
import { db } from '../setup';
import type { Context } from '../../src/trpc';
import { MessageRole } from 'ai';
import { TRPCError } from '@trpc/server';

// Mock OpenAI adapter
const mockChatCompletion = vi.fn();
vi.mock('ai', async () => {
  const actual = await vi.importActual('ai');
  return {
    ...actual,
    OpenAIAdapter: vi.fn().mockImplementation(() => ({
      chatCompletion: mockChatCompletion,
    })),
  };
});

const createTestContext = (): Context => ({
  headers: new Headers(),
});

describe('AI Routes', () => {
  let openaiAdapter: { chatCompletion: typeof mockChatCompletion };

  beforeEach(() => {
    vi.clearAllMocks();
    // Get the mocked OpenAI adapter instance
    openaiAdapter = { chatCompletion: mockChatCompletion };
  });

  describe('POST /ai/chat', () => {
    it('should return a successful chat completion', async () => {
      const mockResponse = {
        id: 'chat1',
        choices: [{
          message: {
            role: MessageRole.Assistant,
            content: 'Hello! How can I help you today?',
          },
          finishReason: 'stop',
          index: 0,
        }],
        created: Date.now(),
        model: 'gpt-4',
        usage: {
          promptTokens: 10,
          completionTokens: 20,
          totalTokens: 30,
        },
      };

      mockChatCompletion.mockResolvedValueOnce(mockResponse);

      const result = await appRouter.createCaller(createTestContext()).ai.chat({
        provider: 'openai',
        model: 'gpt-4',
        messages: [{
          role: MessageRole.User,
          content: 'Hello',
        }],
        temperature: 0.7,
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid requests', async () => {
      await expect(
        appRouter.createCaller(createTestContext()).ai.chat({
          provider: 'openai',
          model: 'gpt-4',
          messages: [], // Empty messages array should fail validation
          temperature: 0.7,
        })
      ).rejects.toThrow(TRPCError);
    });

    it('should handle API errors', async () => {
      mockChatCompletion.mockRejectedValueOnce(new Error('API error'));

      await expect(
        appRouter.createCaller(createTestContext()).ai.chat({
          provider: 'openai',
          model: 'gpt-4',
          messages: [{
            role: MessageRole.User,
            content: 'Hello',
          }],
          temperature: 0.7,
        })
      ).rejects.toThrow('API error');
    });
  });
});