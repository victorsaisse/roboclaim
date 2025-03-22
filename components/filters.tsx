"use client";

import { Filter, Search, SortAsc, SortDesc } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

export function Filters() {
  const [fileName, setFileName] = useQueryState("fileName", {
    defaultValue: "",
  });
  const [fileType, setFileType] = useQueryState("fileType", {
    defaultValue: "",
  });
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "asc",
  });

  const [searchInput, setSearchInput] = useState(fileName);

  const fileTypes = [
    { value: "pdf", label: "PDF" },
    { value: "image", label: "Images" },
    { value: "sheet", label: "Spreadsheets" },
  ];

  const statusOptions = [
    { value: "", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "processing", label: "Processing" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
    { value: "processingTime", label: "Processing Time" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileName(searchInput);
  };

  const toggleFileType = (type: string) => {
    if (fileType === type) {
      setFileType("");
    } else {
      setFileType(type);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="w-full sm:w-auto sm:flex-1 min-w-[200px]">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full px-4 py-2 border rounded-md pl-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <button type="submit" className="sr-only">
              Search
            </button>
          </form>
        </div>

        {/* File type filter */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <Filter className="text-gray-400 h-4 w-4" />
            <span className="text-sm font-medium">Type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => toggleFileType(type.value)}
                className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
                  fileType === type.value
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm font-medium">Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-md px-2 py-1.5 text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort options */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1.5 text-sm min-w-[100px]"
          >
            <option value="">Default</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={toggleSortOrder}
            className="px-2 py-1.5 rounded-md hover:bg-gray-100 flex-shrink-0 cursor-pointer flex items-center gap-1 text-black font-medium border border-gray-300"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-5 w-5 text-black" />
            ) : (
              <SortDesc className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
