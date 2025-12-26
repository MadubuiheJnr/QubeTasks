import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-context";
import type { WorkSpace } from "@/types";
import {
  Archive,
  CheckSquare,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  SidebarClose,
  SidebarOpen,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { LogoIcon, LogoText } from "../logo";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import SidebarNav from "./sidebar-nav";

const Sidebar = ({
  currentWorkspace,
}: {
  currentWorkspace: WorkSpace | null;
}) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Workspaces",
      href: "/workspaces",
      icon: Layers,
    },
    {
      title: "My Tasks",
      href: "/my-tasks",
      icon: CheckSquare,
    },
    {
      title: "Members",
      href: "/members",
      icon: Users,
    },
    {
      title: "Archive",
      href: "/archive",
      icon: Archive,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  return (
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w-24" : "w-16 md:w-60"
      )}
    >
      <div className="flex h-14 items-center border-b px-4 py-9 mb-4">
        <Link to="/dashboard" className="flex items-center">
          {isCollapsed ? (
            <LogoIcon className="size-7" />
          ) : (
            <div className="flex items-center gap-2">
              <LogoIcon className="size-7" />
              <LogoText className="text-primary font-semibold text-lg hidden md:block" />
            </div>
          )}
        </Link>

        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-auto hidden md:flex items-center justify-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <SidebarOpen className="size-4 text-muted-foreground" />
          ) : (
            <SidebarClose className="size-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      <div>
        <Button
          variant={"ghost"}
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
        >
          <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
