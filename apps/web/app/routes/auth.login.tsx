import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
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
import { auth } from "auth";

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

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Get the return URL from the form data
  const returnTo = formData.get("returnTo") as string || "/dashboard";

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (result.token) {
      return redirect(returnTo);
    }

    return json<ActionData>({ 
      success: false,
      error: "Failed to create session" 
    }, { status: 400 });

  } catch (error) {
    if (error instanceof Error) {
      return json<ActionData>(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return json<ActionData>(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
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
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="returnTo" value={returnTo} />
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            {actionData?.error && (
              <div className="text-sm text-red-500">{actionData.error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" asChild className="p-0">
              <Link to={`/auth/register?returnTo=${encodeURIComponent(returnTo)}`}>
                Sign up
              </Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 