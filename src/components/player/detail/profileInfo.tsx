import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Slider, styled } from "@mui/material";
import { marks } from "@/constants/mock/dashboard";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { UserInfoType } from "@/types/player";

const ProfileInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [userInfo, setUserInfo] = useState<UserInfoType>();
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

  useEffect(() => {
    setUserInfo(playerDetail.userInfo);
  }, [playerDetail]);

  return (
    <div className="w-full min-w-[860px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="flex items-start justify-start space-x-10 py-2 min-w-[292px]">
        <div className="w-[92px] h-[92px] rounded-[46px] bg-[#D9D9D9] flex justify-center items-center cursor-pointer">
          <Image
            loader={imageLoader}
            src={
              userInfo?.profile && userInfo?.profile !== "string"
                ? userInfo?.profile
                : "/images/profile_default.svg"
            }
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
          <p className="text-[16px] font-[700]">이름 : {userInfo?.name}</p>
          <p className="text-[16px] font-[700]">
            키 : {userInfo?.height && Math.ceil(userInfo?.height)} cm
          </p>
          <p className="text-[16px] font-[700]">
            몸무게 : {userInfo?.weight && Math.ceil(userInfo?.weight)} kg
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="min-w-[80px] text-[16px] font-[700]">포지션</div>
          <div className="flex space-x-2">
            {userInfo?.positions &&
              userInfo?.positions.length > 0 &&
              userInfo?.positions.map((item, idx) => (
                <div
                  key={`userInfo${idx}`}
                  className="flex justify-center items-center min-w-[60px] h-[30px] px-3 py-1 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[12px] cursor-pointer bg-[#C6E19B]"
                >
                  {item}
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="min-w-[80px] text-[16px] font-[700]">오른쪽 발</div>
          <div>
            <Box sx={{ width: 300 }}>
              <PrettoSlider
                defaultValue={
                  userInfo?.rightValue && Math.ceil(userInfo?.rightValue)
                }
                valueLabelDisplay="on"
                step={1}
                min={1}
                max={10}
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
                defaultValue={
                  userInfo?.leftValue && Math.ceil(userInfo?.leftValue)
                }
                valueLabelDisplay="on"
                step={1}
                min={1}
                max={10}
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
