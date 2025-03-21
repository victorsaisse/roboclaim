"use client";

import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { TZDate } from "@date-fns/tz";

export default function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <ul>
      {data.map((user: { id: string; email: string; createdAt: string }) => (
        <li key={user.id}>
          <p>{user.email}</p>
          <p>{new TZDate(user.createdAt, "America/New_York").toString()}</p>
        </li>
      ))}
    </ul>
  );
}
