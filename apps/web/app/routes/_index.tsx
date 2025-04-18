import { Link } from "@remix-run/react";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Sparkles, Zap, Database, Bot, Lock, Blocks } from "lucide-react";
import type { MetaFunction } from "@remix-run/node";
import { auth } from "auth";
import { Loader2 } from "lucide-react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Ignition - Modern Full-Stack Starter Kit" },
		{ 
			name: "description", 
			content: "Ignition is a modern full-stack starter kit with tRPC, Better Auth, Drizzle ORM, and AI capabilities, powered by a clean UI with Shadcn components." 
		},
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	// If user is already logged in, redirect them to dashboard
	if (session?.user) {
		return redirect("/dashboard");
	}

	return null;
}

export default function Index() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted">
			YOU ARE LOGED IN
		</div>
	);
}
