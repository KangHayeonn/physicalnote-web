import { NextPage } from "next";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import { useState } from "react";
import { cls } from "@/utils";
import { useRouter } from "next/router";
import DailyReport from "@/components/report/dailyReport";
import WeeklyReport from "@/components/report/weeklyReport";

const Report: NextPage = () => {
  const [reportType, setReportType] = useState<"days" | "weeks">("days");

  const onClickDays = () => setReportType("days");
  const onClickWeeks = () => setReportType("weeks");

  return (
    <Layout>
      <h1 className="text-[28px] font-[700]">리포트</h1>
      <Search />
      <div className="flex w-[260px] h-[47px] rounded-lg shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden font-[700]">
        <div
          onClick={onClickDays}
          className={cls(
            "w-1/2 flex items-center justify-center cursor-pointer",
            reportType === "days" ? "bg-[#C6E19B] text-white" : "text-[#8DBE3D]"
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
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        {reportType === "days" && <DailyReport />}
        {reportType === "weeks" && <WeeklyReport />}
      </div>
    </Layout>
  );
};

export default Report;
