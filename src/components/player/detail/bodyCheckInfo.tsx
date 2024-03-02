import React from "react";
import Image from "next/image";
import BodyCheckFrontChart from "@/components/player/detail/bodyCheckFrontChart";
import BodyCheckBackChart from "@/components/player/detail/bodyCheckBackChart";

const BodyCheckInfo = () => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="w-full min-w-[800px] flex flex-col space-y-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="text-[20px] font-[700] space-x-1">부상체크</div>
      <div className="flex space-x-16">
        <div className="flex">
          <BodyCheckFrontChart type="" />
          <BodyCheckBackChart />
        </div>
        <div className="w-full h-[330px] space-y-6 overflow-y-scroll p-3">
          <div className="w-full cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] space-y-2 rounded-[20px] flex flex-col justify-start py-4 px-7">
            <div className="w-full flex justify-between mb-[5px]">
              <div className="flex space-x-3">
                <div className="px-3 py-0.5 bg-[#FBDD73] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  2단계
                </div>
                <div className="flex items-center space-x-1">
                  <div className="font-[700] text-[16px]">대흉근</div>
                  <div className="text-[12px]">2023.07.15</div>
                </div>
              </div>
              <button>열기</button>
            </div>
            <div className="space-y-0.5">
              <div className="text-[14px] font-[700]">접촉(타박부상)</div>
              <div className="text-[14px] font-[700]">보통 통증</div>
              <div className="text-[12px]">
                : 활동가능, 하지만 땀이 나거나 열을 내면 완화 가능
              </div>
            </div>
          </div>
          <div className="w-full cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] space-y-2 rounded-[20px] flex flex-col justify-start py-4 px-7">
            <div className="w-full flex justify-between mb-[5px]">
              <div className="flex space-x-3">
                <div className="px-3 py-0.5 bg-[#FBDD73] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  2단계
                </div>
                <div className="flex items-center space-x-1">
                  <div className="font-[700] text-[16px]">대흉근</div>
                  <div className="text-[12px]">2023.07.15</div>
                </div>
              </div>
              <button>열기</button>
            </div>
            <div className="space-y-0.5">
              <div className="text-[14px] font-[700]">접촉(타박부상)</div>
              <div className="text-[14px] font-[700]">보통 통증</div>
              <div className="text-[12px]">
                : 활동가능, 하지만 땀이 나거나 열을 내면 완화 가능
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="text-[14px] font-[700] mt-[10px]">통증양상</div>
              <div className="flex flex-row flex-wrap gap-3 text-[14px]">
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  짜릿함
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  압박감
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  쑤시는
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  타이트
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  힘이 빠짐
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  타이트
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  힘이 빠짐
                </div>
              </div>
              <div className="text-[14px] font-[700]">통증시기</div>
              <div className="flex flex-row flex-wrap gap-3 text-[14px]">
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  간헐적
                </div>
                <div className="px-3 py-0.5 bg-[#fff] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                  휴식기
                </div>
              </div>
              <div className="text-[14px] font-[700]">기타 메모</div>
              <div className="w-full shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-col justify-start py-2 px-4 text-[14px]">
                텍스트
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCheckInfo;
