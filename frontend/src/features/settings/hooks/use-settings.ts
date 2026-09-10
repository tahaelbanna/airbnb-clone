import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppSettings, updateAppSettings } from "../api/queries";

export function useAppSettings() {
  return useQuery({
    queryKey: ["app-settings"],
    queryFn: getAppSettings,
  });
}

export function useAppSettingsMutations() {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: updateAppSettings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["app-settings"] }),
  });

  return { update };
}
