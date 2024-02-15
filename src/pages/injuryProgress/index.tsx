import React, { useState, useEffect, useCallback } from "react";
import { NextPage } from "next";
import Layout from "@/components/layout";
import AxisWithComposition from "@/components/common/axisWithComposition";
import DatePickerComponent from "@/components/common/datepicker";
import { xAxisData, seriesData, yAxisIds } from "@/constants/injuryProgress";
import Api from "@/api/injuryProgress";
import { injuryProgressResponseType } from "@/types/injuryProgress";
import { SeriesDataType } from "@/types/chart";

const InjuryProgress: NextPage = () => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [searchYear, setSearchYear] = useState<Date | null>(new Date());
  const [progressData, setProgressData] =
    useState<SeriesDataType[]>(seriesData);

  const getInjuryProgress = useCallback(async () => {
    const year = searchYear?.getFullYear().toString();

    if (year) {
      await Api.v1GetInjuryProgress(year).then((res) => {
        const result = res.data;

        if (result) {
          const tempNonContactCnt: Array<number> = [];
          const tempContactCnt: Array<number> = [];
          const tempTotalCount: Array<number> = [];
          const tempDiseaseCnt: Array<number> = [];

          result.map((el: injuryProgressResponseType) => {
            tempNonContactCnt.push(el.nonContactCnt);
            tempContactCnt.push(el.contactCnt);
            tempTotalCount.push(el.totalCount);
            tempDiseaseCnt.push(el.diseaseCnt);
          });

          setIsPlayer(!tempTotalCount.some((el) => el !== 0));

          setProgressData([
            { ...progressData[0], data: tempNonContactCnt },
            { ...progressData[1], data: tempContactCnt },
            { ...progressData[2], data: tempTotalCount },
            { ...progressData[3], data: tempDiseaseCnt },
          ]);
        }
      });
    }
  }, [searchYear]);

  useEffect(() => {
    getInjuryProgress();
  }, [searchYear]);

  return (
    <Layout>
      <div className="flex items-center space-x-[30px]">
        <h1 className="text-[28px] font-[700]">부상추이</h1>
        <DatePickerComponent calendarType="year" changeYear={setSearchYear} />
      </div>
      <div className="my-2 w-full grid">
        {!isPlayer ? (
          <>
            <div className="grid-cols-12">
              <AxisWithComposition
                xAxisData={xAxisData}
                seriesData={progressData}
                yAxisIds={yAxisIds}
                height={350}
                margin={{ left: 80, right: 60 }}
              />
            </div>
            <div className="divide-y-2">
              <div className="h-[82px] flex items-center space-x-1 border-t-2">
                <div className="w-[130px] h-[42px] text-center flex flex-col bg-[#CAD5EB] space-y-1">
                  <span className="text-[14px] font-[700]">오버트레이닝</span>
                  <span className="text-[10px] font-[400]">
                    비접촉(non-contact)부상
                  </span>
                </div>
                <div className="flex flex-1">
                  {progressData[0].data.map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[130px] h-[42px] text-center flex flex-col bg-[#FFE177] space-y-1">
                  <span className="text-[14px] font-[700]">부상</span>
                  <span className="text-[10px] font-[400]">
                    접촉(contact)부상
                  </span>
                </div>
                <div className="flex flex-1">
                  {progressData[1].data.map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[130px] h-[50px] text-center flex flex-col bg-[#D9D9D9]">
                  <span className="text-[14px] font-[700]">질병</span>
                  <span className="text-[10px] font-[400]">
                    스포츠 부상 및 손상 외 질병
                    <br />
                    (e.x.,감기,장염,식중독 등)
                  </span>
                </div>
                <div className="flex flex-1">
                  {progressData[3].data.map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[130px] h-[25px] text-center flex flex-col border-[#f00] border space-y-1">
                  <span className="text-[14px] font-[700]">선수인원</span>
                </div>
                <div className="flex flex-1">
                  {progressData[2].data.map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-[250px] justify-center items-center text-[14px] font-[400]">
            등록된 선수가 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InjuryProgress;
