import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, useTrpcClient } from "./lib/trpc/client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { LogOut } from "lucide-react";

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

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>{children}</body>
		</html>
	);
}

function AppContent() {
	const location = useLocation();
	const navigate = useNavigate();
	const isAuthPage = location.pathname.startsWith("/auth");

	const { data: sessionData, isLoading: isSessionLoading } = trpc.auth.getCurrentSession.useQuery(
		undefined,
		{
			refetchOnWindowFocus: false,
			retry: false,
		}
	);
	const user = sessionData?.user;

	const logoutMutation = trpc.auth.logout.useMutation({
		onSuccess: () => {
			trpc.auth.getCurrentSession.useQuery().refetch();
			navigate("/auth/login");
		},
		onError: (error) => {
			console.error("Logout failed:", error);
		}
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

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
								{user && !isSessionLoading && (
									<nav className="flex gap-4">
										<a
											href="/dashboard"
											className="text-sm text-muted-foreground hover:text-foreground"
										>
											Dashboard
										</a>
										<a
											href="/memos"
											className="text-sm text-muted-foreground hover:text-foreground"
										>
											Memos
										</a>
										<a
											href="/projects"
											className="text-sm text-muted-foreground hover:text-foreground"
										>
											Projects
										</a>
									</nav>
								)}
							</div>
							{user && !isSessionLoading && (
								<Button 
									variant="ghost" 
									size="sm" 
									onClick={handleLogout} 
									disabled={logoutMutation.isLoading}
								>
									<LogOut className="mr-2 h-4 w-4" />
									{logoutMutation.isLoading ? "Logging out..." : "Logout"} 
								</Button>
							)}
							{isSessionLoading && !isAuthPage && (
								<div className="text-sm text-muted-foreground">Loading...</div>
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

export default function App() {
	const { queryClient, trpcClient } = useTrpcClient();

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<AppContent />
			</QueryClientProvider>
		</trpc.Provider>
	);
}
