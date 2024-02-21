import { useRouter } from "next/router";
import { useEffect } from "react";
import { cls } from "@/utils";
import DropDown from "@/components/common/dropdown";
import {
  searchCategoryList,
  searchFilterList,
} from "@/constants/mock/searchCategoryList";
import { SearchProps } from "@/types/common";
import { useRecoilState } from "recoil";
import {
  searchPlayerGraderState,
  searchCategoryState,
  searchKeywordState,
} from "@/recoil/search/searchState";

const Search = ({ title, onClickSubmit, resetPage }: SearchProps) => {
  const router = useRouter();
  const [searchGrader, setSearchGrader] = useRecoilState(
    searchPlayerGraderState
  );
  const [searchCategory, setSearchCategory] =
    useRecoilState(searchCategoryState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);

  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };

  const onSearchCategoryChange = (category: string) => {
    setSearchCategory(category);
  };

  const onSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const init = () => {
    setSearchGrader("ALL");
    setSearchCategory("");
    setSearchKeyword("");
  };

  // 검색 클릭 로직
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClickSubmit) onClickSubmit();
    if (resetPage) resetPage();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col py-6 space-y-2">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <h2 className={cls("text-[22px] font-[600] text-left")}>{title}</h2>
          <DropDown
            dropDownList={searchCategoryList}
            changeText={onSearchGraderChange}
          />
          <DropDown
            dropDownList={searchFilterList}
            text="카테고리"
            changeText={onSearchCategoryChange}
          />
          <input
            className="w-[195px] h-[36px] rounded-[5px] border-none py-0 placeholder:text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-center focus:ring-0 focus:border-none]"
            type="text"
            placeholder="검색어를 입력하세요."
            onChange={(e) => {
              onSearchKeywordChange(e.target.value);
            }}
          />
          <button
            type="button"
            className="bg-white border-[#ededed] text-[#8DBE3D] px-[16px] h-[36px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:font-[700]"
            onClick={handleSubmit}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
