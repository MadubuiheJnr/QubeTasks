import type { Task } from "@/types";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Divide, Eye, MoreHorizontal, Recycle, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useArchivedTaskMutation } from "@/hooks/use-task";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const ArchivedTasks = ({
  task,
  workspaceId,
}: {
  task: Task;
  workspaceId: string;
}) => {
  const navigate = useNavigate();
  const { mutate: archiveTask, isPending: isArchiving } =
    useArchivedTaskMutation();

  const handleRestoreArchivedTask = () => {
    archiveTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task restored");
        },
        onError: (error: any) => {
          const errMsg =
            error?.response?.data?.message || "Error restoring task";
          toast.error(errMsg);
        },
      }
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{task.title}</p>
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
                      `/workspaces/${workspaceId}/projects/${task.project._id}/tasks/${task._id}`
                    )
                  }
                >
                  <Eye /> View task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRestoreArchivedTask}>
                  <Recycle /> Restore
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription className="space-y-1 mt-3">
          <div className="flex items-center justify-between">
            {task.status && (
              <p>
                <span className="font-medium">Status:</span> {task.status}
              </p>
            )}
            {task.priority && (
              <p>
                <span className="font-medium">Priority:</span> {task.priority}
              </p>
            )}
          </div>
          {task.project.title && (
            <div>
              <span className="font-medium"> Project:</span>{" "}
              {task.project.title}
            </div>
          )}
          <p>
            <span className="font-medium">Subtasks:</span>{" "}
            {task.subtasks?.length}
          </p>

          {task.assignees?.length > 0 && (
            <div className="flex items-center -space-x-3 mt-3">
              {task.assignees.slice(0, 5).map((assignee) => (
                <Avatar className="size-8">
                  <AvatarImage
                    src={assignee?.profilePicture}
                    alt={assignee?.name}
                  />
                  <AvatarFallback className="text-sm">
                    {assignee?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length > 5 && (
                <span className="text-sm font-medium ml-2">
                  +{task.assignees.length - 5} more
                </span>
              )}
            </div>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
