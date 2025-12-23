import Loader from "@/components/loader";
import { NoDataFound } from "@/components/no-data-found";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchiveProjects } from "@/components/workspace-archive/archived-projects";
import { ArchivedTasks } from "@/components/workspace-archive/archived-tasks";
import { useGetWorkspaceArchive } from "@/hooks/use-workspace";
import type { Project, Task } from "@/types";
import { useState } from "react";
import { useSearchParams } from "react-router";

const WorkspaceArchive = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const [isTaskArchive, setIsTaskArchive] = useState<boolean>(false);

  const { data, isPending } = useGetWorkspaceArchive(workspaceId as string) as {
    data: {
      archivedProjects: Project[];
      archivedTasks: Task[];
      totalArchivedProjects: number;
      totalArchivedTasks: number;
    };
    isPending: boolean;
  };

  console.log(data);

  if (!workspaceId)
    return (
      <NoDataFound
        title="No Workspace Selected"
        description="Please select a workspace to view its archived projects and tasks. use the workspace switcher to pick one and continue."
        className="mt-6"
      />
    );

  if (isPending) return <Loader />;

  return (
    <div className="py-6 space-y-5">
      <div>
        <p className="text-xl font-semibold text-primary">Archive</p>
        <p className="text-sm text-muted-foreground font-medium">
          Access all archived projects and tasks within this workspace. Archived
          items are kept for references and can be restored at any time
        </p>
      </div>

      {!isTaskArchive ? (
        <Input placeholder="Search archived projects" />
      ) : (
        <Input placeholder="Search archived tasks" />
      )}

      <Tabs defaultValue="projects" className="mt-5">
        <TabsList>
          <TabsTrigger value="projects" onClick={() => setIsTaskArchive(false)}>
            Archived Projects
          </TabsTrigger>
          <TabsTrigger value="tasks" onClick={() => setIsTaskArchive(true)}>
            Archived Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          {data.archivedProjects.map((project) => (
            <ArchiveProjects key={project._id} project={project} />
          ))}
        </TabsContent>
        <TabsContent
          value="tasks"
          className="grid grid-cols-1 gap-3 py-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {data.archivedTasks.map((task) => (
            <ArchivedTasks key={task._id} task={task} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceArchive;
