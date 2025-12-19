import { BackButton } from "@/components/back-button";
import Loader from "@/components/loader";
import { NoDataFound } from "@/components/no-data-found";
import { CommentSection } from "@/components/task/comment-section";
import { SubTasksDetails } from "@/components/task/sub-tasks";
import { TaskActivity } from "@/components/task/task-activity";
import { TaskAssigneesSelector } from "@/components/task/task-assignees-selector";
import { TaskDescription } from "@/components/task/task-description";
import { TaskPrioritySelector } from "@/components/task/task-priority-selector";
import { TaskStatusSelector } from "@/components/task/task-status-selector";
import { TaskTitle } from "@/components/task/task-title";
import { Watchers } from "@/components/task/watchers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useArchivedTaskMutation,
  useTaskByIdQuery,
  useWatchTaskMutation,
} from "@/hooks/use-task";
import { useAuth } from "@/provider/auth-context";
import type { Project, ProjectMemberRole, Task, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Archive,
  ArchiveIcon,
  ArchiveRestore,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const TaskDetails = () => {
  const { user } = useAuth();
  const { workspaceId, projectId, taskId } = useParams() as {
    workspaceId: string;
    projectId: string;
    taskId: string;
  };

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const { data, isLoading } = useTaskByIdQuery(taskId) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };
  const { mutate: watchTask, isPending: isWatching } = useWatchTaskMutation();
  const { mutate: archiveTask, isPending: isArchiving } =
    useArchivedTaskMutation();

  if (isLoading) return <Loader />;

  if (!data)
    return (
      <NoDataFound
        title="No Task found"
        description="Create a Task to get started"
        btnText="Add Task"
        btnAction={goBack}
      />
    );

  const { task, project } = data;

  const isUserWatching = task.watchers?.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const members = task.assignees || [];

  const handleWatchTask = () => {
    watchTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task watched");
        },
        onError: () => {
          toast.error("Failed to watch task");
        },
      }
    );
  };

  const handleArchiveTask = () => {
    archiveTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task achieved");
        },
        onError: () => {
          toast.error("Failed to achieve task");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          <BackButton />

          <h1 className="text-xl md:text-2xl font-bold">{task.title}</h1>

          {task.isArchived && (
            <Badge className=" w-fit px-4" variant={"outline"}>
              <ArchiveIcon className="inline size-5" /> Archived
            </Badge>
          )}
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant={"outline"}
            size={"sm"}
            className=" w-fit"
            onClick={handleWatchTask}
            disabled={isWatching}
          >
            {isUserWatching ? (
              <>
                <EyeOff className="inline size-4" />
                <span>Stop Watching</span>
              </>
            ) : (
              <>
                <Eye className="inline size-4" />
                <span>Watch</span>
              </>
            )}
          </Button>

          <Button
            variant={"outline"}
            size={"sm"}
            className="w-fit"
            onClick={handleArchiveTask}
            disabled={isArchiving}
          >
            {task.isArchived ? (
              <>
                <ArchiveRestore className="inline" />
                Unarchive
              </>
            ) : (
              <>
                <Archive className="inline" />
                Archive
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="lg:col-span-5">
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                        ? "default"
                        : "outline"
                  }
                  className="mb-2 capitalize"
                >
                  {task.priority} Priority
                </Badge>
                <TaskTitle title={task.title} taskId={task._id} />

                <div className="text-xs lg:text-sm text-muted-foreground mt-3">
                  Created at:{" "}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                <TaskStatusSelector status={task.status} taskId={task._id} />

                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => {}}
                  className="hidden md:block"
                >
                  Delete Task
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-primary mb-0">
                Description
              </h3>
              <TaskDescription
                description={task.description || ""}
                taskId={taskId}
              />
            </div>

            <TaskAssigneesSelector
              task={task}
              assignees={task.assignees}
              projectMembers={
                project.members as { user: User; role: ProjectMemberRole }[]
              }
            />

            <TaskPrioritySelector priority={task.priority} taskId={taskId} />

            <SubTasksDetails subtasks={task.subtasks || []} taskId={taskId} />
          </div>

          <CommentSection taskId={task._id} members={project.members as any} />
        </div>

        <div className="lg:col-span-2">
          <Watchers watchers={task.watchers || []} />

          <TaskActivity resourceId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
