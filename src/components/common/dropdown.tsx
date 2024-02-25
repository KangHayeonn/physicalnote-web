import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import { DropDownProps, SearchCategoryType } from "@/types/common";

const DropDown = ({
  defaultText,
  text,
  dropDownList,
  changeText,
  ...props
}: DropDownProps) => {
  const menuInput = useRef<HTMLInputElement>(null);
  const menuWrap = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(text || defaultText || "구분");
  const [list, setList] =
    useState<Array<SearchCategoryType>>(searchCategoryList);

  const clickWrap = (e: MouseEvent) => {
    if (
      document.activeElement !== menuInput.current &&
      !menuWrap.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const changeItem = (item: SearchCategoryType) => {
    setTitle(item.value);
    if (changeText) changeText(item.key);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", clickWrap);
    dropDownList ? setList(dropDownList) : setList(searchCategoryList);

    return () => {
      document.removeEventListener("click", clickWrap);
    };
  }, [dropDownList]);

  return (
    <div
      ref={menuWrap}
      className="w-[160px] h-[36px] rounded-[5px] border-none flex flex-col justify-center relative py-0 text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
      {...props}
    >
      <button
        className="h-[1.875rem] flex flex-row justify-center items-center relative pr-12 pl-10 bg-transparent border-none text-[15px] font-[400] text-[#000]"
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
        <Image
          src={`${!isOpen ? "/images/arrow_down.svg" : "/images/arrow_up.svg"}`}
          width={13}
          height={13}
          alt="DropDown Button"
          className="w-[13px] h-[13px] absolute top-[10px] right-[13px]"
          priority
        />
      </button>
      {isOpen ? (
        <div className="w-[160px] max-h-[160px] bg-[#fff] flex flex-col absolute top-[45px] rounded-[5px] py-[5px] border-[#ededed] z-10 overflow-y-auto shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
          {list.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => changeItem(item)}
                className="flex justify-center text-[15px] text-[#000] px-[5px] py-[7px] hover:bg-[#C6E19B] cursor-pointer"
              >
                {item.value}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
