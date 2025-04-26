import type React from 'react';
import { SidebarProvider, SidebarTrigger, useSidebar } from "~/components/ui/sidebar";
import { AppSidebar } from "../AppSidebar";
import { BreadcrumbNav } from "../BreadcrumbNav";
import { Search, Bell, User, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from '../ThemeToggle';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useSidebar();
  
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-20">
        <AppSidebar />
      </div>
      
      {/* Main content area with proper left margin */}
      <div className={`flex-1 w-full transition-all duration-300 ease-in-out ${open ? 'pl-64' : 'pl-14'}`}>
        <header className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] h-14 items-center border-b bg-background px-6 w-full">
          {/* Left section */}
          <div className="flex items-center gap-2">
            {/* Sidebar toggle button */}
            {open ? (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8" 
                onClick={() => setOpen(false)}
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Collapse sidebar</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setOpen(true)}
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Expand sidebar</span>
              </Button>
            )}
            
            <BreadcrumbNav />
          </div>
          
          {/* Middle section - empty */}
          <div />
          
          {/* Right section with search and user menu */}
          <div className="flex items-center gap-2 justify-end">
            <ThemeToggle />
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <LayoutContent>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
} 