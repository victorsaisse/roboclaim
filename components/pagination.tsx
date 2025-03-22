"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryState } from "nuqs";

export function PaginationComponent({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => parseInt(value),
  });

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  // Create array of visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at once

    if (totalPages <= maxVisiblePages) {
      // If we have fewer pages than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Adjust if we're near the start or end
      if (page <= 3) {
        endPage = 4;
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pages.push(-1); // Use -1 to represent ellipsis
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pages.push(-2); // Use -2 to represent ellipsis (different key)
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isPrevDisabled) handlePageChange(page - 1);
            }}
            className={isPrevDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum < 0 ? `ellipsis-${pageNum}` : pageNum}>
            {pageNum < 0 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={pageNum === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) handlePageChange(page + 1);
            }}
            className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
