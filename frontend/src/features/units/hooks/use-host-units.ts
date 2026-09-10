import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHostUnits,
  createUnit,
  updateUnit,
  softDeleteUnit,
  activateUnit,
  deactivateUnit,
  deleteUnitPhotos,
  uploadUnitPhotos
} from "../api/queries";
import type { UnitsQuery, Unit } from "../types";

export function useHostUnits(query?: UnitsQuery) {
  return useQuery({
    queryKey: ["hostUnits", query],
    queryFn: () => getHostUnits(query),
  });
}

export function useHostUnitMutations() {
  const queryClient = useQueryClient();

  const createMut = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Unit> }) => updateUnit(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", data._id] });
    },
  });

  const softDeleteMut = useMutation({
    mutationFn: softDeleteUnit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });

  const activateMut = useMutation({
    mutationFn: activateUnit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });

  const deactivateMut = useMutation({
    mutationFn: deactivateUnit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });

  const deletePhotosMut = useMutation({
    mutationFn: ({ id, photos }: { id: string; photos: string[] }) => deleteUnitPhotos(id, photos),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });

  const uploadPhotosMut = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => uploadUnitPhotos(id, formData),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["hostUnits"] });
      queryClient.invalidateQueries({ queryKey: ["unit", id] });
    },
  });

  return {
    createUnit: createMut,
    updateUnit: updateMut,
    softDeleteUnit: softDeleteMut,
    activateUnit: activateMut,
    deactivateUnit: deactivateMut,
    deleteUnitPhotos: deletePhotosMut,
    uploadUnitPhotos: uploadPhotosMut
  };
}
