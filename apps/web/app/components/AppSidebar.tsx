import { Link } from "@remix-run/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarSeparator,
  useSidebar
} from "~/components/ui/sidebar";
import { 
  Home, 
  Settings, 
  User, 
  FileText, 
  Calendar, 
  LayoutDashboard, 
  Mail, 
  LineChart, 
  Users, 
  BarChart, 
  Bell, 
  Search,
  Inbox,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Check,
  PlusCircle
} from "lucide-react";
import { APP_NAME } from "~/lib/constants";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import React from "react";

// Organization options
const organizations = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Company LLC" },
  { id: "3", name: "Personal Account" }
];

// Main navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    badge: "12"
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
  },
];

// Resources menu items
const resourceItems = [
  {
    title: "Documentation",
    url: "/docs",
    icon: FileText,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: LineChart,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
  },
];

// Settings menu items
const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  
  // Reference to measure sidebar width
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = React.useState(256);
  
  React.useEffect(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.offsetWidth - 16); // 16px for padding
    }
  }, []);
  
  return (
    <Sidebar collapsible="icon" className="border-r" ref={sidebarRef}>
      <SidebarHeader className="border-b p-3 flex items-center h-14 relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto px-2 gap-2 data-[state=open]:bg-accent w-full justify-start" data-state={open ? "open" : "closed"}>
              <div className="h-6 w-6 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                A
              </div>
              {open && (
                <>
                  <span className="font-medium">Acme Inc</span>
                  <div className="flex-1" />
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            sideOffset={4}
            style={{ width: open ? `${sidebarWidth}px` : '180px' }}
            className="origin-top-left"
            side="bottom"
          >
            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} className="flex items-center gap-2">
                <div className="h-6 w-6 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  {org.name.charAt(0)}
                </div>
                <span>{org.name}</span>
                {org.name === "Acme Inc" && <Check className="h-4 w-4 ml-auto text-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Organization
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent className="pt-2">
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{open && item.title}</span>
                      {open && item.badge && (
                        <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Resources Section */}
        <SidebarGroup>
          {open && <SidebarGroupLabel className="px-3 pt-2">Resources</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{open && item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings Section */}
        <SidebarGroup>
          {open && <SidebarGroupLabel className="px-3 pt-2">Settings</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{open && item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 