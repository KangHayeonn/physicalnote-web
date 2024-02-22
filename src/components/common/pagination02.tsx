import React from "react";
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
  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage === 0 ? (
        <Button
          type="button"
          text="이전"
          classnames="text-[#B9B9C3] text-[13px] font-[700]"
          onClick={prev}
        />
      ) : (
        <Button
          type="button"
          text="이전"
          classnames="text-[#8DBE3D] text-[13px] font-[700]"
          onClick={prev}
        />
      )}
      {currentPage === totalPage - 1 ? (
        <Button
          type="button"
          text="다음"
          classnames="text-[#B9B9C3] text-[13px] font-[700]"
          onClick={next}
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
