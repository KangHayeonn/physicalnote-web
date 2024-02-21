import React from "react";
import Item from "@/components/common/item";

const TeamInjury = () => {
  return (
    <div className="flex flex-col col-span-5 space-y-4">
      <h2 className="text-[20px] font-[500]">부상자 현황</h2>
      <div className="flex flex-col space-y-2">
        <span className="text-[15px] font-[400]">■ 총 부상자 : 00명</span>
      </div>
      <div className="w-full grid grid-cols-4">
        {[1, 1, 1, 1].map((el, idx) => (
          <Item key={idx} position="미드필더/공격수" name="홍길동" />
        ))}
      </div>
    </div>
  );
};

export default TeamInjury;
