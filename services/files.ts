"use client";

import { apiClient } from "@/services/api-client";

export async function deleteUserFile(fileId: string) {
  const response = await apiClient.delete(`/files/${fileId}`);

  if (response.status !== 200) {
    throw new Error("Failed to delete file");
  }

  return response.data;
}

export async function uploadFile(formData: FormData) {
  const response = await apiClient.post("/files/upload", formData);

  return response.data;
}
