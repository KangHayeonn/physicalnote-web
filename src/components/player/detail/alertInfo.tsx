import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { UnregisteredInfoType } from "@/types/player";
import { getWeekdayFormat } from "@/utils/strFormat";

const AlertInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [alertData, setAlertData] = useState<UnregisteredInfoType[]>([]);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  useEffect(() => {
    setAlertData(playerDetail.unregisteredInfo);
  }, [playerDetail]);

  return (
    <div className="w-full flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full flex flex-col space-y-8">
        <div className="text-[16px] font-[700]">미등록일 알림 보내기</div>
        <div className="w-full flex justify-center">
          <ul className="text-[16px] font-[700] flex space-x-16">
            {alertData.length !== 0 ? (
              alertData.map((item, idx) => (
                <>
                  {(idx === 0 || idx % 3 === 0) && (
                    <li
                      key={`unregistered${idx}`}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div>{getWeekdayFormat(item.day)}</div>
                      <div>
                        <Image
                          loader={imageLoader}
                          //src={data.profile || "/images/profile_default.svg"}
                          src="/images/alert_unchecked.svg"
                          width={0}
                          height={0}
                          priority
                          alt="alert icon"
                          style={{
                            width: "30px",
                            height: "auto",
                          }}
                        />
                      </div>
                    </li>
                  )}
                </>
              ))
            ) : (
              <div>데이터 xxx</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
