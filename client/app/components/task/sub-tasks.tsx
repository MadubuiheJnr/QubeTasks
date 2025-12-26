import type { Subtask } from "@/types";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { NoDataFound } from "../no-data-found";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useAddSubTaskMutation,
  useUpdateSubTaskMutation,
} from "@/hooks/use-task";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export const SubTasksDetails = ({
  subtasks,
  taskId,
  isArchived,
}: {
  subtasks: Subtask[];
  taskId: string;
  isArchived: boolean;
}) => {
  const [newSubTask, setNewSubTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { mutate: addSubTask, isPending } = useAddSubTaskMutation();
  const { mutate: updateSubTask, isPending: isUpdating } =
    useUpdateSubTaskMutation();

  const handleToggleTask = (subTaskId: string, checked: boolean) => {
    updateSubTask(
      { taskId, subTaskId, completed: checked },
      {
        onSuccess: () => {
          toast.success("Sub task updated successfully");
        },
        onError: (error: any) => {
          const errMessage = error.response.data.message;
          console.log(error);
          toast.error(errMessage);
        },
      }
    );
  };

  const handleAddSubtask = () => {
    addSubTask(
      { taskId, title: newSubTask },
      {
        onSuccess: () => {
          setNewSubTask("");
          setIsAdding(false);
          toast.success("Subtask added");
        },
        onError: (error: any) => {
          const errMsg =
            error.response.data.message ||
            "An error occurred. please try again later";
          toast.error(errMsg);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="mb-5 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-primary mb-0">Sub Tasks</h3>
        {subtasks.length > 0 && !isAdding && (
          <Button
            size={"sm"}
            disabled={isPending}
            onClick={() => setIsAdding(true)}
          >
            <Plus /> New Task
          </Button>
        )}
      </div>

      <div className="space-y-2 my-4">
        {subtasks.length > 0
          ? subtasks.map((subtask) => (
              <div key={subtask._id} className="flex items-center space-x-2">
                <Checkbox
                  id={subtask._id}
                  checked={subtask.completed}
                  onCheckedChange={(checked) =>
                    handleToggleTask(subtask._id, !!checked)
                  }
                />
                <Label
                  className={cn(
                    "text-sm",
                    subtask.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  )}
                >
                  {subtask.title}
                </Label>
              </div>
            ))
          : !isAdding && (
              <NoDataFound
                title="No tasks found"
                description="Create a task to get started"
                btnText="New Task"
                btnAction={() => setIsAdding(true)}
                disabled={isArchived}
              />
            )}
      </div>

      {isAdding && (
        <div className="flex items-center gap-5 flex-wrap">
          <Input
            placeholder="Add a sub task"
            value={newSubTask}
            onChange={(e) => setNewSubTask(e.target.value)}
            disabled={isPending}
          />

          <div className="flex items-center gap-5">
            <Button
              variant={"outline"}
              disabled={isPending}
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSubtask} disabled={isPending}>
              Add Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
