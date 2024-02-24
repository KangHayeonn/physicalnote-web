import React from "react";
// recoil
import { useSetRecoilState } from "recoil";
import {
  addressKeywordSelector,
  searchAddressSelector,
} from "@/recoil/search/searchState";
import { AddressResponseType } from "@/types/schedule";

interface SearchPreviewProps {
  searchList?: Array<AddressResponseType> | undefined;
  selectedIdx: number;
  isOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  ulRef: React.RefObject<HTMLDivElement>;
}

const SearchFormPreview = ({
  searchList,
  selectedIdx = -1,
  isOpen,
  ulRef,
}: SearchPreviewProps) => {
  const setSearchKeyword = useSetRecoilState(addressKeywordSelector);
  const setSearchAddress = useSetRecoilState(searchAddressSelector);

  const changeSearchItem = (item: AddressResponseType) => {
    setSearchKeyword(item.title);
    setSearchAddress(item);
    if (isOpen) isOpen(false);
  };

  return (
    <div
      ref={ulRef}
      className="w-full max-h-[11rem] bg-[#fff] overflow-y-auto z-10 rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:ring-0 mt-1 p-2 "
    >
      <ul className="bg-transparent flex flex-col w-full">
        {searchList &&
          searchList?.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => changeSearchItem(item)}
                className="w-full h-[1.875rem] bg-transparent flex items-center px-[8px] py-[12px] cursor-pointer hover:bg-[#C6E19B] focus:bg-[#C6E19B] overflow-hidden overflow-ellipsis"
                style={{
                  backgroundColor: `${index === selectedIdx ? "#C6E19B" : "transparent"}`,
                }}
              >
                <div className="w-full line-clamp-1">{item.roadAddress}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchFormPreview;
