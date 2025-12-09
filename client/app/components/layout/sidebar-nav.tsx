import { cn } from "@/lib/utils";
import type { WorkSpace } from "@/types";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  className: string;
  currentWorkspace: WorkSpace | null;
}
const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className={cn("flex flex-col gap-y-2", className)} {...props}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        const handleClick = () => {
          if (item.href === "/workspaces") {
            navigate(item.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate(`${item.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(item.href);
          }
        };
        return (
          <Button
            key={item.href}
            variant={isActive ? "outline" : "ghost"}
            className={cn(
              "justify-start",
              isActive && " bg-sidebar-accent-foreground text-accent"
            )}
            onClick={handleClick}
          >
            <Icon className={cn(" size-4", !isCollapsed && "mr-2")} />
            {isCollapsed ? (
              <span className="sr-only">{item.title}</span>
            ) : (
              item.title
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default SidebarNav;
