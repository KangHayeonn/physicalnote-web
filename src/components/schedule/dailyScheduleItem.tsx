import React from "react";
import Image from "next/image";

const DailyScheduleItem = () => {
  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-full h-[300px] flex flex-col space-y-2 py-3 px-5">
      <div className="w-full flex justify-around items-center">
        <div className="w-full flex justify-start items-center space-x-1">
          <div className="text-[15px] font-[700] px-3 bg-[#EDFBD5]">필드</div>
        </div>
        <div>
          <Image
            src="/icons/edit_gray.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "16px", height: "auto" }}
          />
        </div>
      </div>
      <div className="h-[112px] overflow-y-scroll flex flex-col text-[15px]">
        <div className="flex space-x-1">
          <span className="min-w-[43px]">이름 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            <div className="w-full line-clamp-1">
              안녕하세요안녕하세요안녕하세요
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">장소 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            강릉종합운동장
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">시간 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            <div className="w-full line-clamp-1">09:30 ~ 11:00</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">선수 - </span>
          <div className="w-full max-w-[400px] break-words">
            가선수, 나선수, 다선수가선수, 나선수, 다선수가선수, 나선수,
            다선수가선수, 나선수, 다선수가선수, 나선수, 다선수
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[73px]">훈련내용 - </span>
          <div className="w-full max-w-[400px] break-words">
            전술훈련전술훈련전술훈련전술훈련전술훈련전술훈련
          </div>
        </div>
      </div>
      <div className="w-[149px] h-[107px] bg-[#CBCCCD]">image</div>
    </div>
  );
};

export default DailyScheduleItem;
