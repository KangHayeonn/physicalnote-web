import React from "react";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { xAxisData, seriesData } from "@/constants/mock/injuryProgress";

const TrainingLoadGraph = () => {
  const yAxisIds = [
    { id: "nonContactCnt" },
    { id: "contactCnt" },
    { id: "totalCount" },
    { id: "diseaseCount" },
  ];

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
              xAxisData={xAxisData}
              seriesData={seriesData}
              yAxisIds={yAxisIds}
              height={260}
              margin={{ left: 40, right: 40 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLoadGraph;
