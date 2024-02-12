import React from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

const MyInfo: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const goChangePassword = () => {
    router.push("/changePassword");
  };

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="flex items-center space-x-[30px]">
        <h1 className="text-[28px] font-[700]">내정보</h1>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-4"
      >
        <div className="flex items-center justify-start space-x-10 py-10">
          <div className="w-[92px] h-[92px] rounded-[46px] bg-[#D9D9D9] flex justify-center items-center cursor-pointer">
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.9217 50.2878C47.9217 46.987 47.9217 45.3366 47.5143 43.9936C46.5971 40.9698 44.2309 38.6036 41.2071 37.6864C39.8641 37.279 38.2137 37.279 34.9129 37.279H23.0866C19.7858 37.279 18.1353 37.279 16.7924 37.6864C13.7686 38.6036 11.4024 40.9698 10.4851 43.9936C10.0778 45.3366 10.0778 46.987 10.0778 50.2878M39.6434 18.357C39.6434 24.2353 34.8781 29.0006 28.9997 29.0006C23.1214 29.0006 18.3561 24.2353 18.3561 18.357C18.3561 12.4787 23.1214 7.71338 28.9997 7.71338C34.8781 7.71338 39.6434 12.4787 39.6434 18.357Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-[16px] font-[500]">이름 : 홍길동</p>
            <p className="text-[16px] font-[500]">회원번호 : 023030</p>
            <div onClick={goChangePassword}>
              <span className="text-[14px] text-[#B9B9C3] cursor-pointer hover:text-[#9F9F9F]">
                비밀번호 변경
              </span>
            </div>
            {/*<span className="text-[#8DBE3D] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
              이용중
              </span>*/}
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">아이디</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("id")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">회원 가입일</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("joinDate")}
              />
            </div>
          </div>
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">이메일</span>
              <input
                type="email"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("email")}
              />
            </div>
            <div className="relative flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">등록된 소속</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("team")}
              />
              <div className="absolute right-3 top-[30px] flex space-x-2">
                <button
                  type="button"
                  className="text-[#B9B9C3] text-[12px] font-[700] py-1 w-[80px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                >
                  변경요청중
                </button>
                <button
                  type="button"
                  className="text-[#B9B9C3] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">휴대폰</span>
              <input
                type="number"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">소속 인원</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                {...register("member")}
              />
            </div>
          </div>
          <div className="flex space-x-10">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="text-[14px] font-[700]">생년월일</span>
                <input
                  type="text"
                  className="w-[215px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                  {...register("birth")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-[14px] font-[700]">성별</span>
                <input
                  type="text"
                  className="w-[215px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                  {...register("gender")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[930px] pt-16 flex justify-end space-x-2">
          <button
            type="button"
            className="text-[#B9B9C3] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            취소
          </button>
          <button
            type="submit"
            className="text-[#8DBE3D] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            저장
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default MyInfo;
