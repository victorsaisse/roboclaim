import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UserStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-5 w-24 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-4 w-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-gray-200 rounded dark:bg-gray-700 mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 rounded dark:bg-gray-700"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
