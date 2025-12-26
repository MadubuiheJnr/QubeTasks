import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { useUpdateTaskDescriptionMutation } from "@/hooks/use-task";
import { Textarea } from "../ui/textarea";

export const TaskDescription = ({
  description,
  taskId,
  isArchived,
}: {
  description: string;
  taskId: string;
  isArchived: boolean;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(description);

  const { mutate, isPending } = useUpdateTaskDescriptionMutation();

  const updateTitle = () => {
    mutate(
      { taskId, description: newDescription },
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
    <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
      {isEditing ? (
        <Textarea
          className=" w-full "
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          disabled={isPending}
        />
      ) : (
        <div className="text-xs md:text-sm text-pretty flex-1 text-muted-foreground">
          {description}
        </div>
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
          disabled={isArchived}
        >
          <Edit className="size-3 inline text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};
