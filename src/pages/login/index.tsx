import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/common/input";
import { LoginFormType } from "@/types/login";
import Api from "@/api/login";
import {
  setAccessToken,
  setLoginId,
  setName,
  setUserId,
  setRole,
} from "@/utils/tokenControl";
import { showToast } from "@/utils";
import cookie from "react-cookies"; // client 일 경우

const schema = yup.object({
  email: yup
    .string()
    .email("바른 이메일 양식을 입력해주세요.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*,.?])[A-Za-z\d!@#$%^&*,.?]{8,}$/,
      "영문+특수문자+숫자를 포함한 8자 이상"
    )
    .required("비밀번호를 입력해주세요."),
});

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onValid = async ({ email, password }: LoginFormType) => {
    await Api.v1Login({
      loginId: email,
      password: password,
      type: "IDPW",
    })
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const { token, userId, loginId, name, role } = data;
          setAccessToken(token);
          setUserId(userId);
          setLoginId(loginId);
          setName(name);
          setRole(role);
          cookie.save("token", token, {path:"/"}); // 모든 페이지에서 쿠키 접근 가능
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          showToast("로그인 정보가 잘못되었습니다.");
        }
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
        className="flex flex-col items-center space-y-10"
      >
        <Image
          src="/icons/logo.svg"
          width={212}
          height={84}
          priority
          alt="로고 이미지"
        />
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col">
            <Input
              classnames="w-[335px] h-[56px] border-[#CBCCCD] placeholder:text-[#B2B3B5] rounded-3xl shadow-md"
              type="email"
              placeholder="이메일 주소를 입력하세요."
              register={register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm pt-2 pl-3">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <Input
              classnames="w-[335px] h-[56px] border-[#CBCCCD] placeholder:text-[#B2B3B5] rounded-3xl shadow-md"
              type="password"
              placeholder="비밀번호를 입력하세요."
              register={register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm pt-2 pl-3">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <button
          className="rounded-[25px] text-white w-[335px] h-[56px] border-[#8DBE3D] bg-[#C7E19B] shadow-sm border hover:bg-[#8DBE3D]"
          type="submit"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
