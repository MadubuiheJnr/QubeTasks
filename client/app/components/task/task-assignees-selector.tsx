import type { ProjectMemberRole, Task, User } from "@/types";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useUpdateTaskAssigneesMutation } from "@/hooks/use-task";
import { toast } from "sonner";

export const TaskAssigneesSelector = ({
  task,
  assignees,
  projectMembers,
}: {
  task: Task;
  assignees: User[];
  projectMembers: { user: User; role: ProjectMemberRole }[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    assignees.map((assignee) => assignee._id)
  );
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const { mutate, isPending } = useUpdateTaskAssigneesMutation();

  const handleSelectAll = () => {
    const allIds = projectMembers.map((m) => m.user._id);

    setSelectedIds(allIds);
  };

  const handleUnSelectAll = () => {
    setSelectedIds([]);
  };

  const handleSelect = (id: string) => {
    let newSelect: string[] = [];

    if (selectedIds.includes(id)) {
      newSelect = selectedIds.filter((sId) => sId !== id);
    } else {
      newSelect = [...selectedIds, id];
    }

    setSelectedIds(newSelect);
  };

  const handleSave = () => {
    mutate(
      {
        taskId: task._id,
        assignees: selectedIds,
      },
      {
        onSuccess: () => {
          setDropDownOpen(false);
          toast.success("Assignees updated");
        },
        onError: (error: any) => {
          const errMsg =
            error.response.data.message || "Failed to updated assignees";
          setDropDownOpen(false);
          toast.error(errMsg);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-primary mb-2 ">Assignees</h3>

      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIds.length === 0 ? (
          <span className="text-xs text-muted-foreground">Unassigned</span>
        ) : (
          projectMembers
            .filter((member) => selectedIds.includes(member.user._id))
            .map((m) => (
              <div
                key={m.user._id}
                className="flex items-center bg-gray-100 rounded px-2 py-1"
              >
                <Avatar className="size-6 mr-1">
                  <AvatarImage src={m.user.profilePicture} />
                  <AvatarFallback className=" bg-primary text-primary-foreground">
                    {m.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {m.user.name}
                </span>
              </div>
            ))
        )}
      </div>

      {/* Drop down */}
      <div className="relative">
        <Button
          onClick={() => setDropDownOpen(!dropDownOpen)}
          variant={"outline"}
          size={"sm"}
          className="gap-x-5"
        >
          {selectedIds.length === 0
            ? "Select Assignees"
            : `${selectedIds.length} selected`}
          {dropDownOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>

        {dropDownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-primary-foreground border rounded shadow-lg max-h-60 overflow-y-auto pb-3">
            <div className="flex justify-between px-2 py-1 border-b">
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={handleSelectAll}
                className="text-xs text-primary"
              >
                Select All
              </Button>

              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={handleUnSelectAll}
                className="text-xs text-destructive hover:text-destructive  hover:bg-destructive/5"
              >
                Unselect All
              </Button>
            </div>

            {projectMembers.map((m) => (
              <label
                key={m.user._id}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <Checkbox
                  checked={selectedIds.includes(m.user._id)}
                  onCheckedChange={() => handleSelect(m.user._id)}
                  className="mr-2"
                />
                <Avatar className="size-6 mr-1 ">
                  <AvatarImage src={m.user.profilePicture} />
                  <AvatarFallback className=" bg-primary text-primary-foreground">
                    {m.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-primary font-medium">
                  {m.user.name}
                </span>
              </label>
            ))}

            <div className="flex justify-between px-2 py-1 mt-3">
              <Button
                variant={"outline"}
                size={"sm"}
                className="font-light"
                onClick={() => setDropDownOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                variant={"default"}
                size={"sm"}
                className="font-light"
                onClick={() => handleSave()}
                disabled={isPending}
              >
                {isPending ? "Save..." : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
