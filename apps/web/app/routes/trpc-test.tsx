import { trpc } from "~/lib/trpc/client";

export default function TrpcTest() {
  const hello = trpc.hello.useQuery();
  const echo = trpc.echo.useQuery({ text: "Testing tRPC!" });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">tRPC Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Hello Query:</h2>
          {hello.isLoading ? (
            <p>Loading...</p>
          ) : hello.error ? (
            <p className="text-red-500">Error: {hello.error.message}</p>
          ) : (
            <p className="text-green-600">{hello.data?.greeting}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Echo Query:</h2>
          {echo.isLoading ? (
            <p>Loading...</p>
          ) : echo.error ? (
            <p className="text-red-500">Error: {echo.error.message}</p>
          ) : (
            <p className="text-green-600">{echo.data?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
} 