import React from "react";
import { LineChart } from "@mui/x-charts";

const WeeklyWorkLoad = () => {
  return (
    <div className="flex flex-col col-span-5">
      <div className="text-[15px] font-[400] space-x-2">
        <span>■ 주간 트레이닝 부하</span>
        <em className="text-[12px] text-[#CBCCCD] font-[400] not-italic">
          (RPE X 운동시간 값)
        </em>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-[12px] font-[400] mr-4">
          [ 2023년 10월 2주차 ]
        </span>
        <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
          <LineChart
            height={260}
            xAxis={[
              {
                scaleType: "point",
                data: [
                  "월(1일)",
                  "화(2일)",
                  "수(3일)",
                  "목(4일)",
                  "금(5일)",
                  "토(6일)",
                  "일(7일)",
                ],
              },
            ]}
            series={[
              {
                type: "line",
                curve: "linear",
                data: [125, 100, 150, 175, 125, 75, 0],
                color: "#8DBE3D",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkLoad;
