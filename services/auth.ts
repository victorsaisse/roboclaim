"use client";

import { apiClient, publicApiClient } from "@/services/api-client";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await publicApiClient.post("/auth/login", {
      email,
      password,
    });

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await publicApiClient.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function getUser() {
  const response = await apiClient.get("/auth/profile");
  return response.data;
}
