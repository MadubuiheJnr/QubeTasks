import Loader from "@/components/loader";
import { NoDataFound } from "@/components/no-data-found";
import { Button } from "@/components/ui/button";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import WorkspaceCard from "@/components/workspace/workspace-card";
import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import type { WorkSpace } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

const Workspaces = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] =
    useState<boolean>(false);
  const { data: workspaces, isLoading } = useGetWorkspacesQuery() as {
    data: WorkSpace[];
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="space-y-8 py-5 lg:py-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:3xl font-bold text-primary">Workspaces</h2>

          <Button onClick={() => setIsCreatingWorkspace(true)}>
            <Plus className="inline size-4" />
            <span>New</span>
            <span className="hidden md:inline">Workspace</span>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.length > 0 &&
            workspaces.map((workspace) => (
              <WorkspaceCard key={workspace._id} workspace={workspace} />
            ))}

          {workspaces.length === 0 && (
            <NoDataFound
              title="No workspace found"
              description="Create a workspace to get started"
              btnText="Create Workspace"
              btnAction={() => setIsCreatingWorkspace(true)}
            />
          )}
        </div>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

export default Workspaces;
