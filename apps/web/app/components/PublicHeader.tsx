import { Link } from "@remix-run/react";
import { APP_NAME } from "~/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { NameAndLogo } from "./NameAndLogo";

export function PublicHeader() {
	// Renamed from LandingHeader
	return (
		<header className="bg-background sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center justify-between px-8">
				<div className="flex items-center gap-6 md:gap-10">
					<Link to="/" className="flex items-center space-x-2">
						<NameAndLogo open={true} />
					</Link>
					<nav className="hidden md:flex items-center gap-6 text-sm">
						{/* TODO: Add navigation links here */}
						<Link
							to="/features"
							className="transition-colors hover:text-foreground/80 text-foreground/60"
						>
							Features
						</Link>
						{/* <Link
              to="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link> */}
					</nav>
				</div>
				<div className="flex items-center space-x-2">
					<ThemeToggle />
					<Link
						to="/login"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
					>
						Signup
					</Link>
					{/* Mobile Menu Trigger (Optional - Add if needed) */}
					{/* <button className="md:hidden ...">Menu</button> */}
				</div>
			</div>
		</header>
	);
}
