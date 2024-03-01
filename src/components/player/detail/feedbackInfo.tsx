import React, { useState } from "react";
import Image from "next/image";
import { TeamNoteInfoType } from "@/types/dashboard";

const FeedbackInfo = () => {
  const [note, setNote] = useState<TeamNoteInfoType>({
    content: "",
    recordDate: "",
  });
  const [htmlContent, setHtmlContent] = useState<string>("");

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML);
  };

  return (
    <div className="w-full flex flex-col rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8 space-y-2">
      <div className="flex space-x-4">
        <div className="text-[20px] font-[700] space-x-1">오늘의 피드백</div>
        <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[133px] h-[25px] flex justify-center items-center space-x-2">
          <span className="text-[12px] text-[#8DBE3D] font-[400]">
            일정 알림 보내기
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
      </div>
      <div className="w-full h-[75px] relative border-[1px]">
        <div
          className="w-full h-[75px] overflow-y-scroll bg-transparent border-none resize-none outline-none py-0 focus:border-transparent focus:ring-0"
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>
      <div className="w-full flex justify-end">
        <button>수정</button>
        <button>저장</button>
      </div>
    </div>
  );
};

export default FeedbackInfo;
