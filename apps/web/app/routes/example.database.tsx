import { useState } from 'react';
import { trpc } from '~/lib/trpc/client'; // Corrected import path based on file search
import type { Example, NewExample } from 'database/schema/example'; // Adjusted import path

// Helper function to generate a simple ID (replace with a proper UUID library if needed)
const generateId = () => Math.random().toString(36).substring(2, 15);

export default function ExampleDatabase() {
  const utils = trpc.useContext();
  const { data: examples, isLoading, error } = trpc.catalog.getAll.useQuery();

  const createMutation = trpc.catalog.mutation.create.useMutation({
    onSuccess: () => {
      utils.catalog.getAll.invalidate();
      resetForm();
    },
  });

  const updateMutation = trpc.catalog.update.useMutation({
    onSuccess: () => {
      utils.catalog.getAll.invalidate();
      resetForm();
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentExample, setCurrentExample] = useState<Partial<Example>>({
    id: undefined,
    name: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExample((prev: Partial<Example>) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentExample({ id: undefined, name: '', description: '' });
  };

  type ApiExample = Omit<Example, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string };

  const handleEditClick = (example: ApiExample) => {
    setIsEditing(true);
    setCurrentExample({
      ...example,
      createdAt: new Date(example.createdAt),
      updatedAt: new Date(example.updatedAt),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentExample.name) {
      alert('Name is required'); // Simple validation
      return;
    }

    if (isEditing && currentExample.id) {
      // Define the object for update mutation
      const updateData = {
        id: currentExample.id, // id is required for update
        name: currentExample.name,
        description: currentExample.description || null,
      };
      // Ensure updateData matches the input type expected by updateMutation
      // Assuming updateExampleSchema is partial, this should be okay.
      // If the API expects the full object, adjust accordingly.
      updateMutation.mutate(updateData);
    } else {
      // Define the object for create mutation including the ID
      const createData: NewExample = { 
        id: generateId(), // Generate ID for creation
        name: currentExample.name,
        description: currentExample.description || null,
      };
      createMutation.mutate(createData);
    }
  };

  // Basic Styling (consider using Tailwind or a UI library)
  const inputStyle = "border p-2 rounded w-full mb-2";
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50";
  const tableCellStyle = "border px-4 py-2";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Example Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl mb-2">{isEditing ? 'Edit Example' : 'Create New Example'}</h2>
        <input
          type="hidden"
          name="id"
          value={currentExample.id || ''}
        />
        <div>
          <label htmlFor="name" className="block mb-1">Name (Required)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={currentExample.name || ''}
            onChange={handleInputChange}
            className={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={currentExample.description || ''}
            onChange={handleInputChange}
            className={inputStyle}
            rows={3}
          />
        </div>
        <button
          type="submit"
          className={buttonStyle}
          disabled={createMutation.isLoading || updateMutation.isLoading}
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            disabled={createMutation.isLoading || updateMutation.isLoading}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 className="text-xl mb-2">Existing Examples</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading data: {error.message}</p>}
      {!isLoading && !error && (
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className={tableCellStyle}>ID</th>
              <th className={tableCellStyle}>Name</th>
              <th className={tableCellStyle}>Description</th>
              <th className={tableCellStyle}>Created At</th>
              <th className={tableCellStyle}>Updated At</th>
              <th className={tableCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(examples as ApiExample[] | undefined)?.map((example) => (
              <tr key={example.id}>
                <td className={tableCellStyle}>{example.id}</td>
                <td className={tableCellStyle}>{example.name}</td>
                <td className={tableCellStyle}>{example.description}</td>
                <td className={tableCellStyle}>{new Date(example.createdAt).toLocaleString()}</td>
                <td className={tableCellStyle}>{new Date(example.updatedAt).toLocaleString()}</td>
                <td className={tableCellStyle}>
                  <button
                    type="button"
                    onClick={() => handleEditClick(example)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                    disabled={createMutation.isLoading || updateMutation.isLoading}
                  >
                    Edit
                  </button>
                  {/* Delete button placeholder */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       {(examples?.length === 0 && !isLoading) && <p>No examples found.</p>}
    </div>
  );
}
