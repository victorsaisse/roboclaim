"use client";

import { DeleteUserDialog } from "@/components/delete-user-dialog";
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
import { deleteUser, getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UsersTable() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users-admin"],
    queryFn: () => getUsers(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteClick = (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    setUserId(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (userId) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        setIsDeleteDialogOpen(false);
        setUserId(null);
        refetch();
      } catch (error) {
        toast.error("Failed to delete user");
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto mb-4 border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(
              (user: {
                id: string;
                email: string;
                createdAt: Date;
                role: string;
              }) => {
                if (user.role === "admin") {
                  return null;
                }
                return (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-slate-50"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium truncate max-w-[200px]">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center mt-1">
                        <Badge
                          variant="outline"
                          className="flex items-center text-xs p-2 py-0.5 uppercase"
                        >
                          <span className="truncate max-w-[100px]">
                            {user.role}
                          </span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(user.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          onClick={(e) => handleDeleteClick(e, user.id)}
                          className="inline-flex items-center text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
