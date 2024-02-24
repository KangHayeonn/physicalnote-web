import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImportantScheduleProps } from "@/types/schedule";

const ImportantScheduleItem = ({
  id,
  name,
  address,
  recordDate,
  workoutTime,
}: ImportantScheduleProps) => {
  const router = useRouter();

  const goEdit = () => {
    if (id) {
      router.push(`/schedule/create/${id.toString()}`);
    }
  };

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
          <span className="text-[16px] font-[700]">{name}</span>
        </div>
        <div onClick={goEdit}>
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
        <span>기간 - {recordDate}</span>
        <span>시간 - {workoutTime}</span>
        <span>장소 - {address}</span>
      </div>
    </div>
  );
};

export default ImportantScheduleItem;
