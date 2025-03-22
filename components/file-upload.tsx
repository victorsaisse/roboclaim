"use client";

import { apiClient } from "@/services/api-client";
import { useUserStore } from "@/store/use-user-store";
import { useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export function FileUpload() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const uploadAndProcessFile = useCallback(
    async (file: File) => {
      const refetch = () => {
        queryClient.invalidateQueries({ queryKey: ["user-stats"] });
        queryClient.invalidateQueries({ queryKey: ["user-files"] });
      };

      const validateFile = (file: File) => {
        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          toast.error(
            "Invalid file type. Please upload PDF, image, CSV or XLSX only."
          );
          return false;
        }

        if (file.size > MAX_FILE_SIZE) {
          toast.error("File too large. Maximum size is 5MB.");
          return false;
        }

        return true;
      };

      if (!validateFile(file)) return;

      if (!user?.id) {
        toast.error("User information not available. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("userId", String(user.id));

      setIsLoading(true);
      try {
        const response = await apiClient.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status !== 201) {
          throw new Error("Upload failed");
        }

        toast.success("File uploaded successfully!");
        const filePath = response.data.path;

        const extractResponse = await apiClient.post("/files/extract", {
          filePath,
        });

        if (extractResponse.status !== 201) {
          throw new Error("Extract failed");
        }

        refetch();

        toast.success("File extraction started!");
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
        console.error("Upload error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [user, queryClient]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      await uploadAndProcessFile(files[0]);
    },
    [uploadAndProcessFile]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      await uploadAndProcessFile(files[0]);
    },
    [uploadAndProcessFile]
  );

  return (
    <div
      className={`h-full flex items-center justify-center relative w-full rounded-xl border-2 border-dashed p-12 text-center transition-colors  ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-muted-foreground/25"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div>
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx"
          disabled={isLoading}
        />

        <Upload className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />

        <h3 className="mb-2 text-lg font-medium">
          Drag and drop your file here
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">or click to browse</p>
        <p className="text-xs text-muted-foreground">
          Accepts PDF, images, CSV or XLSX (max 5MB)
        </p>

        {isLoading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
