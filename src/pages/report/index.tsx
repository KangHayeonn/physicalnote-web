import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import { cls } from "@/utils";
import DailyReport from "@/components/report/dailyReport";
import WeeklyReport from "@/components/report/weeklyReport";
import { useRecoilValue } from "recoil";
import {
  searchPlayerGraderState,
  searchCategoryState,
  searchKeywordState,
} from "@/recoil/search/searchState";
import DatePickerComponent from "@/components/common/datepicker";
import Button from "@/components/common/button";
import Api from "@/api/report";
import {
  ReportRequestType,
  DailyReportResponseType,
  WeeklyReportResponseType,
  DailyReportDataType,
  WeeklyReportDataType,
  SearchFilterType,
} from "@/types/report";
import { getFullDateToString } from "@/utils/dateFormat";

const Report: NextPage = () => {
  const [reportType, setReportType] = useState<"days" | "weeks">("days");
  const [dailyData, setDailyData] = useState<DailyReportDataType[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyReportDataType[]>([]);
  const [totalLen, setTotalLen] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
    playerGrader: "ALL",
    category: "",
    keyword: "",
  });
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());

  const searchGrader = useRecoilValue(searchPlayerGraderState);
  const searchCategory = useRecoilValue(searchCategoryState);
  const searchKeyword = useRecoilValue(searchKeywordState);

  const onClickDays = () => setReportType("days");
  const onClickWeeks = () => setReportType("weeks");

  const getDailyReport = async (
    currentPage: number = 0,
    itemPerPage: number = 10
  ) => {
    const date = getFullDateToString(searchDate);
    const queryParams: ReportRequestType = {
      recordDate: date,
    };

    if (searchFilter.playerGrader !== "ALL") {
      queryParams.playerGrade = searchFilter.playerGrader;
    }

    if (searchFilter.category === "name") {
      queryParams.name = searchFilter.keyword;
    }
    if (searchFilter.category === "position") {
      queryParams.position = searchFilter.keyword;
    }

    await Api.v1GetDailyReport(queryParams, currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;
        const tempData: DailyReportDataType[] = [];

        content.map((item: DailyReportResponseType) => {
          tempData.push({
            id: item.userId,
            position: item.positions.join(" / "),
            ...item,
          });
        });

        setDailyData(tempData);
        setTotalLen(totalElements);
      }
    );
  };

  const getWeeklyReport = async (
    currentPage: number = 0,
    itemPerPage: number = 10
  ) => {
    const date = getFullDateToString(searchDate);
    const queryParams: ReportRequestType = {
      recordDate: date,
    };

    if (searchFilter.playerGrader !== "ALL") {
      queryParams.playerGrade = searchFilter.playerGrader;
    }

    if (searchFilter.category === "name") {
      queryParams.name = searchFilter.keyword;
    }
    if (searchFilter.category === "position") {
      queryParams.position = searchFilter.keyword;
    }

    await Api.v1GetWeeklyReport(queryParams, currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;
        const tempData: WeeklyReportDataType[] = [];

        content.map((item: WeeklyReportResponseType) => {
          tempData.push({
            id: item.userId,
            position: item.positions.join(" / "),
            ...item,
          });
        });

        setWeeklyData(tempData);
        setTotalLen(totalElements);
      }
    );
  };

  const toggleDate = (type: string) => {
    const today = new Date();

    if (type === "lastWeek") {
      const lastWeek = today.setDate(today.getDate() - 7);
      setInitDate(new Date(lastWeek));
    }

    if (type === "yesterday") {
      const yesterday = today.setDate(today.getDate() - 1);
      setInitDate(new Date(yesterday));
    }

    if (type === "today") {
      setInitDate(today);
    }
  };

  const getInitData = () => {
    reportType === "days" ? getDailyReport(0, 10) : getWeeklyReport(0, 10);
    setPage(0);
  };

  const init = () => {
    setInitDate(new Date());
  };

  useEffect(() => {
    setSearchFilter({
      playerGrader: searchGrader,
      category: searchCategory,
      keyword: searchKeyword,
    });
  }, [searchGrader, searchCategory, searchKeyword]);

  useEffect(() => {
    getInitData();
  }, [searchDate]);

  return (
    <div className="min-w-[1850px]">
      <Layout>
        <h1 className="text-[28px] font-[700]">리포트</h1>
        <Search onClickSubmit={getInitData} />
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            text="지난주"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("lastWeek")}
          />
          <Button
            type="button"
            text="어제"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("yesterday")}
          />
          <Button
            type="button"
            text="오늘"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("today")}
          />
          <DatePickerComponent
            calendarType="date"
            initDate={initDate}
            changeDate={setSearchDate}
          />
          <Button
            type="button"
            text="초기화"
            classnames="h-[36px] px-4 text-[#000] text-[13px] font-[700]"
            onClick={init}
          />
        </div>
        <div className="flex w-[260px] h-[47px] rounded-lg shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden font-[700]">
          <div
            onClick={onClickDays}
            className={cls(
              "w-1/2 flex items-center justify-center cursor-pointer",
              reportType === "days"
                ? "bg-[#C6E19B] text-white"
                : "text-[#8DBE3D]"
            )}
          >
            일간
          </div>
          <div
            onClick={onClickWeeks}
            className={cls(
              "w-1/2 flex items-center justify-center cursor-pointer",
              reportType === "weeks"
                ? "bg-[#C6E19B] text-white"
                : "text-[#8DBE3D]"
            )}
          >
            주간
          </div>
        </div>
        <div className="bg-white py-4 my-4 rounded-[4px]">
          {reportType === "days" && (
            <DailyReport
              initPage={page}
              dailyData={dailyData}
              totalLen={totalLen}
              getDailyEvent={getDailyReport}
            />
          )}
          {reportType === "weeks" && (
            <WeeklyReport
              initPage={page}
              weeklyData={weeklyData}
              searchDate={searchDate}
              totalLen={totalLen}
              getWeeklyEvent={getWeeklyReport}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Report;
