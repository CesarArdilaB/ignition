import type React from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, useTrpcClient } from "./lib/trpc/client";
import { ThemeProvider } from "next-themes";
import { getSession } from "auth";
import { PublicLayout } from "~/components/layouts/PublicLayout";
import { ProtectedLayout } from "~/components/layouts/ProtectedLayout";

import "./tailwind.css";

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

export async function loader({ request }: LoaderFunctionArgs) {
	const requestHeaders = request.headers;
	
	let sessionResult = null;
	try {
		sessionResult = await getSession({ headers: requestHeaders }); 
	} catch (error) {
		sessionResult = null; 
	}

	const user = sessionResult?.user ?? null;
	return json({ user });
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { queryClient, trpcClient } = useTrpcClient();

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<html lang="en" className="h-full" suppressHydrationWarning>
					<head>
						<meta charSet="utf-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<Meta />
						<Links />
					</head>
					<body className="h-full">
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							{children}
						</ThemeProvider>
						<ScrollRestoration />
						<Scripts />
					</body>
				</html>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default function App() {
	const { user } = useLoaderData<typeof loader>();

	if (user) {
		return (
			<ProtectedLayout>
				<Outlet />
			</ProtectedLayout>
		);
	}

	return (
		<PublicLayout>
			<Outlet />
		</PublicLayout>
	);
}
