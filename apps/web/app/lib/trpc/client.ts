import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import type { AppRouter } from 'api';
import { useState } from 'react';

// Export the tRPC hooks object
export const trpc = createTRPCReact<AppRouter>();

// Function to get base URL for client-side/server-side rendering
function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  // Add other deployment URLs if needed
  // Assume localhost for server-side rendering (SSR) during development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Export hook to create QueryClient and trpcClient instances
// This ensures a new instance is created per request on the server
// and a single instance is used on the client
export function useTrpcClient() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`, // Points to our API route
          // You can pass any HTTP headers you wish here
          // async headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );
  return { queryClient, trpcClient };
} 