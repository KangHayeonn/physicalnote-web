import React, { useState, useEffect } from "react";
import { AxisConfig, BarChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";

type ExtendedAxisConfig = AxisConfig & { categoryGapRatio?: number };

const HooperIndexInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [data, setData] = useState<Array<number>>([]);

  const tempData = [
    { name: "수면의 질", value: 10 },
    { name: "스트레스", value: 40 },
    { name: "피로", value: 30 },
    { name: "근육통", value: 20 },
  ];

  const xAxisData = [
    { korean: "좋음", value: 1 },
    { korean: "적정", value: 2 },
    { korean: "관리요망", value: 3 },
    { korean: "위험", value: 4 },
  ];

  useEffect(() => {
    // setData()
  }, [playerDetail]);

  return (
    <div className="w-full min-w-[500px] flex flex-col rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="text-[20px] font-[700]">후퍼인덱스</div>
      <div>
        <BarChart
          height={300}
          series={[
            {
              data: [10, 20, 30, 40],
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
              data: ["적정", "충분", "부족", "과잉"],
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
