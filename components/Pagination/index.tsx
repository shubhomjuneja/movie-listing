// Pagination.tsx
import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const shouldRenderPrevPaginationButton =
    totalItems > itemsPerPage && currentPage !== 1;
  const shouldRenderNextPaginationButton =
    totalItems > itemsPerPage && currentPage !== totalPages;

  return (
    <div className="w-full flex justify-center mt-4">
      {shouldRenderPrevPaginationButton && (
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="text-white font-[700]"
        >
          Prev
        </button>
      )}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-2 px-3 py-1 rounded ${
            currentPage === index + 1
              ? "bg-primary text-white font-[700]"
              : "bg-card text-white font-[700]"
          }`}
        >
          {index + 1}
        </button>
      ))}
      {shouldRenderNextPaginationButton && (
        <button
          onClick={handleNextClick}
          className="text-white font-[700]"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
