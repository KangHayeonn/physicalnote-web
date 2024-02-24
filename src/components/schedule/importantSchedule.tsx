import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { recordDateSelector } from "@/recoil/schedule/scheduleState";
import { searchPlayerGraderSelector } from "@/recoil/search/searchState";
import Api from "@/api/schedule";
import { ImportantScheduleResponseType } from "@/types/schedule";
import { getDateToString } from "@/utils/dateFormat";
import ImportantScheduleItem from "./importantScheduleItem";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import Button from "@/components/common/button";

const ImportantSchedule = () => {
  const recordDate = useRecoilValue<Date>(recordDateSelector);
  const searchGrader = useRecoilValue<string>(searchPlayerGraderSelector);
  const [events, setEvents] = useState<ImportantScheduleResponseType[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // pagination
  const itemPerPage = 2;
  const totalItems = totalLength;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
    //getImportantSchedule();
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
    //getImportantSchedule();
  };

  const getImportantSchedule = async () => {
    const getGrader = () => {
      return searchGrader !== "ALL" ? searchGrader : "";
    };

    await Api.v1GetImportantSchedule(
      getGrader(),
      getDateToString(recordDate),
      currentPage,
      itemPerPage
    ).then((res) => {
      const { content, totalElements } = res.data;
      setEvents([...content]);
      setTotalLength(totalElements);
    });
  };

  useEffect(() => {
    getImportantSchedule();
  }, [page]);

  useEffect(() => {
    if (currentPage !== 0) {
      handlePageChange(0);
    } else {
      getImportantSchedule();
    }
  }, [recordDate, searchGrader]);

  return (
    <div className="flex flex-col h-[390px]">
      <div className="flex items-center space-x-2">
        <span>
          <Image
            src="/icons/rectangle_small.svg"
            width={8}
            height={8}
            alt="title icon"
          />
        </span>
        <span>월간 주요 일정</span>
      </div>
      <div className="min-w-[482px] h-full space-y-4">
        {events.length !== 0 ? (
          <div className="h-full flex flex-col justify-start items-center space-y-4 mt-3">
            {events.map((event, idx) => (
              <ImportantScheduleItem
                key={`scheduleItem${idx}`}
                id={event.id}
                name={event.name}
                address={event.address}
                recordDate={event.recordDate}
                workoutTime={event.workoutTime}
              />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePageChange}
              setPage={setPage}
              next={next}
              prev={prev}
            />
            <Link href={`/schedule/create`}>
              <Button
                text="기록하기"
                type="button"
                classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
              />
            </Link>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center space-y-4">
            <p className="text-[15px]">월간 주요 일정이 없습니다.</p>
            <Link href="/schedule/create">
              <Button
                text="기록하기"
                type="button"
                classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantSchedule;
