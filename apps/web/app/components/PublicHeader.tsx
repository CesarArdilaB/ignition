import { Link } from "@remix-run/react";

export function PublicHeader() { // Renamed from LandingHeader
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> TODO: Replace with actual logo */}
            <span className="font-bold sm:inline-block">
              YourAppName
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {/* TODO: Add navigation links here */}
            <Link
              to="/features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            {/* TODO: Add Login/Sign Up buttons here */}
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 