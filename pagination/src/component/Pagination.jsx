import { useState, useRef, useEffect } from "react";

const CustomSelectDropdown = ({
  pageSize,
  handlePageSizeChange,
  customOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const defaultOptions = [
    { label: "10 / page", value: 10 },
    { label: "20 / page", value: 20 },
    { label: "50 / page", value: 50 },
    { label: "100 / page", value: 100 },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options =
    Array.isArray(customOptions) && customOptions.length > 0
      ? customOptions.map((val) => ({
          label: `${val} / page`,
          value: Number(val),
        }))
      : defaultOptions;

  const selectedOption = options.find((o) => o.value === pageSize);

  const handleSelect = (value) => {
    handlePageSizeChange({ target: { value } });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-30" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          } else if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        className="w-full inline-flex items-center justify-between border border-[rgba(132,139,200,0.18)] rounded-lg px-3 py-1.5 text-sm font-normal text-black hover:border-blue-500 transition-all"
      >
        {selectedOption?.label || "Select"}
        <span className="float-right">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="down"
            width="1em"
            height="1em"
            fill="currentColor"
            className={`text-[#757575] transition-all duration-200 ${
              isOpen ? " rotate-180" : " rotate-0"
            }`}
            aria-hidden="true"
          >
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
          </svg>
        </span>
      </button>

      <div
        className={`absolute z-10 mt-1 w-full bg-white rounded-lg [box-shadow:2px_3px_5px_-1px_rgba(0,0,0,0.5)]
 transition-all duration-200 overflow-hidden ${
   isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
 }`}
      >
        <ul className="p-1 text-sm text-black">
          {options.map((option) => (
            <li
              key={option.value}
              aria-selected={pageSize === option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer rounded-md px-4 py-2 ${
                pageSize === option.value
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-[#f6f6f6]"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pagination = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showSizeChanger = false,
  showTotal = false,
  position = "right",
  pageSizeOptions,
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

  const alignmentClass =
    {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[position] || "justify-end";

  if (totalPages === 0) return null;

  return (
    <div
      className={`flex w-full flex-col md:flex-row items-center gap-2 text-sm ${alignmentClass}`}
    >
      {showTotal && (
        <div className="">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
        </div>
      )}

      <div className="flex items-center space-x-1 md:space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="p-2 w-9 h-9 inline-flex items-center justify-center rounded-lg hover:not-disabled:bg-[#f6f6f6] disabled:text-[#757575] cursor-pointer disabled:cursor-no-drop"
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
            <span
              key={`ellipsis-${idx}`}
              className="px-2 font-bold text-[#858585]"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`p-2 w-9 h-9 inline-flex items-center justify-center rounded-lg cursor-pointer ${
                page === currentPage
                  ? "border border-blue-500 text-blue-500"
                  : "text-black hover:bg-[#f6f6f6]"
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
          className="p-2 w-9 h-9 inline-flex items-center justify-center rounded-lg hover:not-disabled:bg-[#f6f6f6] disabled:text-[#757575] cursor-pointer disabled:cursor-no-drop"
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
        {showSizeChanger && (
          <CustomSelectDropdown
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
            customOptions={pageSizeOptions}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
