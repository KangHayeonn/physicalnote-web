import React from "react";
import { AxisConfig, BarChart } from "@mui/x-charts";

type ExtendedAxisConfig = AxisConfig & { categoryGapRatio?: number };

const HooperIndexInfo = () => {
  return (
    <div className="w-full min-w-[500px] flex flex-col rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="text-[20px] font-[700]">후퍼인덱스</div>
      <div>
        <BarChart
          height={300}
          series={[
            {
              data: [20, 40, 30, 40],
              type: "bar",
              color: "#C6E19B",
            },
          ]}
          yAxis={
            [
              {
                scaleType: "band",
                data: ["수면의 질", "스트레스", "피로", "근육통"],
                categoryGapRatio: 0.8,
                position: "top",
              },
            ] as ExtendedAxisConfig[]
          }
          /*xAxis={[
                      {
                        scaleType: "band",
                        data: ["좋음", "적정", "관리요망", "위험"],
                        position: "bottom",
                      },
                    ]}*/
          layout="horizontal"
          margin={{ left: 80, right: 60 }}
        />
      </div>
    </div>
  );
};

export default HooperIndexInfo;
