import { trpc } from "~/lib/trpc/client";
import type { Category } from "database";

export default function TrpcTest() {
  const categories = trpc.catalog.getCategories.useQuery();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">tRPC Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Categories:</h2>
          {categories.isLoading ? (
            <p>Loading...</p>
          ) : categories.error ? (
            <p className="text-red-500">Error: {categories.error.message}</p>
          ) : (
            <ul className="list-disc pl-5">
              {categories.data?.map((category: Category) => (
                <li key={category.id}>
                  {category.name} - {category.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 