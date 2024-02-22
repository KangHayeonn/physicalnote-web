import React, { useEffect } from "react";
import Image from "next/image";
import { cls } from "@/utils";

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
        <Image
          src="/images/arrow_left.svg"
          width={0}
          height={0}
          alt="Pagination Left Button"
          style={{ width: "7px", height: "auto" }}
        />
      </span>
      <span>{renderPageNumbers()}</span>
      <span onClick={next} className="cursor-pointer">
        <Image
          src="/images/arrow_right.svg"
          width={0}
          height={0}
          alt="Pagination Right Button"
          style={{ width: "7px", height: "auto" }}
        />
      </span>
    </div>
  );
};

export default Pagination;
