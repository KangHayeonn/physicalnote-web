import React from "react";

const TrainingBalance = () => {
  return (
    <div className="grid grid-rows-1 min-w-[457px]">
      <div className="text-[15px] font-[400] space-x-2">
        <span>■ 트레이닝 밸런스</span>
        <em className="text-[12px] text-[#CBCCCD] font-[400] not-italic">
          (이번주 운동부하 평균 / 지난주 운동부하 평균)
        </em>
      </div>
      <div className="w-full">
        <span className="text-[15px] font-[400]">
          [ 이번주 운동부하 평균 : 300 ]
        </span>
        <div className="flex space-x-10 mt-6 mb-5">
          <div className="w-full h-[42px] flex justify-around items-center rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            <div>지난 4주 (400)</div>
            <div className="px-2 bg-[#FFCFA1] rounded-[5px] font-[700]">
              0.75
            </div>
          </div>
          <div className="w-full h-[42px] flex justify-around items-center rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            <div>지난 6주 (500)</div>
            <div className="px-2 bg-[#FFCFA1] rounded-[5px] font-[700]">
              0.60
            </div>
          </div>
        </div>
        <div className="flex space-x-10 mb-9">
          <div className="w-full h-[42px] flex justify-around items-center rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            <div>지난 8주 (420)</div>
            <div className="px-2 bg-[#C7DF9F] rounded-[5px] font-[700]">
              1.40
            </div>
          </div>
          <div className="w-full h-[42px] flex justify-around items-center rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            <div>지난 10주 (170)</div>
            <div className="px-2 bg-[#FFA1A1] rounded-[5px] font-[700]">
              1.76
            </div>
          </div>
        </div>
        <div className="w-full text-[15px] p-2 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] space-y-1">
          <div className="flex space-x-1">
            <div className="w-[93px] flex justify-center px-2 bg-[#FFCFA1] rounded-[5px] font-[700]">
              ＜0.80
            </div>
            <div>훈련부하 부족으로 상대적 부상위험이 있습니다.</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-[93px] flex justify-center px-2 bg-[#C7DF9F] rounded-[5px] font-[700]">
              0.80 - 1.50
            </div>
            <div>
              최적의 훈련부하로써 부상위험이{" "}
              <em className="text-[15px] text-[#8DBE3D] font-[700] not-italic">
                낮습니다.
              </em>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className=" w-[93px] flex justify-center px-2 bg-[#FFA1A1] rounded-[5px] font-[700]">
              ＞1.50
            </div>
            <div>
              오버트레이닝 구간으로 부상위험이{" "}
              <em className="text-[15px] text-[#FF0000] font-[700] not-italic">
                아주 높습니다.
              </em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingBalance;
