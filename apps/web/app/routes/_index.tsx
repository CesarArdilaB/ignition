import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { auth } from "auth";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";
import { APP_DESCRIPTION, APP_NAME } from "~/lib/constants";
import { jsonResponse } from "~/lib/utils";

export const meta: MetaFunction = () => {
	return [
		{ title: `${APP_NAME} - ${APP_DESCRIPTION}` },
		{ 
			name: "description", 
			content: APP_DESCRIPTION 
		},
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	return jsonResponse({ user: session?.user ?? null });
}

function LandingPageContent() {
	return (
		<div className="container py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
					Track easy with {APP_NAME}
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
					{APP_DESCRIPTION}
				</p>
				<Button asChild size="lg">
					<Link to="/signup">Get Started</Link>
				</Button>
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
