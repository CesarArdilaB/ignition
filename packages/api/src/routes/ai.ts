import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import {
  OpenAIAdapter,
  AnthropicAdapter,
  GeminiAdapter,
  DeepSeekAdapter,
  MessageSchema,
  ChatCompletionOptionsSchema,
  type AIProvider,
  type AIProviderConfig,
} from 'ai';

const ProviderSchema = z.enum(['openai', 'anthropic', 'gemini', 'deepseek']);
type Provider = z.infer<typeof ProviderSchema>;

function createAIAdapter(provider: Provider, config: AIProviderConfig): AIProvider {
  switch (provider) {
    case 'openai':
      return new OpenAIAdapter(config);
    case 'anthropic':
      return new AnthropicAdapter(config);
    case 'gemini':
      return new GeminiAdapter(config);
    case 'deepseek':
      return new DeepSeekAdapter(config);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

function getProviderConfig(provider: Provider): AIProviderConfig {
  const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];
  if (!apiKey) {
    throw new Error(`Missing API key for provider: ${provider}`);
  }

  return { apiKey };
}

export const aiRouter = router({
  chat: publicProcedure
    .input(z.object({
      provider: ProviderSchema,
      model: z.string(),
      messages: z.array(MessageSchema).min(1, 'At least one message is required'),
      temperature: z.number().min(0).max(2).optional(),
      maxTokens: z.number().optional(),
      topP: z.number().min(0).max(1).optional(),
      frequencyPenalty: z.number().min(-2).max(2).optional(),
      presencePenalty: z.number().min(-2).max(2).optional(),
      stop: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const config = getProviderConfig(input.provider);
      const adapter = createAIAdapter(input.provider, config);

      return await adapter.chatCompletion({
        model: input.model,
        messages: input.messages,
        temperature: input.temperature,
        maxTokens: input.maxTokens,
        topP: input.topP,
        frequencyPenalty: input.frequencyPenalty,
        presencePenalty: input.presencePenalty,
        stop: input.stop,
      });
    }),
}); 