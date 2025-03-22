"use client";

import { UserStatsSkeleton } from "@/components/skeletons/user-stats-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserStats } from "@/services/users";
import { useUserStore } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, Files, TrendingUp } from "lucide-react";
import { ErrorMessage } from "./error-message";
import { StatsChart } from "./stats-chart";

export function UserStats() {
  const { user } = useUserStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-stats", user?.id],
    queryFn: () => getUserStats(user?.id),
  });

  if (error) {
    return (
      <ErrorMessage
        message="Error fetching user stats"
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <UserStatsSkeleton />;
  }

  if (!data.userStats || data.userStats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center border rounded-lg bg-muted/30">
        <h3 className="text-lg font-medium mb-2">
          No statistics available yet
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload and process files to see your usage statistics and performance
          metrics
        </p>
      </div>
    );
  }

  const totalFiles = data.userStats.length;
  const totalProcessingTime =
    data.userStats.reduce(
      (acc: number, curr: { processingTime: number }) =>
        acc + curr.processingTime,
      0
    ) / data.userStats.length;
  const totalErrors = data.userStats.filter(
    (stat: { errorLog: string }) => stat.errorLog
  ).length;
  const successRate = ((totalFiles - totalErrors) / totalFiles) * 100 || 0;

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 col-span-1 md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              <Files className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFiles}</div>
              <p className="text-xs text-muted-foreground">Files processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {format(totalProcessingTime, "ss.SSS")}s
              </div>
              <p className="text-xs text-muted-foreground">Average per file</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">
                Files processed successfully
              </p>
            </CardContent>
          </Card>
        </div>
        <StatsChart chartData={data.chartData} />
      </div>
    </>
  );
}
