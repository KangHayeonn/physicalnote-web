import React, { useEffect, useState } from "react";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { DailyReportDataType, DailyReportType } from "@/types/report";
import Api from "@/api/privateData";
import { showToast } from "@/utils";
import { dailyColumnData } from "@/constants/mock/report";

const DailyReport = ({
  initPage,
  dailyData,
  totalLen,
  getDailyEvent,
}: DailyReportType) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<DailyReportDataType[]>(dailyData);
  const [totalLength, setTotalLength] = useState<number>(totalLen);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // pagination
  const itemPerPage = 10;
  const totalItems = totalLength;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
    getDailyEvent(currentPage, itemPerPage);
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
    getDailyEvent(currentPage, itemPerPage);
  };

  // 중요 선수 등록/삭제 (즐겨찾기)
  const handleImportantCheck = async (
    id: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, importantYn: !item.importantYn };
        }

        return item;
      })
    );

    await Api.v1UpdateImportantPlayer(id).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        if (data.importantYn) {
          showToast("즐겨찾기로 등록되었습니다.");
        } else {
          showToast("즐겨찾기가 해제되었습니다.");
        }
      }
    });
  };

  useEffect(() => {
    getDailyEvent(currentPage, itemPerPage);
  }, [page]);

  useEffect(() => {
    setData(dailyData);
    setTotalLength(totalLen);
  }, [dailyData, totalLen]);

  useEffect(() => {
    handlePageChange(0);
  }, [initPage]);

  return (
    <>
      {data.length !== 0 ? (
        <>
          <Table
            columns={dailyColumnData}
            data={data || []}
            isSelectedCheckbox={isChecked}
            onSelect={handleImportantCheck}
          />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={handlePageChange}
            setPage={setPage}
            next={next}
            prev={prev}
          />
        </>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default DailyReport;
