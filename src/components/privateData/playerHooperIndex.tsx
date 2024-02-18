import React from "react";
import Image from "next/image";

const PlayerHooperIndex = () => {
  return (
    <div className="w-[100%] relative">
      <h3 className="text-[20px] font-[700] mt-[30px]">
        운동 부하에 따른 후퍼인덱스 분석
      </h3>
      <div className="w-[100%] flex flex-row items-end space-y-16">
        <div className="min-w-[100px] text-[20px] font-[700]">운동 부하</div>
        <div className="w-[20%] relative">
          <Image
            src="/images/hooperIndexType1.svg"
            width={0}
            height={400}
            alt="hooper index image"
            style={{ width: "100%" }}
          />
          <div className="w-[100%] absolute top-[0px] left-[210px] text-[#C6E19B] text-[60px] font-[700]">
            0
          </div>
        </div>
        <div className="w-[20%] relative">
          <Image
            src="/images/hooperIndexType2.svg"
            width={0}
            height={400}
            alt="hooper index image"
            style={{ width: "100%" }}
          />
          <div className="w-[100%] absolute top-[0px] left-[210px] text-[#CAD5EB] text-[60px] font-[700]">
            0
          </div>
        </div>
        <div className="w-[20%] relative">
          <Image
            src="/images/hooperIndexType3.svg"
            width={0}
            height={400}
            alt="hooper index image"
            style={{ width: "100%" }}
          />
          <div className="w-[100%] absolute top-[0px] left-[210px] text-[#FFE177] text-[60px] font-[700]">
            0
          </div>
        </div>
        <div className="w-[20%] relative">
          <Image
            src="/images/hooperIndexType4.svg"
            width={0}
            height={400}
            alt="hooper index image"
            style={{ width: "100%" }}
          />
          <div className="w-[100%] absolute top-[-20px] left-[210px] text-[#FF9F43] text-[60px] font-[700]">
            0
          </div>
        </div>
        <div className="w-[20%] relative">
          <Image
            src="/images/hooperIndexType5.svg"
            width={0}
            height={400}
            alt="hooper index image"
            style={{ width: "100%" }}
          />
          <div className="w-[100%] absolute top-[0px] left-[210px] text-[#FF0000] text-[60px] font-[700]">
            0
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHooperIndex;
