import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { auth } from "auth";

export async function protectedLoader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    const url = new URL(request.url);
    return redirect(`/auth/login?returnTo=${encodeURIComponent(url.pathname)}`);
  }

  return json({ user: session.user });
}

export function useProtectedData() {
  return useLoaderData<typeof protectedLoader>();
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useProtectedData();
  return <>{children}</>;
} 