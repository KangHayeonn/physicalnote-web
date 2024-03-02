import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { getTimeFormat } from "@/utils/strFormat";
import { todayTrainingPlanSelector } from "@/recoil/dashboard/dashboardState";
import { TodayTrainingPlanInfoType } from "@/types/dashboard";

const TodayTrainingPlan = () => {
  const router = useRouter();
  const todayTrainingPlan = useRecoilValue(todayTrainingPlanSelector);
  const [trainingPlan, setTrainingPlan] = useState<TodayTrainingPlanInfoType[]>(
    []
  );

  const goUpdateSchedule = (id: number) => {
    router.push(`/schedule/create/${id}`);
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
            <Image
              src="/images/alert.svg"
              width={17}
              height={17}
              alt="alert icon"
            />
          </span>
        </button>
      </div>
      {trainingPlan.length !== 0 ? (
        <div>
          <div className="grid grid-cols-2 space-x-10">
            <div className="flex space-x-8">
              <div className="w-[255px]">
                <span className="text-[15px] font-[700]">■ 시간</span>
              </div>
              <div className="w-[175px]">
                <span className="text-[15px] font-[700]">■ 장소</span>
              </div>
            </div>
            <div>
              <span className="text-[15px] font-[700]">■ 훈련상세계획</span>
            </div>
          </div>
          <div className="h-[230px] overflow-y-scroll space-y-3 py-3 px-2">
            {trainingPlan.map((el, idx) => (
              <div key={`plan${idx}`} className="grid grid-cols-2 space-x-10">
                <div className="flex space-x-8">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col justify-between space-y-10 h-full">
                      <div className="w-[255px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                        <div className="w-[90px] overflow-hidden overflow-ellipsis">
                          <div className="w-full line-clamp-1">
                            {el.categoryName}
                          </div>
                        </div>{" "}
                        - {getTimeFormat(el.startTime)}~
                        {getTimeFormat(el.endTime)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col justify-between space-y-10 h-full">
                      <div className="w-[195px] h-[42px] px-[20px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden overflow-ellipsis">
                        <div className="w-full line-clamp-1">{el.address}</div>
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
