import { useAIChat } from '~/hooks/useAIChat';

export default function AITest() {
  const { messages, sendMessage, isLoading, error } = useAIChat({
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.7,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    if (!input.value.trim()) return;

    await sendMessage(input.value);
    input.value = '';
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">AI Chat Test</h1>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4 h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${msg.content}-${i}`}
              className={`mb-4 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-gray-500">Thinking...</div>
          )}
          {error && (
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            name="message"
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 