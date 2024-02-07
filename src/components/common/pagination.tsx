import React, { useEffect } from "react";
import { cls } from "../../libs/commons/utils";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  prev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
  setPage,
  next,
  prev,
}) => {
  const handlePageChange = (page: number) => {
    if (setPage) {
      setPage(page);
    }
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 7;

    if (totalPage <= visiblePages) {
      for (let i = 0; i < totalPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={cls(
              "cursor-pointer mx-2",
              currentPage === i ? "font-bold" : "text-black"
            )}
          >
            {i + 1}
          </span>
        );
      }
    } else {
      // 페이지가 많을 경우 일부만 보여주고 나머지는 '...'으로 표시합니다.
      const startPage = Math.max(currentPage - 1, 0);
      const endPage = Math.min(currentPage + 1, totalPage - 1);
      const lastVisiblePage = Math.min(endPage, totalPage - 1);

      if (currentPage > 1) {
        pageNumbers.push(
          <span
            key={0}
            onClick={() => handlePageChange(0)}
            className={cls(
              "cursor-pointer mx-2",
              currentPage === 0 ? "font-bold" : "text-black"
            )}
          >
            1
          </span>
        );
      }

      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="mx-2">
            ...
          </span>
        );
      }

      for (let i = startPage; i <= lastVisiblePage; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={cls(
              "cursor-pointer mx-2",
              currentPage === i ? "font-bold" : "text-black"
            )}
          >
            {i + 1}
          </span>
        );
      }

      if (endPage < totalPage - 2) {
        pageNumbers.push(
          <span key="ellipsis" className="mx-2">
            ...
          </span>
        );
      }

      // 마지막 페이지 추가
      if (currentPage < totalPage - 2) {
        pageNumbers.push(
          <span
            key={totalPage - 1}
            onClick={() => handlePageChange(totalPage - 1)}
            className={cls("cursor-pointer mx-2")}
          >
            {totalPage}
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center my-2">
      <span onClick={prev} className="cursor-pointer">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3800_103027)">
            <path
              d="M11.5 18V6L3 12L11.5 18ZM12 12L20.5 18V6L12 12Z"
              fill="#7E8083"
            />
          </g>
          <defs>
            <clipPath id="clip0_3800_103027">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
      <span>{renderPageNumbers()}</span>
      <span onClick={next} className="cursor-pointer">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3800_103034)">
            <path
              d="M4.5 18L13 12L4.5 6V18ZM13.5 6V18L22 12L13.5 6Z"
              fill="#7E8083"
            />
          </g>
          <defs>
            <clipPath id="clip0_3800_103034">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>
  );
};

export default Pagination;
