import type { Task } from "@/types";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ArchiveRestore,
  ArrowUpRight,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const ArchivedTasks = ({ task }: { task: Task }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
            className="font-medium hover:text-primary hover:underline transition-colors"
          >
            {task.title}
            <ArrowUpRight className="size-5 inline ml-1" />
          </Link>
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-8 md:mr-26">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ArrowUpRight /> Task details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpRight /> Project details
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ArchiveRestore /> Restore
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <CardDescription className="space-y-1 mt-3">
          <div className="flex items-center gap-3">
            {task.status && (
              <Badge
                variant={task.status === "Done" ? "default" : "outline"}
                className="px-3"
              >
                {task.status}
              </Badge>
            )}
            {task.priority && (
              <Badge
                variant={task.priority === "High" ? "destructive" : "secondary"}
                className="px-3"
              >
                {task.priority}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground space-y-1 mt-2">
            {task.dueDate && <div>Due: {format(task.dueDate, "PPPP")}</div>}

            <div>
              Project: <span className="font-medium">{task.project.title}</span>
            </div>

            <div>Modified on: {format(task.updatedAt, "PPPP")}</div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
