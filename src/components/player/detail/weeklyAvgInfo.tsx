import React, { useState, useEffect } from "react";
import { cls } from "@/utils";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { yAxisIds } from "@/constants/mock/dashboard";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import {
  HooperIndexGraphType,
  IntensityGraphType,
  WorkoutTimeGraphType,
  HooperGraphType,
} from "@/types/player";
import { getDateToNum } from "@/utils/dateFormat";

const WeeklyAvgInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [reportType, setReportType] = useState<"days" | "weeks">("days");
  const [graphType, setGraphType] = useState<"hooper" | "intensity" | "time">(
    "hooper"
  );
  const [hooperType, setHooperType] = useState<
    "sleep" | "stress" | "fatigue" | "muscle"
  >("sleep");
  const [hooperGraph, setHooperGraph] = useState<HooperGraphType>();
  const [timeSportsValue, setTimeSportsValue] = useState<Array<number>>([]);
  const [timePhysicalValue, setTimePhysicalValue] = useState<Array<number>>([]);
  const [timeGraphXValue, setTimeGraphXValue] = useState<Array<string>>([]);
  const [intensitySportsValue, setIntensitySportsValue] = useState<
    Array<number>
  >([]);
  const [intensityPhysicalValue, setIntensityPhysicalValue] = useState<
    Array<number>
  >([]);
  const [intensityGraphXValue, setIntensityGraphXValue] = useState<
    Array<string>
  >([]);

  const [hooperIndexGraph, setHooperIndexGraph] =
    useState<HooperIndexGraphType>();
  const [workoutTimeGraph, setWorkoutTimeGraph] = useState<
    WorkoutTimeGraphType[]
  >([]);
  const [intensityGraph, setIntensityGraph] = useState<IntensityGraphType[]>(
    []
  );

  const onClickDays = () => setReportType("days");
  const onClickWeeks = () => setReportType("weeks");

  useEffect(() => {
    if (reportType === "days") {
      setHooperIndexGraph(playerDetail?.weekHooperIndexGraph);
      setWorkoutTimeGraph(playerDetail?.weekWorkoutTimeGraph);
      setIntensityGraph(playerDetail?.weekIntensityGraph);
    }

    if (reportType === "weeks") {
      setHooperIndexGraph(playerDetail?.monthHooperIndexGraph);
      setWorkoutTimeGraph(playerDetail?.monthWorkoutTimeGraph);
      setIntensityGraph(playerDetail?.monthIntensityGraph);
    }
  }, [playerDetail, reportType]);

  useEffect(() => {
    setHooperType("sleep");
  }, [graphType]);

  useEffect(() => {
    const sleepValue: Array<number> = [];
    const stressValue: Array<number> = [];
    const fatigueValue: Array<number> = [];
    const muscleValue: Array<number> = [];
    const sleepXValue: Array<string> = [];
    const stressXValue: Array<string> = [];
    const fatigueXValue: Array<string> = [];
    const muscleXValue: Array<string> = [];

    const tSportsValue: Array<number> = [];
    const tPhysicalValue: Array<number> = [];
    const tXValue: Array<string> = [];
    const iSportsValue: Array<number> = [];
    const iPhysicalValue: Array<number> = [];
    const iXValue: Array<string> = [];

    hooperIndexGraph?.sleepInfo.map((item) => {
      sleepValue.push(item.level);
      sleepXValue.push(item.xvalue);
    });
    hooperIndexGraph?.stressInfo.map((item) => {
      stressValue.push(item.level);
      stressXValue.push(item.xvalue);
    });
    hooperIndexGraph?.fatigueInfo.map((item) => {
      fatigueValue.push(item.level);
      fatigueXValue.push(item.xvalue);
    });
    hooperIndexGraph?.muscleSorenessInfo.map((item) => {
      muscleValue.push(item.level);
      muscleXValue.push(item.xvalue);
    });

    workoutTimeGraph?.map((item) => {
      if (item.type === "스포츠") {
        tSportsValue.push(getDateToNum(item.workoutTime));
      }

      if (item.type === "피지컬") {
        tPhysicalValue.push(getDateToNum(item.workoutTime));
      }

      tXValue.push(item.xvalue);
    });

    intensityGraph?.map((item) => {
      if (item.type === "스포츠") {
        iSportsValue.push(item.level);
      }

      if (item.type === "피지컬") {
        iPhysicalValue.push(item.level);
      }

      iXValue.push(item.xvalue);
    });

    setHooperGraph({
      sleep: {
        value: sleepValue,
        xvalue: sleepXValue,
      },
      stress: {
        value: stressValue,
        xvalue: stressXValue,
      },
      fatigue: {
        value: fatigueValue,
        xvalue: fatigueXValue,
      },
      muscleSoreness: { value: muscleValue, xvalue: muscleXValue },
    });

    setTimeSportsValue(tSportsValue);
    setTimePhysicalValue(tPhysicalValue);
    setTimeGraphXValue([...new Set(tXValue)]);

    setIntensitySportsValue(iSportsValue);
    setIntensityPhysicalValue(iPhysicalValue);
    setIntensityGraphXValue(iXValue);
  }, [hooperIndexGraph, workoutTimeGraph, intensityGraph]);

  return (
    <div className="w-full min-w-[650px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full text-[20px] font-[700] space-x-1 space-y-2">
        <div className="w-full flex justify-between">
          <div className="flex space-x-8">
            <div
              onClick={() => setGraphType("hooper")}
              className={cls(
                "cursor-pointer",
                graphType === "hooper" ? "text-[#000]" : "text-[#C1C1C1]"
              )}
            >
              후퍼인덱스
            </div>
            <div
              onClick={() => setGraphType("intensity")}
              className={cls(
                "cursor-pointer",
                graphType === "intensity" ? "text-[#000]" : "text-[#C1C1C1]"
              )}
            >
              운동강도
            </div>
            <div
              onClick={() => setGraphType("time")}
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
        {graphType === "hooper" && (
          <div className="flex flex-col text-[12px]">
            <div className="flex space-x-8">
              <div
                onClick={() => setHooperType("sleep")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "sleep" ? "text-[#000]" : "text-[#B9B9C3]"
                )}
              >
                수면의 질
              </div>
              <div
                onClick={() => setHooperType("stress")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "stress" ? "text-[#000]" : "text-[#B9B9C3]"
                )}
              >
                스트레스
              </div>
              <div
                onClick={() => setHooperType("fatigue")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "fatigue" ? "text-[#000]" : "text-[#B9B9C3]"
                )}
              >
                피로
              </div>
              <div
                onClick={() => setHooperType("muscle")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "muscle" ? "text-[#000]" : "text-[#B9B9C3]"
                )}
              >
                근육통
              </div>
            </div>
            <div className="w-full">
              {hooperType === "sleep" &&
              hooperGraph?.sleep &&
              hooperGraph?.sleep.value.length !== 0 &&
              hooperGraph?.sleep.xvalue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={hooperGraph.sleep.xvalue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: hooperGraph.sleep.value,
                      color: "#C6E19B",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: hooperGraph.sleep.value,
                      color: "#FF9F43",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : hooperType === "stress" &&
                hooperGraph?.stress &&
                hooperGraph?.stress.value.length !== 0 &&
                hooperGraph?.stress.xvalue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={hooperGraph.stress.xvalue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: hooperGraph.stress.value,
                      color: "#C6E19B",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: hooperGraph.stress.value,
                      color: "#FF9F43",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : hooperType === "fatigue" &&
                hooperGraph?.fatigue &&
                hooperGraph?.fatigue.value.length !== 0 &&
                hooperGraph?.fatigue.xvalue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={hooperGraph.fatigue.xvalue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: hooperGraph.fatigue.value,
                      color: "#C6E19B",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: hooperGraph.fatigue.value,
                      color: "#FF9F43",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : hooperType === "muscle" &&
                hooperGraph?.muscleSoreness &&
                hooperGraph?.muscleSoreness.value.length !== 0 &&
                hooperGraph?.muscleSoreness.xvalue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={hooperGraph.muscleSoreness.xvalue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: hooperGraph.muscleSoreness.value,
                      color: "#C6E19B",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: hooperGraph.muscleSoreness.value,
                      color: "#FF9F43",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : (
                <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold text-[16px]">
                  데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
        {graphType === "intensity" && (
          <div className="flex flex-col text-[12px]">
            <div className="flex space-x-8">
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">스포츠훈련</div>
                <div className="w-[12px] h-[12px] bg-[#C6E19B] rounded-[50%]"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">피지컬훈련</div>
                <div className="w-[12px] h-[12px] bg-[#F0EA0D] rounded-[50%]"></div>
              </div>
            </div>
            <div className="w-full">
              {intensitySportsValue.length !== 0 &&
              intensityPhysicalValue.length !== 0 &&
              intensityGraphXValue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={intensityGraphXValue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: intensitySportsValue,
                      color: "#C6E19B",
                      label: "스포츠훈련",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: intensitySportsValue,
                      color: "#FF0000",
                      label: "스포츠훈련",
                    },
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: intensityPhysicalValue,
                      color: "#F0EA0D",
                      label: "피지컬훈련",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : (
                <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold text-[16px]">
                  데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
        {graphType === "time" && (
          <div className="flex flex-col text-[12px]">
            <div className="text-[#000] text-[12px]">단위 : 시간</div>
            <div className="w-full">
              {timeSportsValue.length !== 0 &&
              timePhysicalValue.length !== 0 &&
              timeGraphXValue.length !== 0 ? (
                <AxisWithComposition
                  xAxisData={timeGraphXValue}
                  seriesData={[
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: timeSportsValue,
                      color: "#C6E19B",
                      label: "스포츠훈련",
                    },
                    {
                      type: "line",
                      curve: "linear",
                      yAxisKey: "totalCount",
                      data: timeSportsValue,
                      color: "#FF0000",
                    },
                    {
                      type: "bar",
                      yAxisKey: "loadValue",
                      data: timePhysicalValue,
                      color: "#F0EA0D",
                      label: "피지컬훈련",
                    },
                  ]}
                  yAxisIds={yAxisIds}
                  height={300}
                  margin={{ left: 40, right: 60 }}
                />
              ) : (
                <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold text-[16px]">
                  데이터가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyAvgInfo;
