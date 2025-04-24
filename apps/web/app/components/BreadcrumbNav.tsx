import { Link, useLocation } from "@remix-run/react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

export function BreadcrumbNav() {
  const location = useLocation();
  
  // This is a simplified example - in a real app, you'd generate
  // these breadcrumbs dynamically based on your routing
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    
    // For demonstration purposes, we'll use example breadcrumbs to match the shadcn/ui docs
    if (path === "/") {
      return [{ label: 'Home', href: '/', active: true }];
    }
    
    // Example path for dashboard
    if (path.startsWith("/dashboard")) {
      return [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard', active: true }
      ];
    }
    
    // Example path for settings
    if (path.startsWith("/settings")) {
      return [
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings', active: true }
      ];
    }
    
    // Example path for analytics
    if (path.startsWith("/analytics")) {
      return [
        { label: 'Home', href: '/' },
        { label: 'Analytics', href: '/analytics', active: true }
      ];
    }
    
    // Example path for projects (with a sub-item)
    if (path.includes("/projects/")) {
      const projectId = path.split("/projects/")[1];
      return [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: `Project ${projectId}`, href: `/projects/${projectId}`, active: true }
      ];
    }
    
    // Default breadcrumb generation for other paths
    const parts = path.split('/').filter(Boolean);
    
    // Start with home
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    // Build up the breadcrumb paths
    let currentPath = '';
    
    parts.forEach((part, i) => {
      currentPath += `/${part}`;
      const isLast = i === parts.length - 1;
      
      // Format the label (capitalize first letter, replace hyphens with spaces)
      const label = part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      
      breadcrumbs.push({
        label,
        href: currentPath,
        active: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();

  // Handle case where we're on the home page (show only home)
  if (breadcrumbs.length === 1) {
    return (
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <div>
              <Link to="/" className="text-sm font-medium text-foreground flex items-center">
                <Home className="h-4 w-4 flex-shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, idx) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center">
              {idx !== 0 && (
                <ChevronRight 
                  className="h-4 w-4 flex-shrink-0 text-muted-foreground" 
                  aria-hidden="true" 
                />
              )}
              <Link
                to={breadcrumb.href}
                className={`ml-2 text-sm font-medium ${
                  breadcrumb.active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } ${idx === 0 ? "ml-0 flex items-center" : ""}`}
                aria-current={breadcrumb.active ? "page" : undefined}
              >
                {idx === 0 ? (
                  <>
                    <Home className="h-4 w-4 flex-shrink-0" />
                    <span className="sr-only">Home</span>
                  </>
                ) : (
                  breadcrumb.label
                )}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
} 