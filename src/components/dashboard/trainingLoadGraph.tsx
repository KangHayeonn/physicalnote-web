import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import AxisWithComposition from "@/components/common/axisWithComposition";
import {
  trainingDurationGraphSelector,
  trainingLoadGraphSelector,
} from "@/recoil/dashboard/dashboardState";
import { SeriesDataType } from "@/types/chart";
import { cls } from "@/utils";
import { yAxisIds } from "@/constants/mock/dashboard";

const TrainingLoadGraph = () => {
  const trainingLoadGraphInfo = useRecoilValue(trainingLoadGraphSelector);
  const trainingDurationGraphInfo = useRecoilValue(
    trainingDurationGraphSelector
  );
  const [progressData, setProgressData] = useState<SeriesDataType[]>([]); // trainingLoad
  const [progressData2, setProgressData2] = useState<SeriesDataType[]>([]); // trainingDuration
  const [xAxis, setXAxis] = useState<Array<string>>([]);
  const [xAxis2, setXAxis2] = useState<Array<string>>([]);
  const [trainingType, setTrainingType] = useState<string>("load");

  const init = () => {
    setTrainingType("load");
    setProgressData([]);
    setProgressData2([]);
    setXAxis([]);
    setXAxis2([]);
  };

  useEffect(() => {
    init();

    if (trainingLoadGraphInfo.length > 0) {
      const tempLoadValue: Array<number> = [];
      const tempTotalCount: Array<number> = [];
      const xAxisList: Array<string> = [];

      trainingLoadGraphInfo.map((info) => {
        const { monthOfString, weeklyGraphInfo } = info;
        weeklyGraphInfo?.map((item) => {
          tempLoadValue.push(item.value);
          tempTotalCount.push(item.value);
          xAxisList.push(`${monthOfString} ${item.xvalue}`);
        });
      });

      setProgressData([
        {
          type: "bar",
          yAxisKey: "loadValue",
          data: tempLoadValue,
          color: "#C6E19B",
        },
        {
          type: "line",
          curve: "linear",
          yAxisKey: "totalCount",
          data: tempTotalCount,
          color: "#FF9F43",
        },
      ]);
      setXAxis(xAxisList);
    }

    if (trainingDurationGraphInfo.length > 0) {
      const tempLoadValue: Array<number> = [];
      const tempTotalCount: Array<number> = [];
      const xAxisList: Array<string> = [];

      trainingDurationGraphInfo.map((info) => {
        const { monthOfString, weeklyGraphInfo } = info;
        weeklyGraphInfo?.map((item) => {
          tempLoadValue.push(item.value);
          tempTotalCount.push(item.value);
          xAxisList.push(`${monthOfString} ${item.xvalue}`);
        });
      });

      setProgressData2([
        {
          type: "bar",
          yAxisKey: "loadValue",
          data: tempLoadValue,
          color: "#C6E19B",
        },
        {
          type: "line",
          curve: "linear",
          yAxisKey: "totalCount",
          data: tempTotalCount,
          color: "#FF0000",
        },
      ]);
      setXAxis2(xAxisList);
    }
  }, [trainingLoadGraphInfo, trainingDurationGraphInfo]);

  return (
    <div className="grid grid-cols-12 space-x-10">
      <div className="flex flex-col col-span-12 space-y-4">
        <span className="text-[15px] font-[400] space-x-2">
          ■ 훈련부하 모니터링
        </span>
        <div className="space-y-3">
          <div className="flex ml-4 text-[15px] font-[700] space-x-4">
            <div
              onClick={() => setTrainingType("load")}
              className="cursor-pointer"
            >
              <span
                className={cls(
                  trainingType === "load" ? "text-[#000]" : "text-[#CBCCCD]"
                )}
              >
                TSB Training Load
              </span>
            </div>
            <div
              onClick={() => setTrainingType("duration")}
              className="cursor-pointer"
            >
              <em
                className={cls(
                  "not-italic font-[700]",
                  trainingType === "duration" ? "text-[#000]" : "text-[#CBCCCD]"
                )}
              >
                TSB Training Duration
              </em>
            </div>
          </div>
          <div className="rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {(trainingType === "load" && progressData.length !== 0) ||
            (trainingType === "duration" && progressData2.length !== 0) ? (
              <AxisWithComposition
                xAxisData={trainingType === "load" ? xAxis : xAxis2}
                seriesData={
                  trainingType === "load" ? progressData : progressData2
                }
                yAxisIds={yAxisIds}
                height={260}
                margin={{ left: 60, right: 60 }}
              />
            ) : (
              <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
                데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLoadGraph;
