import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Loader from "@/components/loader";
import { CreateWorkspace } from "@/components/workspace/create-workspace";
import { getData } from "@/lib/fetch-utils";
import { useAuth } from "@/provider/auth-context";
import type { WorkSpace } from "@/types";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([getData("/workspaces")]);
    return { workspaces };
  } catch (error) {
    console.log(error);
  }
};

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] =
    useState<boolean>(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkSpace | null>(
    null
  );

  const handleWorkspaceSelected = (workspace: WorkSpace) => {
    setCurrentWorkspace(workspace);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex h-screen w-full ">
      <Sidebar currentWorkspace={currentWorkspace} />
      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />
        <main className="flex-1 overflow-y-auto w-full h-full no-scrollbar">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;
