import { create } from "zustand";
import { persist } from "zustand/middleware";

type File = {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

type FilesState = {
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
};

export const useFilesStore = create<FilesState>()(
  persist(
    (set) => ({
      files: null,
      setFiles: (files) => set({ files }),
    }),
    {
      name: "files",
    }
  )
);
