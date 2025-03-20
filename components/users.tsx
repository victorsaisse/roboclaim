"use client";

import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <ul>
      {data.map((user: { id: string; email: string }) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
