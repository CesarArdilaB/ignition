import { Check } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { APP_NAME } from "~/lib/constants";
import { useState } from "node_modules/react-resizable-panels/dist/declarations/src/vendor/react";

const organizations = [
	{ id: "1", name: "Acme Inc" },
	{ id: "2", name: "Company LLC" },
	{ id: "3", name: "Personal Account" },
];

function TopDropDownMenu() {
	const [open, setOpen] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(250);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-auto px-2 gap-2 data-[state=open]:bg-accent w-full justify-start"
					data-state={open ? "open" : "closed"}
				>
					<div className="h-6 w-6 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
						A
					</div>
					{open && (
						<>
							<span className="font-medium">{APP_NAME}</span>
							<div className="flex-1" />
							<ChevronDown className="h-4 w-4 text-muted-foreground" />
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="start"
				sideOffset={4}
				style={{ width: open ? `${sidebarWidth}px` : "180px" }}
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
						{org.name === "Acme Inc" && (
							<Check className="h-4 w-4 ml-auto text-primary" />
						)}
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<PlusCircle className="h-4 w-4 mr-2" />
					Create Organization
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default TopDropDownMenu;
