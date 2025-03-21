"use client";

import { apiClient } from "@/services/api-client";

export async function getUsers() {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFiles({
  userId,
  fileName,
  fileType,
  status,
  sortBy,
  sortOrder,
}: {
  userId: string;
  fileName: string;
  fileType: string;
  status: string;
  sortBy: string;
  sortOrder: string;
}) {
  try {
    const response = await apiClient.get(`/users/${userId}/files`, {
      params: {
        fileName,
        fileType,
        status,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserStats(userId: string) {
  try {
    const response = await apiClient.get(`/users/${userId}/stats`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
