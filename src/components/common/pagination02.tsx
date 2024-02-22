import React, { useState, useEffect } from "react";
import Button from "@/components/common/button";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  next: () => void;
  prev: () => void;
}

const Pagination2: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  next,
  prev,
}) => {
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setPage(currentPage);
    setTotal(totalPage);
  }, [currentPage, totalPage]);

  return (
    <div className="flex items-center justify-center space-x-2">
      {page === 0 ? (
        <Button
          type="button"
          text="이전"
          classnames="text-[#B9B9C3] text-[13px] font-[700] disabled:hover:bg-[#fff] disabled:hover:text-[#B9B9C3] disabled:hover:cursor-default"
          onClick={prev}
          disabled
        />
      ) : (
        <Button
          type="button"
          text="이전"
          classnames="text-[#8DBE3D] text-[13px] font-[700]"
          onClick={prev}
        />
      )}
      {page === total - 1 || total === 0 ? (
        <Button
          type="button"
          text="다음"
          classnames="text-[#B9B9C3] text-[13px] font-[700] disabled:hover:bg-[#fff] disabled:hover:text-[#B9B9C3] disabled:hover:cursor-default"
          onClick={next}
          disabled
        />
      ) : (
        <Button
          type="button"
          text="다음"
          classnames="text-[#8DBE3D] text-[13px] font-[700]"
          onClick={next}
        />
      )}
    </div>
  );
};

export default Pagination2;
