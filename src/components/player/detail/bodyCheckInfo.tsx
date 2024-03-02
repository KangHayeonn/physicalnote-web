import React, { useState, useEffect } from "react";
import Image from "next/image";
import BodyCheckFrontChart from "@/components/player/detail/bodyCheckFrontChart";
import BodyCheckBackChart from "@/components/player/detail/bodyCheckBackChart";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { InjuryInfoType } from "@/types/player";
import {
  formatInjuryColor,
  formatInjuryLevel,
  formatInjuryType,
  formatMuscleName,
} from "@/types/enum/player";
import { cls } from "@/utils";
import Button from "@/components/common/button";

const BodyCheckInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [injuryData, setInjuryData] = useState<InjuryInfoType[]>();
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [frontArr, setFrontArr] = useState<Map<string, string | null>>();
  const [backArr, setBackArr] = useState<Map<string, string | null>>();

  const toggleOpen = (idx: number) => {
    const newArr = Array(isOpen.length).fill(false);
    newArr[idx] = !isOpen[idx];
    setIsOpen(newArr);
  };

  useEffect(() => {
    const length = playerDetail?.injuryInfo.length;
    setInjuryData(playerDetail?.injuryInfo);

    const tempFront: Map<string, string | null> = new Map();
    const tempBack: Map<string, string | null> = new Map();
    playerDetail?.injuryInfo.map((item) => {
      const newStr = `${item.muscleType}+${item.bodyPart}`;
      const color =
        item.injuryLevelType && formatInjuryColor(item.injuryLevelType);

      const obj = { [newStr]: color };
      if (item.distinctionType === "FRONT") {
        tempFront.set(newStr, color);
      }

      if (item.distinctionType === "BACK") {
        tempBack.set(newStr, color);
      }
    });

    setFrontArr(tempFront);
    setBackArr(tempBack);

    if (length) {
      const arr = Array(length).fill(false);
      setIsOpen(arr);
    }
  }, [playerDetail]);

  return (
    <div className="w-full min-w-[900px] flex flex-col space-y-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="text-[20px] font-[700] space-x-1">부상체크</div>
      <div className="flex space-x-16">
        <div className="flex">
          <BodyCheckFrontChart injuryArr={frontArr} />
          <BodyCheckBackChart injuryArr={backArr} />
        </div>
        <div className="w-full h-[330px] space-y-6 overflow-y-scroll p-3">
          {injuryData?.length !== 0 ? (
            <>
              {injuryData?.map((item, idx) => (
                <div
                  key={`injury${idx}`}
                  className="w-full cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] space-y-2 rounded-[20px] flex flex-col justify-start py-4 px-7"
                >
                  <div className="w-full flex justify-between mb-[5px]">
                    <div className="flex space-x-3">
                      <div
                        className={cls(
                          "px-3 py-0.5 font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]",
                          `bg-[${(item.injuryLevelType && formatInjuryColor(item.injuryLevelType)) || "#8DBE3D"}]`,
                          `text-[${item.injuryLevelType === "INJURED" ? "#fff" : "#000"}]`
                        )}
                      >
                        {(item.injuryLevelType &&
                          formatInjuryLevel(item.injuryLevelType)) ||
                          "0단계"}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="font-[700] text-[16px]">
                          {(item.muscleType &&
                            formatMuscleName(item.muscleType)) ||
                            "-"}
                        </div>
                        <div className="text-[12px]">
                          {item.recordDate || "-"}
                        </div>
                      </div>
                    </div>
                    <Button
                      text="열림"
                      type="button"
                      classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                      onClick={() => toggleOpen(idx)}
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-[700]">
                      {(item.injuryType && formatInjuryType(item.injuryType)) ||
                        "-"}
                    </div>
                    <div className="text-[14px] font-[700]">
                      {(item.injuryLevelType &&
                        formatInjuryType(item.injuryLevelType).split("-")[0]) ||
                        "-"}
                    </div>
                    <div className="text-[12px]">
                      :{" "}
                      {item.injuryLevelString ||
                        (item.injuryLevelType &&
                          formatInjuryType(item.injuryLevelType).split("-")[1])}
                    </div>
                  </div>
                  {isOpen[idx] && (
                    <div className="flex flex-col space-y-3">
                      <div className="text-[14px] font-[700] mt-[10px]">
                        통증양상
                      </div>
                      <div className="flex flex-row flex-wrap gap-3 text-[14px]">
                        {item.painCharacteristicList.length !== 0 &&
                          item.painCharacteristicList.map((pain, idx) => (
                            <div
                              key={`pain-character${idx}`}
                              className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                            >
                              {formatInjuryType(pain)}
                            </div>
                          ))}
                      </div>
                      <div className="text-[14px] font-[700]">통증시기</div>
                      <div className="flex flex-row flex-wrap gap-3 text-[14px]">
                        {item.painTimeList.length !== 0 &&
                          item.painTimeList.map((time, idx) => (
                            <div
                              key={`time${idx}`}
                              className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                            >
                              {formatInjuryType(time)}
                            </div>
                          ))}
                      </div>
                      <div className="text-[14px] font-[700]">기타 메모</div>
                      <div className="w-full shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-col justify-start py-2 px-4 text-[14px]">
                        {item.comment || "-"}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
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

export default BodyCheckInfo;
