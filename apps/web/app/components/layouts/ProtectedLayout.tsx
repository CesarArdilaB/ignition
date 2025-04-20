import type React from 'react';
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"; // Corrected alias
import { AppSidebar } from "../AppSidebar";
import { BreadcrumbNav } from "../BreadcrumbNav";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"> {/* Adjust sm:pl-14 based on collapsed sidebar width */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" /> {/* Trigger for mobile */}
            <BreadcrumbNav />
            {/* Optional: Add other header elements like search, user menu dropdown etc. here */}
          </header>
          <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 