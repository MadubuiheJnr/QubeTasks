import { useAuth } from "@/provider/auth-context";
import type { WorkSpace } from "@/types";
import { Bell, ChevronDown, ChevronUp, LogIn, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLoaderData } from "react-router";
import WorkspaceAvatar from "../workspace/workspace-avatar";
import { useState } from "react";

interface HeaderProps {
  onWorkspaceSelected: (workspace: WorkSpace) => void;
  selectedWorkspace: WorkSpace | null;
  onCreateWorkspace: () => void;
}

const Header = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) => {
  const { user, logout } = useAuth();
  const { workspaces } = useLoaderData() as { workspaces: WorkSpace[] };
  console.log(workspaces);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="bg-background sticky top-0 z-40 border-b border-border">
      <div className="flex  h-14 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedWorkspace ? (
                <>
                  {selectedWorkspace.color && (
                    <WorkspaceAvatar
                      color={selectedWorkspace.color}
                      name={selectedWorkspace.name}
                    />
                  )}
                  <span className="font-medium">
                    {selectedWorkspace.name.slice(0, 10)}...
                  </span>
                </>
              ) : (
                <span className="font-medium">Select Workspace</span>
              )}
              <span> {dropdownOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => onWorkspaceSelected(workspace)}
                >
                  {workspace.color && (
                    <WorkspaceAvatar
                      color={workspace.color}
                      name={workspace.name}
                    />
                  )}
                  <span>{workspace.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkspace}>
                <PlusCircle className="w-4 h-4" />
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="text-accent-foreground">
                <DropdownMenuItem>
                  <Link to="/user/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
