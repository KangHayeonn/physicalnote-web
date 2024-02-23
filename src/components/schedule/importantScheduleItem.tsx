import React from "react";
import Image from "next/image";

const ImportantScheduleItem = () => {
  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-full h-[118px] flex flex-col space-y-1 py-3 px-5">
      <div className="w-full flex justify-around items-center">
        <div className="w-full flex justify-start items-center space-x-1">
          <Image
            src="/images/star_checked.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "22px", height: "auto" }}
          />
          <span className="text-[16px] font-[700]">
            안녕하세요안녕하세요안녕하세요
          </span>
        </div>
        <div>
          <Image
            src="/icons/edit_gray.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "15px", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex flex-col text-[15px]">
        <span>기간 - 10월 8일(일)</span>
        <span>시간 - 09:30 ~ 11:00</span>
        <span>장소 - 강릉종합운동장</span>
      </div>
    </div>
  );
};

export default ImportantScheduleItem;
