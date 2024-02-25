import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { cls } from "@/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { data, error } = useSWR("/admin/coach", { dedupingInterval: 100000 });

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  if (!data) return;

  return (
    <div className="flex relative min-w-[1080px]">
      <div className="flex flex-col flex-1 h-screen bg-[#C7E19B] fixed w-full py-10 pl-5">
        <div className="pl-2">
          <Image
            src="/icons/logo_layout.svg"
            width={161}
            height={70}
            priority
            alt="로고 이미지"
          />
        </div>
        <div className="flex flex-col space-y-2 py-10 pl-12">
          <Image
            loader={imageLoader}
            src={data?.profile || "/images/profile_default.svg"}
            width={0}
            height={0}
            priority
            alt="프로필 이미지"
            style={{ width: "81px", height: "auto", borderRadius: "46px" }}
          />
          <div className="flex items-center pl-5 space-x-2">
            <span className="font-[700] text-[14px]">{data?.name}</span>
            <Link href="/myInfo">
              <div className="cursor-pointer">
                <Image
                  loader={imageLoader}
                  src="/icons/edit_white.svg"
                  width={0}
                  height={0}
                  priority
                  alt="dashboard click icon"
                  style={{
                    width: "19px",
                    height: "auto",
                  }}
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-col pl-1">
            <span className="text-[11px] font-[400] pl-3">
              {data?.teamName}
            </span>
            <span className="text-[11px] font-[400]">
              소속인원수 :{" "}
              {data?.memberCnt < 10 ? `0${data?.memberCnt}` : data?.memberCnt}명
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <Link href="/dashboard">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/dashboard" ||
                  router.pathname.startsWith("/dashboard/") ||
                  router.pathname === "/myInfo"
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/dashboard" ||
                router.pathname === "/myInfo" ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/dashboard.svg"
                    width={0}
                    height={0}
                    priority
                    alt="dashboard click icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/dashboard_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="dashboard unclick icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/dashboard" ||
                    router.pathname === "/myInfo"
                    ? "text-black"
                    : "text-white"
                )}
              >
                대시보드
              </div>
            </div>
          </Link>
          <Link href="/schedule">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/schedule" ||
                  router.pathname.startsWith("/schedule/")
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/schedule" ||
                router.pathname.startsWith("/schedule/") ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/schedule.svg"
                    width={0}
                    height={0}
                    priority
                    alt="schedule click icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/schedule_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="schedule unclick icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/schedule" ||
                    router.pathname.startsWith("/schedule/")
                    ? "text-black"
                    : "text-white"
                )}
              >
                일정관리
              </div>
            </div>
          </Link>
          <Link href="/report">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/report" ||
                  router.pathname.startsWith("/report/")
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/report" ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/report.svg"
                    width={0}
                    height={0}
                    priority
                    alt="report click icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/report_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="report unclick icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/report" ? "text-black" : "text-white"
                )}
              >
                리포트
              </div>
            </div>
          </Link>
          <Link href="/privateData">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/privateData" ||
                  router.pathname.startsWith("/privateData/")
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/privateData" ||
                router.pathname.startsWith("/privateData/") ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/privateData.svg"
                    width={0}
                    height={0}
                    priority
                    alt="privateData click icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/privateData_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="privateData unclick icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/privateData" ||
                    router.pathname.startsWith("/privateData/")
                    ? "text-black"
                    : "text-white"
                )}
              >
                개인 데이터
              </div>
            </div>
          </Link>
          <Link href="/injuryProgress">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/injuryProgress" ||
                  router.pathname.startsWith("/injuryProgress/")
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/injuryProgress" ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/injuryProgress.svg"
                    width={0}
                    height={0}
                    priority
                    alt="injuryProgress click icon"
                    style={{
                      width: "25px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/injuryProgress_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="injuryProgress unclick icon"
                    style={{
                      width: "25px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/injuryProgress"
                    ? "text-black"
                    : "text-white"
                )}
              >
                부상추이
              </div>
            </div>
          </Link>
          <Link href="/player">
            <div
              className={cls(
                "flex items-center space-x-5 py-4 px-6 cursor-pointer rounded-tl-xl rounded-bl-xl",
                router.pathname === "/player" ||
                  router.pathname.startsWith("/player/")
                  ? "bg-white"
                  : ""
              )}
            >
              <div>
                {router.pathname === "/player" ? (
                  <Image
                    loader={imageLoader}
                    src="/icons/player.svg"
                    width={0}
                    height={0}
                    priority
                    alt="player click icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                ) : (
                  <Image
                    loader={imageLoader}
                    src="/icons/player_white.svg"
                    width={0}
                    height={0}
                    priority
                    alt="player unclick icon"
                    style={{
                      width: "24px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
              <div
                className={cls(
                  "text-[14px] font-[700]",
                  router.pathname === "/player" ? "text-black" : "text-white"
                )}
              >
                선수관리
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col absolute bottom-20 left-14">
          <div className="flex space-x-3 items-center">
            <span className="text-white text-[10px]">언어</span>
            <span className="text-white text-[10px]">:</span>
            <select className="border-none h-7 text-[10px] text-left pr-6 py-0 bg-[#C7E19B] text-white focus:ring-0 layout_select">
              <option value="korean" className="">
                한국어
              </option>
              <option value="english" className="">
                영어
              </option>
            </select>
          </div>
          <div className="flex items-center space-x-10 text-white text-[10px]">
            <span className="cursor-pointer">공지사항</span>
            <span className="cursor-pointer">FAQ</span>
          </div>
        </div>
      </div>
      <div className="ml-[220px] w-full h-screen overflow-y-auto bg-white rounded-tl-[40px] rounded-bl-[40px] px-[78px] py-[46px] relative z-30">
        {children}
      </div>
    </div>
  );
};

export default Layout;
