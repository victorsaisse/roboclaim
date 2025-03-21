export type FileData = {
  id: string;
  url: string;
  path: string;
  originalName: string;
  fileType: string;
  status: "pending" | "processing" | "completed" | "failed";
  extractedData: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  errorLog?: string;
};
