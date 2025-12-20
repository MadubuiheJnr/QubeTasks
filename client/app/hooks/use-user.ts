import type { ProfileFormData } from "@/components/user-profile/mobile-profile/manage-profile-drawer";
import type { ChangePasswordFormData } from "@/components/user-profile/mobile-profile/password-and-security-drawer/password";
import { getData, updateData } from "@/lib/fetch-utils";
import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"];

export const useUserProfileQuery = (token: string | null) => {
  return useQuery({
    queryKey,
    queryFn: () => getData("/users/profile"),
    enabled: Boolean(token),
    retry: false,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) =>
      updateData("/users/change-password", data),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (data: ProfileFormData) => updateData("/users/profile", data),
  });
};
