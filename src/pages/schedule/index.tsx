import { NextPage } from "next";
import Layout from "@/components/layout";
import CalendarComponents from "@/components/common/calendar";
import Link from "next/link";

const ManageSchedule: NextPage = () => {
  const events = [
    { title: "Meeting1", start: new Date("2023-12-29") },
    { title: "Meeting2", start: new Date("2023-12-30") },
  ];

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
        <div className="flex flex-col space-y-10 w-1/4">
          <h2 className="text-[20px] font-[500]">일정 기록하기</h2>
          <div className="h-[250px]">
            <div className="flex items-center space-x-2">
              <span>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="8" height="8" fill="black" />
                </svg>
              </span>
              <span>월간 주요 일정</span>
            </div>
            <div className="flex justify-center items-center h-full text-[15px]">
              월간 주요 일정이 없습니다.
            </div>
          </div>
          <div className="h-[250px]">
            <div className="flex items-center space-x-2">
              <span>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="8" height="8" fill="black" />
                </svg>
              </span>
              <span>오늘 일정</span>
            </div>
            <div className="flex flex-col justify-center items-center h-full space-y-4">
              <p className="text-[15px]">오늘 일정이 없습니다.</p>
              <Link href="/schedule/create">
                <button
                  type="button"
                  className="rounded-[5px] shadow-xl px-3 py-1 text-[12px] text-[#8DBE3D]"
                >
                  기록하기
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <CalendarComponents events={events} />
        </div>
      </div>
    </Layout>
  );
};

export default ManageSchedule;
