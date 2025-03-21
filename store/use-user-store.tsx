import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  role: string;
};

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
    }
  )
);
