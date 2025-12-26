import type { TaskPriority } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUpdateTaskPriorityMutation } from "@/hooks/use-task";
import { toast } from "sonner";

export const TaskPrioritySelector = ({
  priority,
  taskId,
  isArchived,
}: {
  priority: TaskPriority;
  taskId: string;
  isArchived: boolean;
}) => {
  const { mutate, isPending } = useUpdateTaskPriorityMutation();

  const handleStatusChange = (value: string) => {
    mutate(
      { taskId, priority: value as TaskPriority },
      {
        onSuccess: () => {
          toast.success("Status updated");
        },
        onError: (error: any) => {
          const errMsg = error.response.data.message;
          toast.error(errMsg || "An error occurred. Please try again");
          console.log(error);
        },
      }
    );
  };
  return (
    <Select value={priority || ""} onValueChange={handleStatusChange}>
      <SelectTrigger
        className="min-w-[100px]"
        disabled={isPending || isArchived}
      >
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
      </SelectContent>
    </Select>
  );
};
