import { Link } from "@remix-run/react";
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

export const meta: MetaFunction = () => {
	return [
		{ title: "Ignition - Modern Full-Stack Starter Kit" },
		{ 
			name: "description", 
			content: "Ignition is a modern full-stack starter kit with tRPC, Better Auth, Drizzle ORM, and AI capabilities, powered by a clean UI with Shadcn components." 
		},
	];
};

export default function Index() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted">
			{/* Hero Section */}
			<section className="px-4 py-20 md:py-32 mx-auto max-w-7xl">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
						Ignite Your Next Project
					</h1>
					<p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
						A modern full-stack starter kit supercharged with the latest technologies
						and a beautiful UI. Build production-ready apps in minutes, not hours.
					</p>
					<div className="mt-8 flex gap-4 justify-center">
						<Button asChild size="lg">
							<Link to="/auth/register">Get Started</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<a href="https://github.com/your-username/ignition" target="_blank" rel="noopener noreferrer">
								View on GitHub
							</a>
						</Button>
					</div>
					<div className="mt-8 flex flex-wrap gap-2 justify-center">
						<Badge variant="secondary">TypeScript</Badge>
						<Badge variant="secondary">tRPC</Badge>
						<Badge variant="secondary">Better Auth</Badge>
						<Badge variant="secondary">Drizzle ORM</Badge>
						<Badge variant="secondary">Shadcn/ui</Badge>
						<Badge variant="secondary">AI Ready</Badge>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-4 py-16 mx-auto max-w-7xl">
				<h2 className="text-3xl font-bold text-center mb-12">
					Everything You Need to Build Modern Apps
				</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<Zap className="w-10 h-10 text-primary mb-2" />
							<CardTitle>tRPC Integration</CardTitle>
							<CardDescription>
								End-to-end type safety with tRPC. Write your API once and get
								fully typed APIs without code generation.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Lock className="w-10 h-10 text-primary mb-2" />
							<CardTitle>Better Auth</CardTitle>
							<CardDescription>
								Secure authentication with email/password, social providers,
								and session management out of the box.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Database className="w-10 h-10 text-primary mb-2" />
							<CardTitle>Drizzle ORM</CardTitle>
							<CardDescription>
								Type-safe database operations with Drizzle ORM.
								Migrations, relations, and queries made easy.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Blocks className="w-10 h-10 text-primary mb-2" />
							<CardTitle>Shadcn/ui Components</CardTitle>
							<CardDescription>
								Beautiful, accessible, and customizable components
								built with Radix UI and Tailwind CSS.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Bot className="w-10 h-10 text-primary mb-2" />
							<CardTitle>AI Ready</CardTitle>
							<CardDescription>
								Pre-configured AI handlers and integrations.
								Build AI-powered features with minimal setup.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card>
						<CardHeader>
							<Sparkles className="w-10 h-10 text-primary mb-2" />
							<CardTitle>Developer Experience</CardTitle>
							<CardDescription>
								Hot reload, TypeScript, ESLint, and Prettier configured.
								Focus on building, not configuration.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 py-16 mx-auto max-w-7xl">
				<Card className="bg-primary text-primary-foreground">
					<CardContent className="p-12 text-center">
						<CardTitle className="text-3xl mb-4">
							Ready to Start Building?
						</CardTitle>
						<CardDescription className="text-primary-foreground/90 text-lg mb-8">
							Join thousands of developers building modern apps with Ignition.
						</CardDescription>
						<Button size="lg" variant="secondary" asChild>
							<Link to="/auth/register">Get Started for Free</Link>
						</Button>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
