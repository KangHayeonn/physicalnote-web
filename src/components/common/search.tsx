import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { cls } from "../../libs/commons/utils";

interface SearchProps {
  title?: string;
}

interface validType {
  searchType: string;
  searchCategory: string;
  searchName: string;
  searchPosition: string;
}

const Search = ({ title }: SearchProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<validType>();

  // 검색 클릭 로직
  const onValid = (data: validType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col pt-6 space-y-2"
    >
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <h2 className={cls("text-[22px] font-[600] text-left")}>{title}</h2>
          <select
            defaultValue=""
            className="w-[160px] h-[36px] rounded-[5px] border-none text-center py-0 text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
            {...register("searchType")}
          >
            <option value="">구분</option>
            <option value="all">전체</option>
            <option value="first">1군</option>
            <option value="second">2군</option>
            <option value="injury">부상자</option>
          </select>
          <select
            defaultValue=""
            className="w-[160px] h-[36px] rounded-[5px] border-none text-center py-0 text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
            {...register("searchCategory")}
          >
            <option value="">카테고리</option>
            <option value="name">선수이름</option>
            <option value="age">나이</option>
            <option value="tel">전화번호</option>
            <option value="position">포지션</option>
          </select>
          <input
            {...register("searchName")}
            className="w-[195px] h-[36px] rounded-[5px] border-none py-0 placeholder:text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-center focus:ring-0 focus:border-none]"
            type="text"
            placeholder="검색어를 입력하세요."
          />
          <button
            type="submit"
            className="bg-white border-[#ededed] text-[#8DBE3D] px-[16px] h-[36px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <select
          defaultValue=""
          className="w-[195px] h-[36px] rounded-[5px] border-none py-0 text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-center focus:ring-0 focus:border-none"
          {...register("searchPosition")}
        >
          <option value="">소속변경</option>
          <option value="first">1군</option>
          <option value="second">2군</option>
          <option value="injury">부상자</option>
        </select>
        <button
          type="button"
          className="bg-white border-[#ededed] text-[#8DBE3D] px-[16px] h-[36px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
        >
          변경
        </button>
      </div>
    </form>
  );
};

export default Search;
