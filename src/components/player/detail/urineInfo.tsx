import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { UrineInfoType } from "@/types/player";

const UrineInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [data, setData] = useState<UrineInfoType>();
  const [color, setColor] = useState<string>("#E9EFCD");

  const urineColor: any = {
    "매우 양호": "#FFFEF9",
    양호: "#E9EFCD",
    적정: "#E6E68C",
    "수분 섭취 요망": "#E0DC56",
    "수분 섭취 권장": "#E2DA15",
    "수분 섭취 필요": "#D2A121",
    "수분 부족 위급": "#C18D27",
  };

  useEffect(() => {
    setData(playerDetail.urineResponseDto);

    const urine = playerDetail.urineResponseDto?.urine;
    if (urine) {
      setColor(urineColor[urine]);
    }
  }, [playerDetail]);

  return (
    <div className="min-w-[250px] h-[175px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div>
        <div className="text-[20px] font-[700] space-x-1">소변검사</div>
        <div className="w-full h-[120px] text-[16px] flex flex-col justify-center space-y-3">
          <div className="flex items-center space-x-1">
            <div>공복 몸무게 :</div>
            <div>{data?.weight.toFixed(1) || 0.0}kg</div>
            <em className="text-[12px] text-[#000AFF] font-[400] not-italic">
              {`(${data?.differenceFat || "-"}%)`}
            </em>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-[83px] h-[16px]"
              style={{ backgroundColor: color }}
            ></div>
            <div> : {data?.urine || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrineInfo;
