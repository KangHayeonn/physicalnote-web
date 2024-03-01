import React, { useState } from "react";
import { cls } from "@/utils";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { yAxisIds } from "@/constants/mock/dashboard";

const WeeklyAvgInfo = () => {
  const [reportType, setReportType] = useState<"days" | "weeks">("days");
  const [graphType, setGrapeType] = useState<"hooper" | "intensity" | "time">(
    "hooper"
  );

  const onClickDays = () => setReportType("days");
  const onClickWeeks = () => setReportType("weeks");

  return (
    <div className="w-full min-w-[650px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full text-[20px] font-[700] space-x-1 space-y-2">
        <div className="w-full flex justify-between">
          <div className="flex space-x-8">
            <div
              className={cls(
                "cursor-pointer",
                graphType === "hooper" ? "text-[#000]" : "text-[#C1C1C1]"
              )}
            >
              후퍼인덱스
            </div>
            <div
              className={cls(
                "cursor-pointer",
                graphType === "intensity" ? "text-[#000]" : "text-[#C1C1C1]"
              )}
            >
              운동강도
            </div>
            <div
              className={cls(
                "cursor-pointer",
                graphType === "time" ? "text-[#000]" : "text-[#C1C1C1]"
              )}
            >
              운동시간
            </div>
          </div>
          <div className="flex w-[184px] h-[33px] rounded-lg shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden font-[700] text-[16px] mt-[10px]">
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
        </div>
        <div className="flex space-x-8 text-[12px]">
          <div className="text-[#000] cursor-pointer">수면의 질</div>
          <div className="text-[#B9B9C3] cursor-pointer">스트레스</div>
          <div className="text-[#B9B9C3] cursor-pointer">피로</div>
          <div className="text-[#B9B9C3] cursor-pointer">근육통</div>
        </div>
        <div>
          <AxisWithComposition
            xAxisData={["일", "월", "화", "수", "목", "금", "토"]}
            seriesData={[
              {
                type: "bar",
                yAxisKey: "loadValue",
                data: [10, 20, 30],
                color: "#C6E19B",
              },
              {
                type: "line",
                curve: "linear",
                yAxisKey: "totalCount",
                data: [1, 2, 3],
                color: "#FF9F43",
              },
            ]}
            yAxisIds={yAxisIds}
            height={300}
            margin={{ left: 40, right: 60 }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyAvgInfo;
