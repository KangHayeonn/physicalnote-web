import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TeamNoteInfoType, TeamNoteType } from "@/types/dashboard";
import Button from "@/components/common/button";
import { getFullDateToString } from "@/utils/dateFormat";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";

const FeedbackInfo = ({ searchDate }: TeamNoteType) => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [note, setNote] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML);
  };

  const updateFeedback = async () => {
    // todo : update feedback
  };

  useEffect(() => {
    if (playerDetail.feedBackInfo) {
      setNote(playerDetail?.feedBackInfo);
    }
  }, [playerDetail]);

  useEffect(() => {
    if (searchDate) {
      setDate(getFullDateToString(searchDate));
    }
  }, [searchDate]);

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
              loader={imageLoader}
              src="/images/alert.svg"
              width={0}
              height={0}
              alt="alert icon"
              style={{ width: "17px", height: "auto" }}
            />
          </span>
        </button>
      </div>
      <div className="w-full h-[75px] relative border-[1px]">
        <div
          className="w-full h-[75px] overflow-y-scroll bg-transparent border-none resize-none outline-none py-0 focus:border-transparent focus:ring-0"
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: note }}
        ></div>
      </div>
      <div className="w-full flex justify-end">
        <Button
          text="저장"
          type="button"
          classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
          onClick={updateFeedback}
        />
      </div>
    </div>
  );
};

export default FeedbackInfo;
