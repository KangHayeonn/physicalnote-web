import Button from "@/components/common/button";
import Layout from "@/components/layout";
import { NextPage } from "next";
import React from "react";

const CreateSchedule: NextPage = () => {
  return (
    <Layout>
      <div className="flex items-center space-x-[30px]">
        <h1 className="text-[28px] font-[700]">일정관리</h1>
        <select className="w-[127px] h-[25px] rounded-[5px] py-0 border-[#B9B9C3] text-[12px] font-[700] shadow-xl">
          <option value="">구분</option>
          <option value="first">1군</option>
          <option value="second">2군</option>
          <option value="second">부상자</option>
        </select>
      </div>
      <div className="flex mt-10 space-x-10">
        <div className="flex flex-col space-y-6 w-[40%]">
          <div className="flex items-center space-x-4">
            <h2 className="text-[20px] font-[500]">일정 기록하기</h2>
            <div className="cursor-pointer">
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.36328 8.06489L11.5736 2.1424C11.73 1.72346 12.3156 1.70475 12.4984 2.11286L15.1773 8.09443C15.2528 8.26306 15.4152 8.37629 15.5995 8.38889L21.6994 8.80584C22.1567 8.8371 22.3345 9.41582 21.9736 9.69836L17.1987 13.4369C17.0468 13.5558 16.9769 13.7515 17.019 13.9398L18.3558 19.9094C18.4502 20.3311 18.0014 20.6659 17.6242 20.4553L12.2437 17.4518C12.0922 17.3673 11.9078 17.3673 11.7563 17.4518L6.47504 20.3999C6.08316 20.6187 5.62384 20.2503 5.75224 19.8203L7.49805 13.973C7.55906 13.7687 7.48374 13.5481 7.31048 13.4238L2.13708 9.71082C1.75543 9.43691 1.92797 8.83554 2.39678 8.80563L8.92668 8.38905C9.12338 8.3765 9.29436 8.24956 9.36328 8.06489Z"
                  fill="#CBCCCD"
                  fillOpacity="0.3"
                  stroke="#CBCCCD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
                classnames="text-[12px] h-[25px] text-[#B9B9C3]"
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="w-10 font-[500] text-[15px]">이름</span>
              <input
                type="text"
                placeholder="일정 이름을 입력하세요."
                className="w-[484px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="w-10 font-[500] text-[15px]">위치</span>
              <input
                type="text"
                placeholder="일정 위치를 입력하세요."
                className="w-[484px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="w-10 font-[500] text-[15px]">시간</span>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                />
                <div className="flex items-center space-x-1">
                  <input
                    type="date"
                    className="h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                  />
                  <span>~</span>
                  <input
                    type="date"
                    className="h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="w-10 font-[500] text-[15px]">선수</span>
              <input
                type="text"
                placeholder="선수를 선택하세요."
                className="w-[484px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex items-center space-x-4 py-4">
              <span className="font-[500] text-[15px]">이미지첨부</span>
              <div className="flex items-center space-x-2">
                <div className="text-[12px]">0/3</div>
                <label
                  htmlFor="image"
                  className="py-1 px-3 text-[12px] text-[#8DBE3D] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] border cursor-pointer flex justify-center items-center"
                >
                  추가
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    // onChange={handleFileChange}
                    // disabled={uploading}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <span className="font-[500] text-[15px]">훈련내용</span>
              <textarea
                placeholder="훈련 내용을 입력하세요."
                className="resize-none py-5 px-4 h-[324px] border-none shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px]"
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
      </div>
    </Layout>
  );
};

export default CreateSchedule;
