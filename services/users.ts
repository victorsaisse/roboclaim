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
