import { useState } from 'react';
import { trpc } from '~/lib/trpc/client';
import type { Message } from 'ai';

interface UseAIChatOptions {
  provider?: 'openai' | 'anthropic' | 'gemini' | 'deepseek';
  model?: string;
  temperature?: number;
}

const defaultOptions: Required<UseAIChatOptions> = {
  provider: 'openai',
  model: 'gpt-4',
  temperature: 0.7,
};

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const chat = trpc.ai.chat.useMutation();

  const sendMessage = async (content: string) => {
    const newMessage: Message = {
      role: 'user',
      content,
    };

    setMessages(prev => [...prev, newMessage]);

    const opts = { ...defaultOptions, ...options };
    const response = await chat.mutateAsync({
      provider: opts.provider,
      model: opts.model,
      messages: [...messages, newMessage],
      temperature: opts.temperature,
    });

    const assistantMessage = response.choices[0].message;
    setMessages(prev => [...prev, assistantMessage]);

    return assistantMessage;
  };

  return {
    messages,
    sendMessage,
    isLoading: chat.isLoading,
    error: chat.error,
  };
} 