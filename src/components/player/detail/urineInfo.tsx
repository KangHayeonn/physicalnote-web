import React from "react";

const UrineInfo = () => {
  return (
    <div className="min-w-[250px] h-[175px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div>
        <div className="text-[20px] font-[700] space-x-1">소변검사</div>
        <div className="w-full h-[120px] text-[16px] flex flex-col justify-center space-y-3">
          <div className="flex items-center space-x-1">
            <div>공복 몸무게 :</div>
            <div>72.1kg</div>
            <em className="text-[12px] text-[#000AFF] font-[400] not-italic">
              (-2%)
            </em>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-[83px] h-[16px] bg-[#FFEFB6]"></div>
            <div> : 양호</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrineInfo;
