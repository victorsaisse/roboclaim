import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

type FileStatusBadgeProps = {
  status: string;
  errorLog?: string;
};

export function FileStatusBadge({ status, errorLog }: FileStatusBadgeProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <RefreshCw className="h-4 w-4 mr-1 animate-spin" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 mr-1 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 mr-1" />;
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

  return (
    <div className="flex items-center space-x-2">
      <Badge className={`flex items-center ${getStatusBadgeVariant(status)}`}>
        {getStatusIcon(status)}
        {status}
      </Badge>

      {errorLog && (
        <Badge className="flex items-center text-xs px-2 py-0.5 bg-orange-100 text-orange-800">
          <AlertTriangle className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
}
