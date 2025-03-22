"use client";

import { ErrorMessage } from "@/components/error-message";
import { DeleteFileDialog } from "@/components/files/delete-file-dialog";
import { FileDetailsModal } from "@/components/files/file-details-modal";
import { FileStatusBadge } from "@/components/files/file-status-badge";
import { PaginationComponent } from "@/components/pagination";
import { FilesTableSkeleton } from "@/components/skeletons/files-table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileData } from "@/lib/types";
import { deleteUserFile } from "@/services/files";
import { getUserFiles } from "@/services/users";
import { useUserStore } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ExternalLink, File, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";

export default function FilesTable() {
  const { user } = useUserStore();

  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [fileName] = useQueryState("fileName");
  const [fileType] = useQueryState("fileType");
  const [status] = useQueryState("status");
  const [sortBy] = useQueryState("sortBy");
  const [sortOrder] = useQueryState("sortOrder");
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value),
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "files",
      user?.id,
      fileName,
      fileType,
      status,
      sortBy,
      sortOrder,
      page,
    ],
    queryFn: () =>
      user?.id
        ? getUserFiles({
            userId: user.id,
            fileName: fileName || "",
            fileType: fileType || "",
            status: status || "",
            sortBy: sortBy || "",
            sortOrder: sortOrder || "",
          })
        : Promise.resolve([]),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <FilesTableSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="We couldn't load your files. Please try again."
        onRetry={() => refetch()}
      />
    );
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

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const totalPages = Math.ceil(data.total / 10);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto mb-4 border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Processing Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.files.map((file: FileData) => (
              <TableRow
                key={file.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => handleFileClick(file as FileData)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium truncate max-w-[200px]">
                      {file.originalName}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className="flex items-center text-xs p-2 py-0.5 uppercase"
                    >
                      <File className="h-4 w-4 mr-1" />
                      <span className="truncate max-w-[100px]">
                        {file.fileType.split("/")[1]}
                      </span>
                    </Badge>
                  </div>
                </TableCell>

                <TableCell>
                  <FileStatusBadge status={file.status} />
                </TableCell>
                <TableCell>{formatDate(file.createdAt)}</TableCell>
                <TableCell>{format(file.processingTime, "ss.SSS")}s</TableCell>
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
      </div>

      <PaginationComponent
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

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
    </div>
  );
}
