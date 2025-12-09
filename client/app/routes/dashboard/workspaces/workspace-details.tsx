import Loader from "@/components/loader";
import { CreateProjectDialog } from "@/components/project/create-project-dialog";
import { ProjectList } from "@/components/workspace/project-list";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import { useGetWorkspaceQuery } from "@/hooks/use-workspace";
import type { Project, WorkSpace } from "@/types";
import { useState } from "react";
import { useParams } from "react-router";

const WorkspaceDetails = () => {
  const { workspaceId } = useParams() as {
    workspaceId: string;
  };
  const [isCreateProject, setIsCreateProject] = useState<boolean>(false);
  const [inviteMember, setInviteMember] = useState<boolean>(false);

  const { data, isLoading } = useGetWorkspaceQuery(workspaceId) as {
    data: {
      workspace: WorkSpace;
      projects: Project[];
    };
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8 py-5 lg:py-0">
      <WorkspaceHeader
        workspace={data.workspace}
        members={data.workspace.members}
        onCreateProject={() => setIsCreateProject(true)}
        onInviteMember={() => setInviteMember(true)}
      />

      <ProjectList
        workspaceId={workspaceId}
        projects={data.projects}
        onCreateProject={() => setIsCreateProject(true)}
      />

      <CreateProjectDialog
        isOpen={isCreateProject}
        onOpenChange={setIsCreateProject}
        workspaceId={workspaceId}
        workspaceMembers={data.workspace.members}
      />
    </div>
  );
};

export default WorkspaceDetails;
