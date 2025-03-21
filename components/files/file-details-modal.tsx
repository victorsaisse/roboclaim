import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileData } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";

type FileDetailsModalProps = {
  file: FileData | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  formatDate: (date: string) => string;
};

export function FileDetailsModal({
  file,
  isOpen,
  setIsOpen,
  formatDate,
}: FileDetailsModalProps) {
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Last updated ${formatDistanceToNow(date)} ago`;
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="overflow-y-auto max-h-[90vh]"
        style={{ maxWidth: "90vw", width: "90vw" }}
      >
        <DialogHeader>
          <DialogTitle className="break-words">{file.originalName}</DialogTitle>
          <DialogDescription>
            {formatDate(file.createdAt)} • {formatRelativeTime(file.updatedAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
          <h3 className="text-sm font-medium text-green-800 mb-1">Summary</h3>
          <p className="text-green-700 break-words">{file.summary}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Extracted Data</h3>
          <div className="bg-slate-100 rounded-md p-4 overflow-x-auto">
            <pre className="text-xs whitespace-pre-wrap break-words max-w-full">
              {file.extractedData}
            </pre>
          </div>
        </div>

        {file.errorLog && (
          <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
            <h3 className="text-sm font-medium text-red-800 mb-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Error Log
            </h3>
            <p className="text-red-700 break-words">{file.errorLog}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
