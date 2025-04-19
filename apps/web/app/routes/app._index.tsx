import { ProtectedRoute } from "~/components/auth/protected-route";

export default function AppPage() {
  return (
    <ProtectedRoute>
      <div className="container py-6">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground">
You are logged in.
        </p>
        {/* Add authenticated user content here */}
      </div>
    </ProtectedRoute>
  );
} 