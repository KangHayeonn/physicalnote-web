import React, { useState } from "react";
import Image from "next/image";

interface ModalFormProps {
  onClickEvent?: () => void;
  children: JSX.Element;
}

const ModalForm = ({ onClickEvent, children }: ModalFormProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center z-999 fixed w-full h-full top-0 left-0 bg-[#000] bg-opacity-10">
      <div className="min-w-[500px]">
        <div className="h-[45px] rounded-t-xl relative bg-[#fff] px-[20px] border-[1px solid #0d3471]">
          <div
            className="absolute top-[18px] right-[20px] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClickEvent}
          >
            <Image
              src={isHovered ? "/icons/delete_hover.svg" : "/icons/delete.svg"}
              width={0}
              height={0}
              alt="delete icon"
              style={{ width: "15px", height: "auto" }}
            />
          </div>
        </div>
        <div className="w-full bg-[#fff] rounded-b-xl shadow-[1px 2px 4px rgba(0, 0, 0, 0.25)] px-6 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
