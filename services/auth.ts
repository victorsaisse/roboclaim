"use client";

import { apiClient, publicApiClient } from "@/services/api-client";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";

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
      useUserStore.setState({
        user: {
          id: response.data.user.id,
          email: response.data.user.email,
          role: response.data.user.role,
        },
      });
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
  redirect("/");
}

export async function getUser() {
  const response = await apiClient.get("/auth/profile");
  return response.data;
}
