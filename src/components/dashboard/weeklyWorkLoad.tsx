import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";
import { weeklyWorkloadSelector } from "@/recoil/dashboard/dashboardState";
import { WeeklyWorkLoadInfoType } from "@/types/dashboard";

const WeeklyWorkLoad = () => {
  const weeklyWorkLoad = useRecoilValue(weeklyWorkloadSelector);
  const [weeklyData, setWeeklyData] = useState<WeeklyWorkLoadInfoType>({
    stringOfWeekly: "",
    workloadInfoList: [],
  });
  const [xvalue, setXvalue] = useState<Array<string>>([]);
  const [value, setValue] = useState<Array<number>>([]);

  useEffect(() => {
    if (weeklyWorkLoad) {
      const tempXvalue: Array<string> = [];
      const tempValue: Array<number> = [];

      weeklyWorkLoad.workloadInfoList.map((item) => {
        tempXvalue.push(item.xvalue);
        tempValue.push(item.value);
      });

      setWeeklyData(weeklyWorkLoad);
      setXvalue(tempXvalue);
      setValue(tempValue);
    }
  }, [weeklyWorkLoad]);

  return (
    <div className="flex flex-col col-span-5">
      <div className="text-[15px] font-[700] space-x-2">
        <span>■ 주간 트레이닝 부하</span>
        <em className="text-[12px] text-[#CBCCCD] font-[400] not-italic">
          (RPE X 운동시간 값)
        </em>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-[12px] font-[400] mr-4">
          {`[ ${weeklyData.stringOfWeekly} ]`}
        </span>
        <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
          {value.length !== 0 ? (
            <LineChart
              height={260}
              xAxis={[
                {
                  scaleType: "point",
                  data: xvalue,
                },
              ]}
              series={[
                {
                  type: "line",
                  curve: "linear",
                  data: value,
                  color: "#8DBE3D",
                  valueFormatter: (value) =>
                    value == null ? "?" : value.toString(),
                },
              ]}
            />
          ) : (
            <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
              데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkLoad;
