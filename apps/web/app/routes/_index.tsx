import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
import { auth } from "auth";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";

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

	return json({ user: session?.user ?? null });
}

function LandingPageContent() {
	return (
		<div className="container py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
					Build Faster with Ignition
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
					The full-stack starter kit designed for rapid development with modern tools.
				</p>
				<Button asChild size="lg">
					<Link to="/signup">Get Started</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<Card>
					<CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary"/> Modern Tech</CardTitle></CardHeader>
					<CardContent>Remix, tRPC, Drizzle, Shadcn/UI, Better Auth.</CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary"/> Fast Development</CardTitle></CardHeader>
					<CardContent>Get your project off the ground quickly.</CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle className="flex items-center gap-2"><Database className="w-5 h-5 text-primary"/> Database Included</CardTitle></CardHeader>
					<CardContent>Drizzle ORM with schema examples.</CardContent>
				</Card>
			</div>
		</div>
	);
}

function LoggedInIndexContent() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Welcome Back!</h1>
			<p>This is your main dashboard area accessible at the root path when logged in.</p>
		</div>
	);
}

export default function Index() {
	const { user } = useLoaderData<typeof loader>();

	if (user) {
		return (
			<ProtectedLayout>
				<LoggedInIndexContent />
			</ProtectedLayout>
		);
	}

	return (
		<PublicLayout>
			<LandingPageContent />
		</PublicLayout>
	);
}
