import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/common/input";
import { ChangePasswordFormType } from "@/types/myInfo";
import Api from "@/api/myInfo";
import { showToast } from "@/utils";

const schema = yup.object({
  recentPW: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*,.?])[A-Za-z\d!@#$%^&*,.?]{8,}$/,
      "영문+특수문자+숫자를 포함한 8자 이상"
    )
    .required("비밀번호를 입력해주세요."),
  changePW: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*,.?])[A-Za-z\d!@#$%^&*,.?]{8,}$/,
      "영문+특수문자+숫자를 포함한 8자 이상"
    )
    .required("비밀번호를 입력해주세요."),
  reChangePW: yup
    .string()
    .oneOf([yup.ref("changePW"), ""], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
});

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const goBack = () => {
    router.back();
  };

  const onValid = async ({
    recentPW,
    changePW,
    reChangePW,
  }: ChangePasswordFormType) => {
    await Api.v1ConfirmPassword(recentPW).then(async (res) => {
      const { status, data } = res;
      if (status === 200 && !data) {
        showToast("현재 비밀번호를 확인해주세요.");
        return;
      }

      await Api.v1ChangePassword({ changePW, reChangePW }).then((res) => {
        const { status } = res;
        if (status === 200) {
          showToast("비밀번호가 변경되었습니다.");
          router.replace("/myInfo");
        }
      });
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image
          src="/images/background_left.svg"
          width={1137}
          height={804}
          className="fixed top-0 left-0 -z-10"
          alt="왼쪽 상단 배경 이미지"
        />
        <Image
          src="/images/background_right.svg"
          width={1092}
          height={814}
          className="fixed bottom-0 right-0 -z-10"
          alt="오른쪽 상단 배경 이미지"
        />
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col items-center space-y-6"
      >
        <Image
          src="/icons/logo.svg"
          width={212}
          height={84}
          alt="로고 이미지"
        />
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label className="pl-3">현재 비밀번호</label>
            <Input
              classnames="w-[335px] h-[56px] border-[#CBCCCD] placeholder:text-[#B2B3B5] rounded-3xl shadow-md"
              type="password"
              placeholder="영문+특수문자+숫자를 포함한 8자 이상"
              register={register("recentPW")}
            />
            {errors.recentPW && (
              <p className="text-red-500 text-sm pl-3">
                {errors.recentPW.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="pl-3">변경할 비밀번호</label>
            <Input
              classnames="w-[335px] h-[56px] border-[#CBCCCD] placeholder:text-[#B2B3B5] rounded-3xl shadow-md"
              type="password"
              placeholder="영문+특수문자+숫자를 포함한 8자 이상"
              register={register("changePW")}
            />
            {errors.changePW && (
              <p className="text-red-500 text-sm pl-3">
                {errors.changePW.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              classnames="w-[335px] h-[56px] border-[#CBCCCD] placeholder:text-[#B2B3B5] rounded-3xl shadow-md"
              type="password"
              placeholder="비밀번호 확인"
              register={register("reChangePW")}
            />
            {errors.reChangePW && (
              <p className="text-red-500 text-sm pl-3">
                {errors.reChangePW.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-[335px] grid grid-cols-2 gap-4">
          <button
            className="rounded-[25px] text-white h-[56px] border-[#8DBE3D] bg-[#C7E19B] shadow-sm border hover:bg-[#8DBE3D]"
            type="button"
            onClick={goBack}
          >
            취소
          </button>
          <button
            className="rounded-[25px] text-white h-[56px] border-[#8DBE3D] bg-[#C7E19B] shadow-sm border hover:bg-[#8DBE3D]"
            type="submit"
          >
            확인
          </button>
        </div>
        <div onClick={goBack}>
          <span className="text-[14px] text-[#B9B9C3] cursor-pointer hover:text-[#9F9F9F]">
            다음에 변경하기
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
