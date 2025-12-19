import type { Project } from "@/types";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { getTaskStatusColor } from "@/lib";
import { Progress } from "../ui/progress";
import { format } from "date-fns";
import { Timer } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  progress: number;
  workspaceId: string;
}

export const ProjectCard = ({
  project,
  progress,
  workspaceId,
}: ProjectCardProps) => {
  return (
    <Link to={`/workspaces/${workspaceId}/projects/${project._id}`}>
      <Card className=" transition-all duration-300 hover:shadow-md hover:translate-y-1">
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-2 lg:gap-5">
            <CardTitle className="line-clamp-2 flex-1">
              {project.title}
            </CardTitle>
            <span
              className={cn(
                "text-xs rounded-xl self-start p-1.5 font-semibold",
                getTaskStatusColor(project.status)
              )}
            >
              {project.status}
            </span>
          </div>
          <CardDescription className="line-clamp-2 text-sm">
            {project.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <Progress value={progress} className="h-2" />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center text-sm gap-2 text-muted-foreground">
                <span>{project.tasks.length}</span>
                <span>{project.tasks.length > 1 ? "Tasks" : "Task"}</span>
              </div>

              {project.dueDate && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Timer className="size-4" />
                  <span>{format(project.dueDate, "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
