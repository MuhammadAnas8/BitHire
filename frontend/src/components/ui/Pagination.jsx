import React from "react";
import "../../styles/Pagination.css";

const Pagination = ({ pagination, onPageChange }) => {
  if (pagination.pages <= 1) return null;

  const { page, pages, total } = pagination;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-page ${i === page ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Page {page} of {pages} • Total: {total} jobs
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          title="First Page"
        >
          First
        </button>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          title="Previous Page"
        >
          Previous
        </button>

        <div className="pagination-pages">{generatePageNumbers()}</div>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          title="Next Page"
        >
          Next
        </button>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(pages)}
          disabled={page === pages}
          title="Last Page"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;