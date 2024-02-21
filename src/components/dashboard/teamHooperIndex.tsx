import React from "react";
import Item from "@/components/common/item";

const TeamHooperIndex = () => {
  return (
    <div className="col-span-7 flex flex-col space-y-2">
      <div className="space-x-2">
        <span className="text-[15px] font-[400] ">■ 관찰대상</span>
        <em className="text-[12px] text-[#FF0000] font-[400] not-italic">
          (컨디션조절이 필요해요!)
        </em>
      </div>
      <div className="grid grid-cols-6 gap-10">
        {[1, 1, 1, 1, 1, 1].map((el, idx) => (
          <Item key={idx} position="미드필더" name="홍길동" />
        ))}
      </div>
    </div>
  );
};

export default TeamHooperIndex;
