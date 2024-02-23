import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Layout from "@/components/layout";
import CalendarComponents from "@/components/common/calendar";
import Button from "@/components/common/button";
import DropDown from "@/components/common/dropdown";
import { useSetRecoilState } from "recoil";
import { searchPlayerGraderState } from "@/recoil/search/searchState";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import ImportantScheduleItem from "@/components/schedule/importantScheduleItem";
import DailyScheduleItem from "@/components/schedule/dailyScheduleItem";
import {
  DailyScheduleResponseType,
  ImportantScheduleResponseType,
} from "@/types/schedule";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";

const ManageSchedule: NextPage = () => {
  const setSearchGrader = useSetRecoilState(searchPlayerGraderState);
  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };
  const [importantSchedule, setImportantSchedule] = useState<
    ImportantScheduleResponseType[]
  >([]);
  const [dailySchedule, setDailySchedule] = useState<
    DailyScheduleResponseType[]
  >([]);

  const [totalLength, setTotalLength] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // pagination
  const itemPerPage = 6;
  const totalItems = totalLength;
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

  const events = [
    { title: "Meeting1", start: new Date("2023-12-29"), type: "important" },
    { title: "Meeting2", start: new Date("2023-12-30"), type: "important" },
  ];

  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">일정관리</h1>
          <DropDown
            dropDownList={searchCategoryList}
            changeText={onSearchGraderChange}
          />
        </div>
        <div className="h-full flex mt-10 space-x-10">
          <div className="h-full flex flex-col space-y-2">
            <h2 className="text-[20px] font-[700]">일정 기록하기</h2>
            <div className="flex flex-col h-[370px]">
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
                {importantSchedule.length !== 0 ? (
                  <div className="h-full flex flex-col justify-start items-center space-y-4 mt-3">
                    <ImportantScheduleItem />
                    <Pagination
                      currentPage={currentPage}
                      totalPage={totalPages}
                      onPageChange={handlePageChange}
                      next={next}
                      prev={prev}
                    />
                    <Link href="/schedule/create">
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
            <div className="min-w-[482px] h-[700px]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span>
                    <Image
                      src="/icons/rectangle_small.svg"
                      width={8}
                      height={8}
                      alt="title icon"
                    />
                  </span>
                  <span>오늘 일정</span>
                </div>
                <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[133px] h-[25px] flex justify-center items-center space-x-2">
                  <span className="text-[12px] text-[#8DBE3D] font-[400]">
                    일정 알림 보내기
                  </span>
                  <span>
                    <Image
                      src="/images/alert.svg"
                      width={17}
                      height={17}
                      alt="alert icon"
                    />
                  </span>
                </button>
              </div>
              <div className="h-full space-y-4">
                {dailySchedule.length !== 0 ? (
                  <div className="h-full flex flex-col justify-start items-center space-y-4 mt-3">
                    <DailyScheduleItem />
                    <Pagination
                      currentPage={currentPage}
                      totalPage={totalPages}
                      onPageChange={handlePageChange}
                      next={next}
                      prev={prev}
                    />
                    <Link href="/schedule/create">
                      <Button
                        text="기록하기"
                        type="button"
                        classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center space-y-4">
                    <p className="text-[15px]">오늘 일정이 없습니다.</p>
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
          </div>
          <div className="w-3/4">
            <CalendarComponents events={events} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManageSchedule;
