import { getUser, login, logout, register } from "@/services/auth";
import { getUsers } from "@/services/users";

export const api = {
  getUsers,
  getUser,
};

export const publicApi = {
  login,
  register,
  logout,
};
