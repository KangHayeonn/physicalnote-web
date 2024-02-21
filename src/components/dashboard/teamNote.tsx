import React from "react";

const TeamNote = () => {
  return (
    <div className="grid grid-rows-1 w-full">
      <span className="text-[15px] font-[400]">■ 비고</span>
      <div className="flex flex-col justify-between w-full p-5 h-[260px] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[15px] font-[400]">
        <p>
          전술훈련
          <br />* 전술 훈련에 대한 비고사항
        </p>
        <div className="text-right">
          <button
            className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
            type="button"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamNote;
