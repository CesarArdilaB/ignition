import { z } from 'zod';

export const MessageRole = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
} as const;

export const MessageRoleSchema = z.enum([MessageRole.System, MessageRole.User, MessageRole.Assistant]);
export type MessageRole = z.infer<typeof MessageRoleSchema>;

export const MessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string(),
  name: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatCompletionOptionsSchema = z.object({
  model: z.string(),
  messages: z.array(MessageSchema),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stop: z.array(z.string()).optional(),
});

export type ChatCompletionOptions = z.infer<typeof ChatCompletionOptionsSchema>;

export const ChatCompletionResponseSchema = z.object({
  id: z.string(),
  choices: z.array(z.object({
    message: MessageSchema,
    finishReason: z.string().optional(),
    index: z.number(),
  })),
  created: z.number(),
  model: z.string(),
  usage: z.object({
    promptTokens: z.number(),
    completionTokens: z.number(),
    totalTokens: z.number(),
  }),
});

export type ChatCompletionResponse = z.infer<typeof ChatCompletionResponseSchema>;

export interface AIProvider {
  chatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse>;
}

export interface AIProviderConfig {
  apiKey: string;
  baseURL?: string;
  defaultModel?: string;
} 