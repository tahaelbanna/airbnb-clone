"use client";

import { useState } from "react";
import { useHostUnitMutations } from "@/features/units/hooks/use-host-units";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Upload } from "lucide-react";
import type { Unit } from "@/features/units/types";

interface UnitPhotoManagerProps {
  unit: Unit;
}

export function UnitPhotoManager({ unit }: UnitPhotoManagerProps) {
  const { deleteUnitPhotos, uploadUnitPhotos } = useHostUnitMutations();
  const [deletingUrls, setDeletingUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDelete = async (url: string) => {
    if (!confirm("Delete this photo?")) return;
    setDeletingUrls((prev) => [...prev, url]);
    try {
      await deleteUnitPhotos.mutateAsync({ id: unit._id, photos: [url] });
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete photo";
      alert(msg);
    } finally {
      setDeletingUrls((prev) => prev.filter((u) => u !== url));
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const selected = Array.from(e.target.files);
    
    if (unit.unit_photos.length + selected.length > 5) {
      alert("Maximum 5 photos allowed. Please delete some first.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      selected.forEach((file) => {
        formData.append("unit_photos", file);
      });
      await uploadUnitPhotos.mutateAsync({ id: unit._id, formData });
      e.target.value = "";
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to upload photos";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 mt-8">
      <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>
      
      <div className="flex gap-4 flex-wrap mb-4">
        {unit.unit_photos?.map((photoUrl) => (
          <div key={photoUrl} className="relative w-32 h-32 rounded-lg overflow-hidden border group">
            <img src={photoUrl} alt="unit" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="outline" 
                size="sm"
                disabled={deletingUrls.includes(photoUrl)}
                onClick={() => handleDelete(photoUrl)}
              >
                {deletingUrls.includes(photoUrl) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-red-500" />}
              </Button>
            </div>
          </div>
        ))}

        {(!unit.unit_photos || unit.unit_photos.length < 5) && (
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors relative cursor-pointer">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <>
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs text-center px-2">Upload up to {5 - (unit.unit_photos?.length || 0)}</span>
              </>
            )}
            <input 
              type="file"
              disabled={uploading}
              multiple
              accept="image/png, image/jpeg, image/jpg"
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              onChange={handleUpload}
            />
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted">You can have a maximum of 5 photos. Upload PNG, JPG, or JPEG files up to 5MB.</p>
    </div>
  );
}
