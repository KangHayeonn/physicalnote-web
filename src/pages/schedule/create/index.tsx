import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "@/components/layout";
import Button from "@/components/common/button";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import DropDown from "@/components/common/dropdown";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  addressKeywordSelector,
  searchPlayerGraderState,
} from "@/recoil/search/searchState";
import { AddressResponseType } from "@/types/schedule";
import DatePickerComponent from "@/components/common/datepicker";
import TimePickerComponent from "@/components/common/timepicker";
import ConfirmModal from "@/components/common/modal/confirmModal";
import Api from "@/api/schedule";
import SearchForm from "@/components/common/searchForm";
import CategoryForm from "@/components/schedule/create/categoryForm";
import PlayerForm from "@/components/schedule/create/playerForm";
import ImageForm from "@/components/schedule/create/imageForm";

const CreateSchedule: NextPage = () => {
  const setSearchGrader = useSetRecoilState(searchPlayerGraderState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(
    addressKeywordSelector
  );
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  const [initTime, setInitTime] = useState<string>("09:00");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("09:00");
  const [title, setTitle] = useState<string>("");
  const [titleTextCnt, setTitleTextCnt] = useState<number>(0);
  const [previewList, setPreviewList] = useState<Array<AddressResponseType>>(
    []
  );

  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };

  const init = () => {
    setSearchGrader("ALL");
  };

  useEffect(() => {
    init();
  }, []);

  const getTitleTextCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 15) {
      setTitle(value);
      setTitleTextCnt(value.length);
    }
  };

  const getSearchAddress = async () => {
    await Api.v1SearchAddress(searchKeyword).then((res) => {
      const { items } = res.data;
      setPreviewList([...items]);
    });
  };

  useEffect(() => {
    if (searchKeyword) getSearchAddress();
  }, [searchKeyword]);

  useEffect(() => {
    // date/time 저장
  }, [searchDate, startTime, endTime]);

  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">일정관리</h1>
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
                  src="/images/star_unchecked.svg"
                  width={0}
                  height={0}
                  alt="like button"
                  style={{ width: "24px", height: "auto" }}
                />
              </div>
            </div>
            <CategoryForm />
            <div className="flex flex-col space-y-2">
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
                <SearchForm
                  search={searchKeyword}
                  searchPreviewList={previewList}
                />
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">시간</span>
                <div className="flex items-center space-x-2">
                  <DatePickerComponent
                    calendarType="free"
                    initDate={initDate}
                    changeDate={setSearchDate}
                  />
                  <div className="flex items-center space-x-1">
                    <TimePickerComponent
                      initTime={initTime}
                      changeTime={setStartTime}
                    />
                    <span>~</span>
                    <TimePickerComponent
                      initTime={initTime}
                      changeTime={setEndTime}
                    />
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
              <ImageForm />
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
          <PlayerForm />
        </div>
      </Layout>
    </div>
  );
};

export default CreateSchedule;
