import { ChevronRight } from "lucide-react";

// Basic placeholder Breadcrumb component
// TODO: Replace with actual breadcrumb logic (e.g., using useMatches from Remix)
export function BreadcrumbNav() {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <a href="/dashboard" className="hover:text-foreground">Dashboard</a>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground">Current Page</span>
    </nav>
  );
} 