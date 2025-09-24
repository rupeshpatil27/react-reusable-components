const Pagination = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > visiblePages + 2) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - visiblePages);
      const endPage = Math.min(totalPages - 1, currentPage + visiblePages);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (visiblePages + 1)) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber !== currentPage &&
      pageNumber > 0 &&
      pageNumber <= totalPages
    ) {
      onPageChange(pageNumber);
    }
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex items-center space-x-2 px-2">
      <div className="text-sm">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="p-2 w-9 h-9 text-sm inline-flex items-center justify-center rounded-lg hover:bg-[rgba(132,139,200,0.18)] disabled:opacity-50 cursor-pointer"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="left"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-sm font-bold text-[rgba(132,139,200,0.18)]">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`p-2 w-9 h-9 text-sm inline-flex items-center justify-center rounded-lg cursor-pointer ${
                page === currentPage
                  ? "border border-blue-500 text-blue-500"
                  : "text-black hover:bg-[rgba(132,139,200,0.18)]"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          className="p-2 w-9 h-9 text-sm inline-flex items-center justify-center rounded-lg hover:bg-[rgba(132,139,200,0.18)] disabled:opacity-50 cursor-pointer"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center">
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-[rgba(132,139,200,0.18)] rounded-lg px-2 py-1 text-sm"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={15}>15 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
