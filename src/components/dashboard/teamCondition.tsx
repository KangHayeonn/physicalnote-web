import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Slider, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { TeamConditionInfoType } from "@/types/dashboard";
import { teamConditionState } from "@/recoil/dashboard/dashboardState";
import { marks, marks2 } from "@/constants/mock/dashboard";

const TeamCondition = () => {
  const [condition, setCondition] = useState<TeamConditionInfoType>({
    hooperIndexValue: 0,
    hooperIndexString: "",
    urineValue: 0,
    registeredPlayerIds: [],
    registeredPlayerCnt: 0,
    unRegisteredPlayerIds: [],
    unRegisteredPlayerCnt: 0,
  });
  const teamCondition = useRecoilValue(teamConditionState);

  const PrettoSlider = styled(Slider)({
    color: "#4D73BA",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: 23,
      backgroundColor: "unset",
      color: "#4D73BA",
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: "#000",
        fontWeight: 700,
      },
    },
    "&.Mui-disabled": {
      color: "#4D73BA",
    },
  });
  const PrettoSlider2 = styled(Slider)({
    color: "#E6E68C",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: 23,
      backgroundColor: "unset",
      color: "#E6E68C",
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: "#000",
        fontWeight: 700,
      },
    },
    "&.Mui-disabled": {
      color: "#E6E68C",
    },
  });

  function valuetext(value: number) {
    return `${value}`;
  }

  useEffect(() => {
    setCondition(teamCondition);
  }, [teamCondition]);

  return (
    <div className="flex flex-col col-span-5 space-y-4">
      <div className="flex itmes-center space-x-24">
        <div className="flex flex-col space-y-2">
          <span className="text-[15px] font-[400]">■ 훈련준비 상태</span>
          <div className="w-full">
            <Box sx={{ width: 300 }}>
              {condition.hooperIndexValue !== 0 ? (
                <PrettoSlider
                  defaultValue={Math.floor(condition.hooperIndexValue)}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={1}
                  marks={marks}
                  min={4}
                  max={21}
                  disabled
                />
              ) : (
                <PrettoSlider disabled />
              )}
            </Box>
            {condition.hooperIndexValue !== 0 && (
              <em className="text-[12px] text-[#000] font-[400] not-italic">{`Hooper Index(평균값) : ${Math.floor(condition.hooperIndexValue)} (${condition.hooperIndexString})`}</em>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col items-center divide-dotted divide-y-2">
            <div className="py-2 text-[12px] font-[400] space-x-4">
              <span>등록선수</span>
              <span>:</span>
              <span>
                {condition.registeredPlayerCnt < 10
                  ? `0${condition.registeredPlayerCnt}`
                  : condition.registeredPlayerCnt}
                명
              </span>
            </div>
            <div className="py-2 text-[12px] font-[400] space-x-4">
              <span>미등록선수</span>
              <span>:</span>
              <span>
                {condition.unRegisteredPlayerCnt < 10
                  ? `0${condition.unRegisteredPlayerCnt}`
                  : condition.unRegisteredPlayerCnt}
                명
              </span>
            </div>
          </div>
          {condition.unRegisteredPlayerCnt !== 0 && (
            <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[170px] h-[25px] flex justify-center items-center space-x-2">
              <span className="text-[12px] text-[#8DBE3D] font-[400]">
                미등록 선수({condition.unRegisteredPlayerCnt}명) 알림
              </span>
              <span>
                <Image
                  src="/images/alert.svg"
                  width={17}
                  height={17}
                  alt="alert icon"
                />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-24">
        <div className="flex flex-col space-y-2">
          <span className="text-[15px] font-[400]">■ 수분섭취 상태</span>
          <div className="w-full">
            <Box sx={{ width: 300 }}>
              {condition.urineValue !== 0 ? (
                <PrettoSlider2
                  defaultValue={Math.floor(condition.urineValue)}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={1}
                  marks={marks2}
                  min={1}
                  max={7}
                  disabled
                />
              ) : (
                <PrettoSlider2 disabled />
              )}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCondition;
