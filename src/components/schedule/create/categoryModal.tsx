import React, { useState } from "react";
import Image from "next/image";
import ModalForm from "@/components/common/modal/modalForm";
import Button from "@/components/common/button";

const CategoryModal = () => {
  const [name, setName] = useState<string>("");
  const [textCnt, setTextCnt] = useState<number>(0);

  const getTextCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setName(value);
      setTextCnt(value.length);
    }
  };

  return (
    <ModalForm>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="text-[15px]">목록 이름</div>
          <div className="relative">
            <input
              type="text"
              value={name}
              placeholder="목록 이름을 입력하세요."
              className="w-full h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0 text-[16px]"
              onChange={getTextCnt}
              maxLength={10}
            />
            <div className="absolute top-2 right-4 text-[14px] text-[#B9B9C3] font-[400]">
              <span>{textCnt}</span>
              <span>/10</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-[15px]">목록 색상</div>
          <div className="flex space-x-2 px-1">
            <div className="w-[35px] h-[35px] rounded-[50%] bg-[#CAD5EB] flex justify-center items-center">
              <Image
                src="/icons/checked.svg"
                width={0}
                height={0}
                alt="checked icon"
                style={{ width: "16px", height: "auto" }}
              />
            </div>
            <div className="w-[35px] h-[35px] rounded-[50%] bg-[#CAD5EB]"></div>
            <div className="w-[35px] h-[35px] rounded-[50%] bg-[#CAD5EB]"></div>
          </div>
        </div>
        <div className="h-[35px] flex justify-between items-end">
          <div>
            <Button
              text="삭제"
              type="button"
              classnames="text-[12px] h-[30px] px-4 text-[#FF0000] font-[700]"
            />
          </div>
          <div className="flex space-x-4">
            <Button
              text="취소"
              type="button"
              classnames="text-[12px] h-[30px] px-4 text-[#8DBE3D] font-[700]"
            />
            <Button
              text="저장"
              type="button"
              classnames="text-[12px] h-[30px] px-4 text-[#8DBE3D] font-[700]"
            />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default CategoryModal;
