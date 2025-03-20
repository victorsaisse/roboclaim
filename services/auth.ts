"use client";

import { publicApiClient } from "@/services/api-client";

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
    return { error: "Authentication failed" };
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
    return { error: "Registration failed" };
  }
}

export async function logout() {
  localStorage.removeItem("token");
}
