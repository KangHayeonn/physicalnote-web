import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Api from "@/api/privateData";
import { PlayerHooperIndexType } from "@/types/privateData";

const PlayerHooperIndex = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hooperData, setHooperData] = useState<PlayerHooperIndexType>({
    hooperIndex12: 0,
    hooperIndex34: 0,
    hooperIndex56: 0,
    hooperIndex78: 0,
    hooperIndex910: 0,
  });

  const getHooperIndexData = async () => {
    await Api.v1GetPlayerHooperIndex(Number(id)).then((res) => {
      const { data } = res;
      if (data) {
        setHooperData({ ...data });
      }
    });
  };

  useEffect(() => {
    if (id) {
      getHooperIndexData();
    }
  }, []);

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
          <div className="w-[100%] absolute top-[0px] left-[180px] text-[#C6E19B] text-[42px] font-[700]">
            {hooperData.hooperIndex12}
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
          <div className="w-[100%] absolute top-[0px] left-[180px] text-[#CAD5EB] text-[42px] font-[700]">
            {hooperData.hooperIndex34}
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
          <div className="w-[100%] absolute top-[0px] left-[180px] text-[#FFE177] text-[42px] font-[700]">
            {hooperData.hooperIndex56}
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
          <div className="w-[100%] absolute top-[-20px] left-[180px] text-[#FF9F43] text-[42px] font-[700]">
            {hooperData.hooperIndex78}
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
          <div className="w-[100%] absolute top-[0px] left-[180px] text-[#FF0000] text-[42px] font-[700]">
            {hooperData.hooperIndex910}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHooperIndex;
