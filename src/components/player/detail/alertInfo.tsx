import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { UnregisteredInfoType } from "@/types/player";

interface WeekDayType {
  day: string;
  unregistered: boolean;
}

const AlertInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [alertData, setAlertData] = useState<UnregisteredInfoType[]>([]);
  const [weekDay, setWeekDay] = useState<WeekDayType[]>([
    { day: "월", unregistered: false },
    { day: "화", unregistered: false },
    { day: "수", unregistered: false },
    { day: "목", unregistered: false },
    { day: "금", unregistered: false },
    { day: "토", unregistered: false },
    { day: "일", unregistered: false },
  ]);

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const hasDay = (arr: UnregisteredInfoType[], day: string) => {
    return arr.map((item) => item.day.startsWith(day)).includes(true);
  };

  useEffect(() => {
    setWeekDay([
      {
        day: "월",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Monday"),
      },
      {
        day: "화",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Tuesday"),
      },
      {
        day: "수",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Wednesday"),
      },
      {
        day: "목",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Thursday"),
      },
      {
        day: "금",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Friday"),
      },
      {
        day: "토",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Saturday"),
      },
      {
        day: "일",
        unregistered: hasDay(playerDetail?.unregisteredInfo, "Sunday"),
      },
    ]);

    setAlertData(playerDetail?.unregisteredInfo);
  }, [playerDetail]);

  return (
    <div className="w-full flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full flex flex-col space-y-8">
        <div className="text-[16px] font-[700]">미등록일 알림 보내기</div>
        <div className="w-full flex justify-center">
          <ul className="text-[16px] font-[700] flex space-x-16">
            {weekDay.length !== 0 ? (
              <>
                {weekDay.map((item, idx) => (
                  <li
                    key={`unregistered${idx}`}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div>{item.day}</div>
                    <div>
                      <Image
                        loader={imageLoader}
                        src={
                          item.unregistered
                            ? "/images/alert_checked.svg"
                            : "/images/alert_unchecked.svg"
                        }
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
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center w-full font-bold">
                데이터가 없습니다.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
