import { useAuth } from "@/provider/auth-context";
import type { WorkSpace } from "@/types";
import { Bell, ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
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
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import WorkspaceAvatar from "../workspace/workspace-avatar";
import { useState } from "react";
import { AlertDialog } from "../alert-dialog";

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
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const { workspaces } = useLoaderData() as { workspaces: WorkSpace[] };
  const isOnWorkspacePage = useLocation().pathname.includes("/workspace");

  const handleOnClick = (workspace: WorkSpace) => {
    onWorkspaceSelected(workspace);
    const location = window.location;

    if (isOnWorkspacePage) {
      navigate(`workspaces/${workspace._id}`);
    } else {
      const basePath = location.pathname;
      navigate(`${basePath}?workspaceId=${workspace._id}`);
    }
  };

  return (
    <>
      <div className="bg-background sticky top-0 z-40 border-b border-border">
        <div className="flex h-14 items-center justify-between px-4 py-9 sm:px-6 lg:px-8">
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
                    onClick={() => handleOnClick(workspace)}
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
              {workspaces.length > 0 && <DropdownMenuSeparator />}
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
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
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
                  <DropdownMenuItem onClick={() => setIsAlert(true)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AlertDialog
        title="Log out?"
        description="You'll be signed out of your account and will need to log in again to continue"
        isAlert={isAlert}
        onAlertChange={setIsAlert}
        alertActionText="Log out"
        onAlertAction={logout}
      />
    </>
  );
};

export default Header;
