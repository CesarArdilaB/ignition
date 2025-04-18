import {
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { auth } from "auth";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";
import { APP_DESCRIPTION, APP_NAME, COMPANY_NAME } from "~/lib/constants";
import { jsonResponse } from "~/lib/utils";

interface ActionData {
	success: boolean;
	error?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	// If user is already logged in, redirect them
	if (session?.user) {
		// Get the return URL from the search params or default to dashboard
		const url = new URL(request.url);
		const returnTo = url.searchParams.get("returnTo") || "/dashboard";
		return redirect(returnTo);
	}

	return jsonResponse({});
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const rememberMe = formData.get("rememberMe") === "on";
	const returnTo = (formData.get("returnTo") as string) || "/dashboard";

	// Basic validation
	if (!email || !password) {
		return jsonResponse<ActionData>(
			{ success: false, error: "Email and password are required" },
			{ status: 400 },
		);
	}

	try {
		const result = await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});

		if (result.token) {
			// Set remember me cookie if requested
			if (rememberMe) {
				// You can implement remember me logic here
				// This might involve setting a longer-lived cookie
			}
			return redirect(returnTo);
		}

		return jsonResponse<ActionData>(
			{ success: false, error: "Invalid email or password" },
			{ status: 400 },
		);
	} catch (error) {
		if (error instanceof Error) {
			return jsonResponse<ActionData>(
				{ success: false, error: error.message },
				{ status: 400 },
			);
		}
		return jsonResponse<ActionData>(
			{ success: false, error: "An unexpected error occurred" },
			{ status: 500 },
		);
	}
}

export default function Login() {
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	const [searchParams] = useSearchParams();
	const returnTo = searchParams.get("returnTo") || "/dashboard";

	return (
		<div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-[40%_60%] lg:px-0">
			<div className="relative hidden h-full flex-col bg-muted p-6 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<div className="relative z-20 flex items-center text-lg font-medium">
					<img
						src="/logo.svg"
						alt={`${APP_NAME} logo`}
						className="mr-2 h-12 w-12 text-white"
					/>
					{COMPANY_NAME}
				</div>

				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-1">
						<p className="text-lg">{APP_DESCRIPTION}</p>
					</blockquote>
				</div>
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<Card>
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl text-center">
								Welcome back
							</CardTitle>
							<CardDescription className="text-center">
								Enter your credentials to access your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Form method="post" className="space-y-4">
								<input type="hidden" name="returnTo" value={returnTo} />
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											placeholder="name@example.com"
											disabled={isSubmitting}
											className="pl-9"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											placeholder="Enter your password"
											disabled={isSubmitting}
											className="pl-9"
										/>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="rememberMe"
										name="rememberMe"
										disabled={isSubmitting}
									/>
									<Label htmlFor="rememberMe" className="text-sm font-normal">
										Remember me
									</Label>
								</div>
								{actionData?.error && (
									<Alert variant="destructive">
										<AlertDescription>{actionData.error}</AlertDescription>
									</Alert>
								)}
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Signing in...
										</>
									) : (
										"Sign in"
									)}
								</Button>
							</Form>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							<div className="flex justify-center">
								<p className="text-sm text-muted-foreground">
									Don't have an account?{" "}
									<Button variant="link" asChild className="p-0">
										<Link
											to={`/auth/register?returnTo=${encodeURIComponent(returnTo)}`}
										>
											Sign up
										</Link>
									</Button>
								</p>
							</div>
							<div className="flex justify-center">
								<Button variant="link" asChild className="p-0 text-sm">
									<Link to="/auth/forgot-password">Forgot your password?</Link>
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
