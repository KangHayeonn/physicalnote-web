import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { getTimeFormat } from "@/utils/strFormat";
import { todayTrainingPlanSelector } from "@/recoil/dashboard/dashboardState";
import { TodayTrainingPlanInfoType } from "@/types/dashboard";

const TodayTrainingPlan = () => {
  const todayTrainingPlan = useRecoilValue(todayTrainingPlanSelector);
  const [trainingPlan, setTrainingPlan] = useState<TodayTrainingPlanInfoType[]>(
    []
  );

  const goUpdateSchedule = (id: number) => {
    // todo : 일정 관리 수정 페이지 이동
  };

  useEffect(() => {
    if (todayTrainingPlan) {
      setTrainingPlan(todayTrainingPlan);
    }
  }, [todayTrainingPlan]);

  return (
    <div className="flex flex-col col-span-7 space-y-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-[20px] font-[500]">훈련계획</h2>
        <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[133px] h-[25px] flex justify-center items-center space-x-2">
          <span className="text-[12px] text-[#8DBE3D] font-[400]">
            일정 알림 보내기
          </span>
          <span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.70833C0 5.31944 0.309028 4.04514 0.927083 2.88542C1.54514 1.72569 2.375 0.763889 3.41667 0L4.39583 1.33333C3.5625 1.94444 2.89931 2.71528 2.40625 3.64583C1.91319 4.57639 1.66667 5.59722 1.66667 6.70833H0ZM15 6.70833C15 5.59722 14.7535 4.57639 14.2604 3.64583C13.7674 2.71528 13.1042 1.94444 12.2708 1.33333L13.25 0C14.2917 0.763889 15.1215 1.72569 15.7396 2.88542C16.3576 4.04514 16.6667 5.31944 16.6667 6.70833H15ZM1.66667 14.2083V12.5417H3.33333V6.70833C3.33333 5.55556 3.68056 4.53125 4.375 3.63542C5.06945 2.73958 5.97222 2.15278 7.08333 1.875V1.29167C7.08333 0.944444 7.20486 0.649306 7.44792 0.40625C7.69097 0.163194 7.98611 0.0416667 8.33333 0.0416667C8.68056 0.0416667 8.9757 0.163194 9.21875 0.40625C9.46181 0.649306 9.58333 0.944444 9.58333 1.29167V1.875C10.6944 2.15278 11.5972 2.73958 12.2917 3.63542C12.9861 4.53125 13.3333 5.55556 13.3333 6.70833V12.5417H15V14.2083H1.66667ZM8.33333 16.7083C7.875 16.7083 7.48264 16.5451 7.15625 16.2188C6.82986 15.8924 6.66667 15.5 6.66667 15.0417H10C10 15.5 9.83681 15.8924 9.51042 16.2188C9.18403 16.5451 8.79167 16.7083 8.33333 16.7083ZM5 12.5417H11.6667V6.70833C11.6667 5.79167 11.3403 5.00694 10.6875 4.35417C10.0347 3.70139 9.25 3.375 8.33333 3.375C7.41667 3.375 6.63195 3.70139 5.97917 4.35417C5.32639 5.00694 5 5.79167 5 6.70833V12.5417Z"
                fill="#8DBE3D"
              />
            </svg>
          </span>
        </button>
      </div>
      {trainingPlan.length !== 0 ? (
        <div>
          <div className="grid grid-cols-2 space-x-10 px-3">
            <div className="flex space-x-8">
              <div className="w-[255px]">
                <span className="text-[15px] font-[400]">■ 시간</span>
              </div>
              <div className="w-[175px]">
                <span className="text-[15px] font-[400]">■ 장소</span>
              </div>
            </div>
            <div>
              <span className="text-[15px] font-[400]">■ 훈련상세계획</span>
            </div>
          </div>
          <div className="h-[230px] overflow-y-scroll space-y-3 p-3">
            {trainingPlan.map((el, idx) => (
              <div key={`plan${idx}`} className="grid grid-cols-2 space-x-10">
                <div className="flex space-x-8">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col justify-between space-y-10 h-full">
                      <div className="w-[255px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                        {el.categoryName} - {getTimeFormat(el.startTime)}~
                        {getTimeFormat(el.endTime)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col justify-between space-y-10 h-full">
                      <div className="w-[195px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                        {el.address}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-8 space-x-8">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="w-full py-[10px] px-[20px] text-[15px] font-[400] flex-1 flex justify-start items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden overflow-ellipsis">
                        <div className="w-full line-clamp-3">{el.content}</div>
                      </div>
                      <button
                        className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
                        type="button"
                        onClick={() => goUpdateSchedule(el.id)}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-[400]">
          오늘 일정이 없습니다.
        </div>
      )}
    </div>
  );
};

export default TodayTrainingPlan;
