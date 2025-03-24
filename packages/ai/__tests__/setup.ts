import { beforeAll, afterAll, vi } from 'vitest';

// Mock OpenAI
vi.mock('openai', () => ({
  default: vi.fn(),
}));

// Mock Anthropic
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

const mockCreate = vi.fn().mockReturnValue(mockResponse);

vi.mock('@anthropic-ai/sdk', () => {
  const messages = {
    create: mockCreate,
  };

  class MockAnthropic {
    messages: typeof messages;
    constructor(config: { apiKey: string; baseURL?: string }) {
      this.messages = messages;
    }
  }

  return {
    __esModule: true,
    default: MockAnthropic,
  };
});

// Export the mock for use in tests
export const mockAnthropicCreate = mockCreate;

// Mock Google Generative AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: vi.fn(() => ({
      generateContent: vi.fn(),
    })),
  })),
}));

beforeAll(() => {
  // Reset all mocks before tests
  vi.resetAllMocks();
});

afterAll(() => {
  // Clean up after all tests
  vi.restoreAllMocks();
}); 