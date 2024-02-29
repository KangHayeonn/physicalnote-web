import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import Button from "@/components/common/button";
import Pagination from "@/components/common/pagination";
import DailyScheduleItem from "@/components/schedule/dailyScheduleItem";
import usePagination from "@/utils/hooks/usePagination";
import Api from "@/api/schedule";
import { getFullDateToString } from "@/utils/dateFormat";
import { searchPlayerGraderSelector } from "@/recoil/search/searchState";
import {
  DailyScheduleResponseType,
  UserSimpleInfoType,
} from "@/types/schedule";
import { dailyDateSelector } from "@/recoil/schedule/scheduleState";

const DailySchedule = () => {
  const dailyDate = useRecoilValue<Date>(dailyDateSelector);
  const searchGrader = useRecoilValue<string>(searchPlayerGraderSelector);
  const [events, setEvents] = useState<DailyScheduleResponseType[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [playerGrader, setPlayerGrader] = useState<string>("");

  // pagination
  const itemPerPage = 2;
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

  const getPlayer = (playerInfo: UserSimpleInfoType[]) => {
    const playerList = playerInfo.map((item: UserSimpleInfoType) => item.name);
    return playerList.join(" / ");
  };

  const getDailySchedule = async () => {
    const getGrader = () => {
      return playerGrader !== "ALL" ? playerGrader : "";
    };

    await Api.v1GetScheduleDaily(
      getGrader(),
      getFullDateToString(dailyDate),
      currentPage,
      itemPerPage
    ).then((res) => {
      const { content, totalElements } = res.data;
      setEvents([...content]);
      setTotalLength(totalElements);
    });
  };

  useEffect(() => {
    getDailySchedule();
  }, [page]);

  useEffect(() => {
    if (currentPage !== 0) {
      handlePageChange(0);
    } else {
      getDailySchedule();
    }
  }, [dailyDate, playerGrader]);

  useEffect(() => {
    setPlayerGrader(searchGrader);
  }, [searchGrader]);

  return (
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
        {events.length !== 0 ? (
          <div className="h-full flex flex-col justify-start items-center space-y-2.5 mt-3">
            {events.map((event, idx) => (
              <DailyScheduleItem
                key={`dailyItem${idx}`}
                id={event.id}
                name={event.name}
                categoryName={event.categoryName}
                categoryColorCode={event.categoryColorCode}
                address={event.address}
                workoutTime={event.workoutTime}
                player={getPlayer(event.userSimpleInfo)}
                content={event.content}
                images={event.images}
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
  );
};

export default DailySchedule;
