export function FilesTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="h-12 bg-muted flex items-center px-4 border-b">
        <div className="h-4 w-3/4 md:w-1/2 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
      </div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors">
              <th className="h-12 px-4 text-left align-middle font-medium w-1/4">
                <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium w-1/4">
                <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium w-1/4">
                <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium w-1/4">
                <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <tr key={index} className="border-b transition-colors">
                <td className="p-4 align-middle">
                  <div className="flex flex-col">
                    <div className="h-5 w-32 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="h-5 w-24 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
                </td>
                <td className="p-4 align-middle">
                  <div className="h-5 w-16 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
