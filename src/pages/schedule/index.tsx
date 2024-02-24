import { NextPage } from "next";
import React from "react";
import Layout from "@/components/layout";
import CalendarComponents from "@/components/common/calendar";
import DropDown from "@/components/common/dropdown";
import { useSetRecoilState } from "recoil";
import { searchPlayerGraderState } from "@/recoil/search/searchState";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import ImportantSchedule from "@/components/schedule/importantSchedule";
import DailySchedule from "@/components/schedule/dailySchedule";

const ManageSchedule: NextPage = () => {
  const setSearchGrader = useSetRecoilState(searchPlayerGraderState);
  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };

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
            <ImportantSchedule />
            <DailySchedule />
          </div>
          <div className="w-3/4">
            <CalendarComponents />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManageSchedule;
