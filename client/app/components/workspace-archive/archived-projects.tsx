import type { Project } from "@/types";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getProjectProgress } from "@/lib";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArchiveRestore,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
  Recycle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useToggleProjectArchive } from "@/hooks/use-project";
import { toast } from "sonner";

export const ArchiveProjects = ({
  project,
  workspaceId,
}: {
  project: Project;
  workspaceId: string;
}) => {
  const navigate = useNavigate();
  const projectProgress = getProjectProgress(project.tasks);

  const { mutate: toggleProjectArchive, isPending } = useToggleProjectArchive();

  const handleRestoreArchivedProject = () => {
    toggleProjectArchive(
      { projectId: project._id },
      {
        onSuccess: () => {
          toast.success("Project restored successfully");
        },
        onError: (error: any) => {
          const errMsg =
            error?.response?.data?.message || "Error archiving project";
          toast.error(errMsg);
        },
      }
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{project.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-8 md:mr-26 ">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(
                      `/workspaces/${workspaceId}/projects/${project._id}`
                    )
                  }
                >
                  <Eye /> View Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRestoreArchivedProject}>
                  <Recycle /> Restore
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          <div>
            <div className="flex items-center justify-between">
              {project.status && (
                <p>
                  <span className="font-medium">Status:</span> {project.status}
                </p>
              )}

              <p>
                <span className="font-medium">Progress:</span> {projectProgress}
                %
              </p>
            </div>
            <div className="flex items-center gap-3">
              {project.tasks.length > 0 && (
                <p>
                  <span className="font-medium">Tasks:</span>{" "}
                  {project.tasks.length}
                </p>
              )}
              {project.dueDate && (
                <p>
                  <span className="font-medium">Due:</span>{" "}
                  {format(project.dueDate, "MMM d, yyyy")}
                </p>
              )}
            </div>
          </div>
          {project.tags.length > 0 && (
            <div className="mt-3 space-x-1">
              {project.tags.map((tag) => (
                <Badge key={tag} variant={"outline"} className="px-3">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
