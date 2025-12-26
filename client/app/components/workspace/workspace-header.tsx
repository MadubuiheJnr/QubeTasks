import type { User, WorkSpace } from "@/types";
import WorkspaceAvatar from "./workspace-avatar";
import { Button } from "../ui/button";
import {
  ArchiveIcon,
  MoreHorizontal,
  Plus,
  Trash2,
  UserPlus2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface WorkspaceHeaderProps {
  workspace: WorkSpace;
  members: {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
  }[];
  onCreateProject: () => void;
  onInviteMember: () => void;
}

export const WorkspaceHeader = ({
  workspace,
  members,
  onCreateProject,
  onInviteMember,
}: WorkspaceHeaderProps) => {
  console.log(members);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex md:items-center gap-3">
            {workspace.color && (
              <WorkspaceAvatar color={workspace.color} name={workspace.name} />
            )}
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              {workspace.name}
            </h2>
          </div>

          {/* Workspace Actions */}
          <div className="flex items-center gap-3">
            <div className="items-center gap-3 justify-between md:justify-start mb-4 md:mb-0 hidden md:flex">
              <Button variant="outline" onClick={onInviteMember}>
                <UserPlus2 className="size-4 mr-2" />
                Invite
              </Button>
              <Button onClick={onCreateProject}>
                <Plus className="size-4" />
                New Project
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <MoreHorizontal className="size-5 mr-2 md:hidden" />
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="hidden md:hidden"
                >
                  <MoreHorizontal className="size-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="mr-3">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer md:hidden"
                    onClick={onCreateProject}
                  >
                    <Plus className="size-4" />
                    New Project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer md:hidden"
                    onClick={onInviteMember}
                  >
                    <UserPlus2 className="size-4" />
                    Invite Member
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Trash2 className="size-4" />
                    Delete Workspace
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {workspace.description && (
          <p className="text-sm md:text-base text-muted-foreground">
            {workspace.description}
          </p>
        )}
      </div>

      {members.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Members</span>
          <div className="flex items-center -space-x-2">
            {members.map((member) => (
              <Avatar
                key={member._id}
                className="relative h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                title={member.user.name}
              >
                <AvatarImage
                  src={member.user.profilePicture}
                  alt={member.user.name}
                />
                <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
