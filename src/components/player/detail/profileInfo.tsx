import React from "react";
import Image from "next/image";
import { Box, Slider, styled } from "@mui/material";
import { marks } from "@/constants/mock/dashboard";

const ProfileInfo = () => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const PrettoSlider = styled(Slider)({
    color: "#C6E19B",
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
      color: "#C6E19B",
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
      color: "#C6E19B",
    },
  });

  return (
    <div className="w-full min-w-[860px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="flex items-start justify-start space-x-10 py-2 min-w-[292px]">
        <div className="w-[92px] h-[92px] rounded-[46px] bg-[#D9D9D9] flex justify-center items-center cursor-pointer">
          <Image
            loader={imageLoader}
            //src={data.profile || "/images/profile_default.svg"}
            src="/images/profile_default.svg"
            width={0}
            height={0}
            priority
            alt="프로필 이미지"
            style={{
              width: "92px",
              height: "auto",
              borderRadius: "46px",
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-[16px] font-[700]">이름 : 강하연</p>
          <p className="text-[16px] font-[700]">키 : 180 cm</p>
          <p className="text-[16px] font-[700]">몸무게 : 72 kg</p>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="min-w-[80px] text-[16px] font-[700]">포지션</div>
          <div className="flex space-x-2">
            <div className="flex justify-center items-center min-w-[60px] h-[30px] px-3 py-1 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[12px] cursor-pointer bg-[#C6E19B]">
              공격수
            </div>
            <div className="flex justify-center items-center min-w-[60px] h-[30px] px-3 py-1 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[12px] cursor-pointer bg-[#C6E19B]">
              미드필더
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="min-w-[80px] text-[16px] font-[700]">오른쪽 발</div>
          <div>
            <Box sx={{ width: 300 }}>
              <PrettoSlider
                defaultValue={Math.ceil(7)}
                valueLabelDisplay="on"
                step={1}
                min={4}
                max={21}
                disabled
              />
            </Box>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="min-w-[80px] text-[16px] font-[700]">왼쪽 발</div>
          <div>
            <Box sx={{ width: 300 }}>
              <PrettoSlider
                defaultValue={Math.ceil(7)}
                valueLabelDisplay="on"
                step={1}
                marks={marks}
                min={4}
                max={21}
                disabled
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
