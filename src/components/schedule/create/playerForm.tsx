import React, { useState, useMemo } from "react";
import { PlayerSimpleResponseType } from "@/types/schedule";
import usePagination from "@/utils/hooks/usePagination";
import Pagination from "@/components/common/pagination";
import Table from "@/components/common/table";

const PlayerForm = () => {
  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(1);
  const [data, setData] = useState<PlayerSimpleResponseType[]>([
    {
      id: 26,
      name: "김영건",
      phone: null,
      positions: ["공격수"],
      playerGrade: "1군",
    },
  ]);

  const itemPerPage = 10;
  const totalItems = totalLen;
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

  const columnData = [
    {
      Header: "선수이름",
      accessor: "name",
    },
    {
      Header: "전화번호",
      accessor: "phone",
    },
    {
      Header: "포지션",
      accessor: "position",
    },
    {
      Header: "소속",
      accessor: "playerGrade",
    },
  ];

  const columns = useMemo(() => columnData, []);

  return (
    <>
      {data.length !== 0 ? (
        <div className="w-full mt-20 bg-white py-4 my-4 px-4 rounded-[4px]">
          <Table columns={columns} data={data || []} />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={handlePageChange}
            setPage={setPage}
            next={next}
            prev={prev}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          선수 데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default PlayerForm;
