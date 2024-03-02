import React, { useState, useEffect } from "react";
import { AxisConfig, BarChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";

type ExtendedAxisConfig = AxisConfig & { categoryGapRatio?: number };

const HooperIndexInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [data, setData] = useState<Array<number>>([]);

  const LevelMap: Record<string, number> = {
    "좋음(1단계)": 10, // #6E4CA0
    "좋음(2단계)": 20, // #4D73BA
    "적정(1단계)": 30, // #40B049
    "적정(2단계)": 40, // #F0EA0D
    "관리요망(1단계)": 50, // #FFC808
    "관리요망(2단계)": 60, // #F27C21
    위험: 70, // #E82E25
  };

  const LevelColorMap: Record<string, string> = {
    "좋음(1단계)": "#6E4CA0",
    "좋음(2단계)": "#4D73BA",
    "적정(1단계)": "#40B049",
    "적정(2단계)": "#F0EA0D",
    "관리요망(1단계)": "#FFC808",
    "관리요망(2단계)": "#F27C21",
    위험: "#E82E25",
  };

  const getLevelToNum = (level: string) => {
    return LevelMap[level] || 0;
  };

  const getLevelToColor = (level: string) => {
    return LevelColorMap[level] || "#40B049";
  };

  useEffect(() => {
    const { sleep, stress, fatigue, muscleSoreness } =
      playerDetail?.hooperIndexInfo;

    const element1 = document.querySelector(
      ".MuiBarElement-root:first-child"
    ) as HTMLElement;
    if (element1) {
      element1.style.fill = getLevelToColor(sleep);
    }

    const element2 = document.querySelector(
      ".MuiBarElement-root:nth-child(2)"
    ) as HTMLElement;
    if (element2) {
      element2.style.fill = getLevelToColor(stress);
    }

    const element3 = document.querySelector(
      ".MuiBarElement-root:nth-child(3)"
    ) as HTMLElement;
    if (element3) {
      element3.style.fill = getLevelToColor(fatigue);
    }

    const element4 = document.querySelector(
      ".MuiBarElement-root:nth-child(4)"
    ) as HTMLElement;
    if (element4) {
      element4.style.fill = getLevelToColor(muscleSoreness);
    }

    const arr = [
      getLevelToNum(sleep),
      getLevelToNum(stress),
      getLevelToNum(fatigue),
      getLevelToNum(muscleSoreness),
    ];

    setData(arr);
  }, [playerDetail]);

  return (
    <div className="w-full min-w-[750px] flex flex-col rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="text-[20px] font-[700]">후퍼인덱스</div>
      <div className="w-[700px] relative">
        {data.length !== 0 && (
          <BarChart
            height={300}
            series={[
              {
                data: data,
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
                  hideTooltip: true,
                },
              ] as ExtendedAxisConfig[]
            }
            xAxis={[
              {
                data: [10, 20, 30, 40, 50, 60, 70],
                position: "bottom",
                hideTooltip: true,
              },
            ]}
            layout="horizontal"
            margin={{ left: 65, right: 60 }}
            axisHighlight={{
              x: "none",
              y: "none",
            }}
          />
        )}
        <div className="w-[650px] absolute bottom-[13px] bg-[#fff] flex text-[12px] ml-[55px] space-x-6">
          <div className="w-[68px] ml-[60px]">좋음(1단계)</div>
          <div className="w-[68px]">좋음(2단계)</div>
          <div className="w-[68px]">적정(1단계)</div>
          <div className="w-[68px]">적정(2단계)</div>
          <div className="w-[60px]">관리요망 (1단계)</div>
          <div className="w-[60px]">관리요망 (2단계)</div>
          <div className="w-[68px]">위험</div>
        </div>
      </div>
    </div>
  );
};

export default HooperIndexInfo;
