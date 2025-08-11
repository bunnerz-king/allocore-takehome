import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const generatePageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show pages near the current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push("ellipsis-left");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-center space-x-2">
      <button
        className="px-3 cursor-pointer py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-3 py-1 cursor-pointer rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        )
      )}

      <button
        className="px-3 py-1 cursor-pointer rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}