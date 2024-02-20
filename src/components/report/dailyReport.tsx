import React, { useState, useMemo } from "react";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";

const DailyReport = () => {
  const [page, setPage] = useState(0);

  const data = [
    {
      name: "dh",
      age: 23,
      tel: "010-1234-1234",
      height: 180,
      weight: 72,
      position: "미드필더",
      belongto: "1군",
    },
    {
      name: "mike",
      age: 23,
      tel: "010-1234-1234",
      height: 180,
      weight: 72,
      position: "미드필더",
      belongto: "1군",
    },
  ];

  // 열 항목
  let columnData = [
    {
      Header: "선수이름",
      accessor: "name",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "체지방(%)",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "몸무게",
      accessor: "weight",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "%(전날대비차이)",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "소변검사",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "잠",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "스트레스",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "피로도",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "근육통",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "후퍼인댁스",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
  ];

  // pagination
  const itemPerPage = 10;
  const totalItems = data?.length;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleRowClick =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      console.log(id);
    };

  const columns = useMemo(() => columnData, []);

  return (
    <>
      <Table columns={columns} data={data || []} onClickRow={handleRowClick} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onPageChange={handlePageChange}
        setPage={setPage}
        next={next}
        prev={prev}
      />
    </>
  );
};

export default DailyReport;
