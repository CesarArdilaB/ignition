import { Link, useRouteLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "~/lib/constants";

export const meta: MetaFunction = () => {
	return [
		{ title: `${APP_NAME} - ${APP_DESCRIPTION}` },
		{ 
			name: "description", 
			content: APP_DESCRIPTION 
		},
	];
};

function LandingPageContent() {
	return (
		<div className="container mx-auto py-12">
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
	const rootData = useRouteLoaderData("root") as { user: { id: string } | null } | undefined;
	const user = rootData?.user;

	if (user) {
		return <LoggedInIndexContent />;
	}

	return <LandingPageContent />;
}
