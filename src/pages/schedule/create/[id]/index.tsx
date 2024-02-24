import React, { useState, useMemo } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "@/components/layout";
import Button from "@/components/common/button";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import DropDown from "@/components/common/dropdown";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { useSetRecoilState } from "recoil";
import { searchPlayerGraderState } from "@/recoil/search/searchState";
import { PlayerSimpleResponseType } from "@/types/schedule";
import DatePickerComponent from "@/components/common/datepicker";
import TimePickerComponent from "@/components/common/timepicker";

const CreateSchedule: NextPage = () => {
  const setSearchGrader = useSetRecoilState(searchPlayerGraderState);
  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };

  const [title, setTitle] = useState<string>("");
  const [titleTextCnt, setTitleTextCnt] = useState<number>(0);
  const [data, setData] = useState<PlayerSimpleResponseType[]>([
    {
      id: 26,
      name: "김영건",
      phone: null,
      positions: ["공격수"],
      playerGrade: "1군",
    },
  ]);
  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(1);

  const getTitleTextCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 15) {
      setTitle(value);
      setTitleTextCnt(value.length);
    }
  };

  const columnData = [
    {
      Header: "선수이름",
      accessor: "name",
    },
    {
      Header: "전화번호",
      accessor: "phone",
    },
    {
      Header: "포지션",
      accessor: "position",
    },
    {
      Header: "소속",
      accessor: "playerGrade",
    },
  ];

  const columns = useMemo(() => columnData, []);

  const itemPerPage = 10;
  const totalItems = totalLen;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <Layout>
      <div className="flex items-center space-x-[30px]">
        <h1 className="text-[28px] font-[700]">일정관리222</h1>
        <DropDown
          dropDownList={searchCategoryList}
          changeText={onSearchGraderChange}
        />
      </div>
      <div className="flex mt-10 space-x-10">
        <div className="flex flex-col space-y-6 w-[624px]">
          <div className="flex items-center space-x-3">
            <h2 className="text-[20px] font-[700]">일정 기록하기</h2>
            <div className="cursor-pointer">
              <Image
                src="/images/star_checked.svg"
                width={0}
                height={0}
                alt="like button"
                style={{ width: "24px", height: "auto" }}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4 mt-2 mb-6">
              <div className="text-[#B9B9C3] text-[12px]">
                카테고리를 등록하세요.
              </div>
              <Button
                text="추가"
                type="button"
                classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
              />
            </div>
            <div className="flex items-center justify-between space-x-6 relative">
              <span className="w-10 font-[700] text-[15px]">이름</span>
              <input
                type="text"
                value={title}
                placeholder="일정 이름을 입력하세요."
                className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
                onChange={getTitleTextCnt}
                maxLength={15}
              />
              <div className="absolute right-4 bottom-2 text-[14px] text-[#B9B9C3] font-[400]">
                <span>{titleTextCnt}</span>
                <span>/15</span>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-6">
              <span className="w-10 font-[700] text-[15px]">위치</span>
              <input
                type="text"
                placeholder="일정 위치를 입력하세요."
                className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
              />
            </div>
            <div className="flex items-center justify-between space-x-6">
              <span className="w-10 font-[700] text-[15px]">시간</span>
              <div className="flex items-center space-x-2">
                <DatePickerComponent calendarType="date" />
                <div className="flex items-center space-x-1">
                  <TimePickerComponent />
                  <span>~</span>
                  <TimePickerComponent />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-6">
              <span className="w-10 font-[700] text-[15px]">선수</span>
              <input
                type="text"
                placeholder="선수를 선택하세요."
                className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
              />
            </div>
            <div className="flex items-center space-x-4 py-4">
              <span className="font-[700] text-[15px]">이미지첨부</span>
              <div className="flex items-center space-x-5">
                <div className="text-[12px]">0/3</div>
                <Button
                  text="추가"
                  type="button"
                  classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="font-[700] text-[15px]">훈련내용</span>
              <textarea
                placeholder="훈련 내용을 입력하세요."
                className="resize-none py-5 px-4 h-[324px] border-none shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] outline-none focus:border-transparent focus:ring-0 p-0 placeholder:text-[#CBCCCD]"
                maxLength={1000}
              ></textarea>
            </div>
            <div className="flex items-center space-x-2 justify-end py-4">
              <Button
                type="button"
                text="삭제"
                classnames="text-[#8DBE3D] text-[12px] font-[700]"
              />
              <Button
                type="submit"
                text="등록"
                classnames="text-[#8DBE3D] text-[12px] font-[700]"
              />
            </div>
          </div>
        </div>
        {data.length !== 0 ? (
          <div className="w-full mt-20 bg-white py-4 my-4 px-4 rounded-[4px]">
            <Table columns={columns} data={data || []} />
            <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePageChange}
              setPage={setPage}
              next={next}
              prev={prev}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full py-10 font-bold">
            선수 데이터가 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateSchedule;
