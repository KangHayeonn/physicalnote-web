"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SearchFormPreview from "@/components/common/searchFormPreview";
// recoil
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  addressKeywordSelector,
  searchAddressSelector,
} from "@/recoil/search/searchState";
import { AddressResponseType } from "@/types/schedule";

export interface SearchProps {
  placeholder?: string | undefined;
  height?: number | undefined;
  search?: string | undefined; // 검색어 저장
  searchPreviewList?: Array<AddressResponseType> | undefined;
  searchByAddress?: () => void;
}

const SearchForm = ({
  placeholder,
  search,
  searchPreviewList,
  searchByAddress,
  ...props
}: SearchProps) => {
  const previewDivRef = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchWrap = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [previewIdx, setPreviewIdx] = useState<number>(-1);

  // recoil
  const [searchKeyword, setSearchKeyword] = useRecoilState(
    addressKeywordSelector
  );
  const setSearchAddress = useSetRecoilState(searchAddressSelector);
  const resetSearchKeyword = useResetRecoilState(addressKeywordSelector);

  const onFocusSearch = () => {
    setIsFocus(true);
    resetSearchKeyword();
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const clickWrap = (e: MouseEvent) => {
    if (
      document.activeElement !== searchInput.current &&
      !searchWrap.current?.contains(e.target as Node)
    ) {
      setIsFocus(false);
    }
  };

  const handleKeyArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        setPreviewIdx(previewIdx + 1);
        if (searchPreviewList && searchPreviewList?.length - 1 === previewIdx) {
          setPreviewIdx(0);
        }
        break;
      case "ArrowUp":
        setPreviewIdx(previewIdx - 1);
        if (previewIdx <= 0) {
          setPreviewIdx(-1);
        }
        break;
      case "Escape":
        setPreviewIdx(-1);
        break;
      case "Enter":
        if (searchPreviewList) changeSearchItem(searchPreviewList[previewIdx]);
        break;
      default:
        break;
    }
  };

  const changeSearchItem = (item: AddressResponseType) => {
    if (!item) return;
    setSearchKeyword(item?.roadAddress);
    setSearchAddress(item);
    setIsFocus(false);
    setPreviewIdx(-1);
  };

  useEffect(() => {
    document.addEventListener("click", clickWrap);
  }, []);

  return (
    <section ref={searchWrap} className="relative w-[684px] h-[36px]">
      <div className="absolute w-full flex flex-col items-center rounded-[3px]">
        <div className="flex items-center w-full h-[36px]">
          <input
            type="text"
            value={searchKeyword}
            placeholder={placeholder || "일정 위치를 입력하세요."}
            onChange={onChangeSearch}
            onFocus={onFocusSearch}
            onKeyDown={(e) => handleKeyArrow(e)}
            className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
            {...props}
          />
        </div>
        {isFocus ? (
          <SearchFormPreview
            searchList={searchPreviewList}
            selectedIdx={previewIdx}
            isOpen={setIsFocus}
            ulRef={previewDivRef}
          />
        ) : null}
      </div>
    </section>
  );
};

export default SearchForm;
