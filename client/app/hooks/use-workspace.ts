import type { WorkspaceFormData } from "@/components/workspace/create-workspace";
import { getData, postData } from "@/lib/fetch-utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data: WorkspaceFormData) =>
      postData("/workspaces", data),
  });
};
export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => getData("/workspaces"),
  });
};

export const useGetWorkspaceQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => getData(`/workspaces/${workspaceId}/projects`),
  });
};
