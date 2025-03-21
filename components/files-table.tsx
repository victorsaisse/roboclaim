"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFiles } from "@/services/users";
import { useUserStore } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  File,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

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

  const {
    data: files,
    isLoading,
    error,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 mr-1 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

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

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Last updated ${formatDistanceToNow(date)} ago`;
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  const handleFileClick = (file: FileData) => {
    setSelectedFile(file);
    setIsModalOpen(true);
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
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`flex items-center ${getStatusBadgeVariant(
                      file.status
                    )}`}
                  >
                    {getStatusIcon(file.status)}
                    {file.status}
                  </Badge>

                  {file.errorLog && (
                    <Badge className="flex items-center text-xs px-2 py-0.5 bg-orange-100 text-orange-800">
                      <AlertTriangle className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(file.createdAt)}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedFile && (
          <DialogContent
            className="overflow-y-auto max-h-[90vh]"
            style={{ maxWidth: "90vw", width: "90vw" }}
          >
            <DialogHeader>
              <DialogTitle className="break-words">
                {selectedFile.originalName}
              </DialogTitle>
              <DialogDescription>
                {formatDate(selectedFile.createdAt)} •{" "}
                {formatRelativeTime(selectedFile.updatedAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
              <h3 className="text-sm font-medium text-green-800 mb-1">
                Summary
              </h3>
              <p className="text-green-700 break-words">
                {selectedFile.summary}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Extracted Data</h3>
              <div className="bg-slate-100 rounded-md p-4 overflow-x-auto">
                <pre className="text-xs whitespace-pre-wrap break-words max-w-full">
                  {selectedFile.extractedData}
                </pre>
              </div>
            </div>

            {selectedFile.errorLog && (
              <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium text-red-800 mb-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Error Log
                </h3>
                <p className="text-red-700 break-words">
                  {selectedFile.errorLog}
                </p>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
