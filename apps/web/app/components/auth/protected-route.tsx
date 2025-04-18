import { useEffect } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { trpc } from "~/lib/trpc/client";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const location = useLocation();

	const { data: sessionData, isLoading, isError, error } = trpc.auth.getCurrentSession.useQuery(
		undefined,
		{
			refetchOnWindowFocus: false,
			retry: 1, // Retry once on error
		}
	);

	useEffect(() => {
		// Redirect if not loading, and there is no user
		if (!isLoading && !sessionData?.user) {
			const returnTo = encodeURIComponent(location.pathname + location.search);
			navigate(`/auth/login?returnTo=${returnTo}`, { replace: true });
		}
	}, [isLoading, sessionData, navigate, location]);

	// Handle explicit error state from the query
	if (isError) {
		// You might want to redirect to login on error too, or show an error message
		console.error("Session fetch error:", error);
		// Optionally redirect on error as well
		// const returnTo = encodeURIComponent(location.pathname + location.search);
		// navigate(`/auth/login?returnTo=${returnTo}`, { replace: true });
		return <div>Error loading session. Please try logging in again.</div>; 
	}

	// Show loading state
	if (isLoading) {
		// TODO: Replace with a proper spinner/skeleton component
		return <div>Loading session...</div>; 
	}

	// If loading is finished and user exists, render the children
	if (sessionData?.user) {
		return <>{children}</>;
	}

	// Fallback rendering while redirect effect happens (or if something unexpected occurs)
	return null; 
}
