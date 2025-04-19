import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useSearchParams, useNavigate } from "@remix-run/react";
import { type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { trpc } from "~/lib/trpc/client";
import { jsonResponse } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
	console.warn("Register loader needs review for server-side session checking");
	return jsonResponse({});
}

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [searchParams] = useSearchParams();
	const returnTo = searchParams.get("returnTo") || "/dashboard";

	const registerMutation = trpc.auth.register.useMutation({
		onSuccess: () => {
			navigate(returnTo === "/dashboard" ? "/app" : returnTo);
		},
		onError: (error) => {
			setError(error.message);
		},
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (!name || !email || !password) {
			setError("Name, email, and password are required.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		registerMutation.mutate({ name, email, password });
	};

	return (
		<div className="container max-w-md mx-auto px-4 py-16">
			<Card>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>Get started with Ignition</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} method="post" className="space-y-4">
						<input type="hidden" name="returnTo" value={returnTo} />
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								required
								disabled={registerMutation.isLoading}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								disabled={registerMutation.isLoading}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								minLength={8}
								disabled={registerMutation.isLoading}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								disabled={registerMutation.isLoading}
							/>
						</div>
						{error && <div className="text-sm text-red-500">{error}</div>}
						<Button
							type="submit"
							className="w-full"
							disabled={registerMutation.isLoading}
						>
							{registerMutation.isLoading
								? "Creating account..."
								: "Create account"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Button variant="link" asChild className="p-0">
							<Link to={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`}>
								Sign in
							</Link>
						</Button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
