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
  SidebarGroupContent
} from "~/components/ui/sidebar"; // Corrected alias
import { Home, Settings, User } from "lucide-react"; // Example icons

// Sample menu items
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard", // Adjust URL as needed
    icon: Home,
  },
];

const settingsMenuItems = [
  {
    title: "Settings",
    url: "/settings", // Adjust URL as needed
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* TODO: Add Logo/AppName here */}
        <span className="font-semibold text-lg p-4">App Name</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Use Remix <Link> or NavLink for client-side routing */}
                  <SidebarMenuButton asChild>
                    <a href={item.url}> {/* TODO: Replace with <Link> or <NavLink> */}
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                   <SidebarMenuButton asChild>
                    <a href={item.url}> {/* TODO: Replace with <Link> or <NavLink> */}
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* TODO: Implement User Component/Button here */}
        <div className="flex items-center gap-2 p-4 border-t border-border/40 text-sm">
          <User className="h-5 w-5" />
          <span>User Profile/Menu</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 