import React from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@/components/layout";

const MyInfo: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR("/admin/coach", { dedupingInterval: 100000 });
  const { register, handleSubmit } = useForm();

  const goChangePassword = () => {
    router.push("/changePassword");
  };

  const goHome = () => {
    router.push("/dashboard");
  };

  const onValid = (data: any) => {
    // todo : my info update api
  };

  if (!data) return;

  return (
    <Layout>
      <div className="flex items-center space-x-[30px] min-w-[292px]">
        <h1 className="text-[28px] font-[700]">내정보</h1>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-4"
      >
        <div className="flex items-center justify-start space-x-10 py-10 min-w-[292px]">
          <div className="w-[92px] h-[92px] rounded-[46px] bg-[#D9D9D9] flex justify-center items-center cursor-pointer">
            <Image
              src="/images/profile_default.svg"
              width={116}
              height={116}
              priority
              alt="프로필 이미지"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-[16px] font-[500]">이름 : {data.name}</p>
            <p className="text-[16px] font-[500]">회원번호 : {data.id}</p>
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
                value={data.loginId}
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
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="text-[14px] font-[700]">생년월일</span>
                <input
                  type="text"
                  className="w-[215px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                  value={data.birthDate}
                  {...register("birth")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-[14px] font-[700]">성별</span>
                <input
                  type="text"
                  className="w-[215px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                  value={`${data.gender === "M" ? "남자" : "여자"}`}
                  {...register("gender")}
                />
              </div>
            </div>
            <div className="relative flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">등록된 소속</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                value={data.teamName}
                {...register("team")}
              />
              {/*<div className="absolute right-3 top-[30px] flex space-x-2">
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
              </div>*/}
            </div>
          </div>
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">휴대폰</span>
              <input
                type="number"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                value={data.cellPhone}
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-[14px] font-[700]">소속 인원</span>
              <input
                type="text"
                className="w-[445px] h-[40px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] border-none focus:ring-0"
                value={data.memberCnt}
                {...register("member")}
              />
            </div>
          </div>
        </div>
        <div className="w-[930px] pt-16 flex justify-between space-x-2">
          <div className="flex justify-start space-x-2">
            <button
              type="button"
              className="text-[#E82E25] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:scale-105"
            >
              탈퇴
            </button>
            <button
              type="submit"
              className="text-[#8DBE3D] text-[12px] font-[700] py-1 w-[68px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:scale-105"
            >
              로그아웃
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-[#B9B9C3] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:scale-105"
              onClick={goHome}
            >
              취소
            </button>
            <button
              type="submit"
              className="text-[#8DBE3D] text-[12px] font-[700] py-1 w-[58px] h-[25px] flex justify-center items-center rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:scale-105"
            >
              저장
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default MyInfo;
