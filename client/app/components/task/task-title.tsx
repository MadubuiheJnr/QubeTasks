import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useUpdateTaskTitleMutation } from "@/hooks/use-task";
import { toast } from "sonner";

export const TaskTitle = ({
  title,
  taskId,
}: {
  title: string;
  taskId: string;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const { mutate, isPending } = useUpdateTaskTitleMutation();

  const updateTitle = () => {
    mutate(
      { taskId, title: newTitle },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Tittle updated successfully");
        },
        onError: (error: any) => {
          const errMsg = error.response.data.message;
          toast.error(errMsg);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
      {isEditing ? (
        <Input
          className="text-lg! font-semibold w-full lg:w-125"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={isPending}
        />
      ) : (
        <h2 className="text-lg font-semibold">{title}</h2>
      )}

      {isEditing ? (
        <>
          <Button
            className="py-0"
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsEditing(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            className="py-0"
            size={"sm"}
            onClick={updateTitle}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </>
      ) : (
        <Button
          className="cursor-pointer w-fit"
          variant={"outline"}
          size={"sm"}
          onClick={() => setIsEditing(true)}
        >
          <Edit className="size-3 inline text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};
