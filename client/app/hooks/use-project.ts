import type { CreateProjectFormData } from "@/components/project/create-project-dialog";
import { getData, postData } from "@/lib/fetch-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      projectData: CreateProjectFormData;
      workspaceId: string;
    }) =>
      postData(
        `/projects/${data.workspaceId}/create-project`,
        data.projectData
      ),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.workspace],
      });
    },
  });
};

export const useProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getData(`/projects/${projectId}/tasks`),
  });
};
