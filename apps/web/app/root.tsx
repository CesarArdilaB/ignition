import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { createContext, useContext, useState } from "react";
import { auth } from "auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "./lib/trpc/client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";
import { Form } from "@remix-run/react";

import "./tailwind.css";
import { APP_NAME } from "./lib/constants";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

interface AuthContextType {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    emailVerified: boolean;
  } | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export function useAuth() {
  return useContext(AuthContext);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return json({ user: session?.user });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();
  const { user } = useLoaderData<typeof loader>();
  const isAuthPage = location.pathname.startsWith("/auth");
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {!isAuthPage && (
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-6">
                <a href="/" className="font-semibold">
                  {APP_NAME}
                </a>
                {user && (
                  <nav className="flex gap-4">
                    <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                      Dashboard
                    </a>
                    <a href="/memos" className="text-sm text-muted-foreground hover:text-foreground">
                      Memos
                    </a>
                    <a href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
                      Projects
                    </a>
                  </nav>
                )}
              </div>
              {user && (
                <Form method="post" action="/auth/logout">
                  <Button variant="ghost" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </Form>
              )}
            </div>
          </header>
        )}
        <main className={cn("min-h-full", !isAuthPage && "py-6")}>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
