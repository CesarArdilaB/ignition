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
	SidebarSeparator,
	useSidebar,
} from "~/components/ui/sidebar";
import {
	User,
	FileText,
	Calendar,
	LayoutDashboard,
	LineChart,
	Users,
	BarChart,
	Inbox,
} from "lucide-react";
import React from "react";
import { NameAndLogo } from "./NameAndLogo";

// Main navigation items
const mainNavItems = [
	{
		title: "Home",
		url: "/",
		icon: LayoutDashboard,
	},
	{
		title: "Menu 1",
		url: "/",
		icon: Inbox,
		badge: "12",
	},
	{
		title: "Menu 2",
		url: "/",
		icon: Calendar,
	},
	{
		title: "Menu 3",
		url: "/",
		icon: BarChart,
	},
];

// Resources menu items
const otherItems = [
	{
		title: "Database Example",
		url: "/example/database",
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


export function AppSidebar() {
	const { open } = useSidebar();

	// Reference to measure sidebar width
	const sidebarRef = React.useRef<HTMLDivElement>(null);

	return (
		<Sidebar collapsible="icon" className="border-r" ref={sidebarRef}>
			<SidebarHeader className="border-b p-3 flex items-start h-14 relative">
				<NameAndLogo open={open} />
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
					{open && (
						<SidebarGroupLabel className="px-3 pt-2">
							Other
						</SidebarGroupLabel>
					)}
					<SidebarGroupContent>
						<SidebarMenu>
							{otherItems.map((item) => (
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
							<span className="text-xs text-muted-foreground">
								user@example.com
							</span>
						</div>
					)}
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
