import { useState } from "react";

const usePagination = (
  onPageChange: (page: number) => void,
  itemPerPage: number,
  totalItems: number
) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(totalItems / itemPerPage);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = [
    ...Array(totalItems).slice(indexOfFirstItem, indexOfLastItem),
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    handlePageChange,
  };
};

export default usePagination;
