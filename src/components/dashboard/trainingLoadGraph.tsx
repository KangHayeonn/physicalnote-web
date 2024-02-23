import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { trainingLoadGraphSelector } from "@/recoil/dashboard/dashboardState";
import { TrainingLoadGraphInfoType } from "@/types/dashboard";
import { SeriesDataType } from "@/types/chart";

const TrainingLoadGraph = () => {
  const trainingLoadGraphInfo = useRecoilValue(trainingLoadGraphSelector);
  const [trainingLoad, setTrainingLoad] = useState<TrainingLoadGraphInfoType[]>(
    []
  );
  const [progressData, setProgressData] = useState<SeriesDataType[]>([]);
  const [xAxis, setXAxis] = useState<Array<string>>([]);

  const yAxisIds = [{ id: "loadValue" }, { id: "totalCount" }];

  useEffect(() => {
    if (trainingLoadGraphInfo) {
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
          color: "#FF0000",
        },
      ]);
      setXAxis(xAxisList);
      setTrainingLoad(trainingLoad);
    }
  }, [trainingLoadGraphInfo]);

  return (
    <div className="grid grid-cols-12 space-x-10">
      <div className="flex flex-col col-span-12 space-y-4">
        <span className="text-[15px] font-[400] space-x-2">
          ■ 훈련부하 모니터링
        </span>
        <div className="space-y-3">
          <div className="ml-4 text-[15px] font-[400] space-x-4">
            <span>TSB Traning load</span>
            <em className="text-[#CBCCCD] not-italic">TSB Traning Duration</em>
          </div>
          <div className="rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            <AxisWithComposition
              xAxisData={xAxis}
              seriesData={progressData}
              yAxisIds={yAxisIds}
              height={260}
              margin={{ left: 60, right: 60 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLoadGraph;
