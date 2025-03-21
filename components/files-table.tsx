"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUserFile } from "@/services/files";
import { getUserFiles } from "@/services/users";
import { useUserStore } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ExternalLink, File, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteFileDialog } from "./files/delete-file-dialog";
import { FileDetailsModal } from "./files/file-details-modal";
import { FileStatusBadge } from "./files/file-status-badge";

type FileData = {
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

export default function FilesTable() {
  const { user } = useUserStore();

  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    data: files,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["files", user?.id],
    queryFn: () => (user?.id ? getUserFiles(user.id) : Promise.resolve([])),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const nyTime = toZonedTime(date, "America/New_York");
      return format(nyTime, "MMM d, yyyy h:mm a");
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  const handleFileClick = (file: FileData) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, file: FileData) => {
    e.stopPropagation();
    setFileToDelete(file);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      await deleteUserFile(fileToDelete.id);
      toast.success(`File "${fileToDelete.originalName}" successfully deleted`);
      refetch();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error(
        `Failed to delete file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file: FileData) => (
            <TableRow
              key={file.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => handleFileClick(file as FileData)}
            >
              <TableCell>
                <div className="flex flex-col">
                  <div className="font-medium">{file.originalName}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="flex items-center text-xs px-2 py-0.5 uppercase"
                  >
                    <File className="h-4 w-4 mr-1" />
                    {file.fileType.split("/")[1]}
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <FileStatusBadge
                  status={file.status}
                  errorLog={file.errorLog}
                />
              </TableCell>
              <TableCell>{formatDate(file.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </a>
                  <Button
                    variant="ghost"
                    onClick={(e) => handleDeleteClick(e, file as FileData)}
                    className="inline-flex items-center text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FileDetailsModal
        file={selectedFile}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        formatDate={formatDate}
      />

      <DeleteFileDialog
        file={fileToDelete}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </>
  );
}
