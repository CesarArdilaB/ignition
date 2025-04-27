import { useState } from 'react';
import { trpc } from '~/lib/trpc/client'; // Assuming this is the correct path
import type { Message } from 'ai'; // Import Message type

// Define available providers (should match API's ProviderSchema)
const providers = ['openai', 'anthropic', 'gemini', 'deepseek'] as const;
type Provider = (typeof providers)[number];

export default function ExampleAI() {
  const [provider, setProvider] = useState<Provider>(providers[0]);
  const [model, setModel] = useState<string>(''); // User needs to input a valid model
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const aiChatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      // Assuming the first choice's message content is the main response
      setResponse(data.choices[0]?.message?.content ?? 'No content in response');
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(`Error: ${error.message}`);
      setResponse(null);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null); // Clear previous response
    setErrorMessage(null); // Clear previous error

    if (!model) {
      setErrorMessage('Please enter a model name.');
      return;
    }
    if (!prompt) {
      setErrorMessage('Please enter a prompt.');
      return;
    }

    // Construct the messages array
    const messages: Message[] = [{ role: 'user', content: prompt }];

    // Call the mutation
    aiChatMutation.mutate({
      provider,
      model,
      messages,
      // Optionally add other parameters like temperature, maxTokens etc.
      // temperature: 0.7,
    });
  };

  // Basic Styling
  const inputStyle = "border p-2 rounded w-full mb-2";
  const selectStyle = "border p-2 rounded w-full mb-2 bg-white";
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50";
  const responseBoxStyle = "mt-4 p-4 border rounded bg-gray-100 whitespace-pre-wrap";
  const errorBoxStyle = "mt-4 p-4 border rounded bg-red-100 text-red-700";

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Chat Example</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
        <div>
          <label htmlFor="provider" className="block mb-1 font-medium">Provider</label>
          <select
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value as Provider)}
            className={selectStyle}
          >
            {providers.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="model" className="block mb-1 font-medium">Model Name</label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="e.g., gpt-4, claude-3-opus-20240229" // Provide examples
            className={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="prompt" className="block mb-1 font-medium">Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={inputStyle}
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className={buttonStyle}
          disabled={aiChatMutation.isLoading}
        >
          {aiChatMutation.isLoading ? 'Sending...' : 'Send Prompt'}
        </button>
      </form>

      {/* Display Area */}
      {aiChatMutation.isLoading && <p>Loading response...</p>}
      {errorMessage && (
        <div className={errorBoxStyle}>
          <p><strong>Error:</strong></p>
          <p>{errorMessage}</p>
        </div>
      )}
      {response && (
        <div className={responseBoxStyle}>
          <p><strong>AI Response:</strong></p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}