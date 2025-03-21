import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Ignition - Build Something Great" },
    { name: "description", content: "Welcome to Ignition" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Build Something Great
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Start your next project with Ignition - The modern full-stack toolkit
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 