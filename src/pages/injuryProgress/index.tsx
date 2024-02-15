import { NextPage } from "next";
import Layout from "@/components/layout";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { useState } from "react";
import DatePickerComponent from "@/components/common/datepicker";
import { xAxisData, seriesData, yAxisIds } from "@/constants/injuryProgress";

const InjuryProgress: NextPage = () => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [searchYear, setSearchYear] = useState<Date | null>(null);

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
                seriesData={seriesData}
                yAxisIds={yAxisIds}
                height={350}
                margin={{ left: 100, right: 20 }}
              />
            </div>
            <div className="divide-y-2">
              <div className="h-[82px] flex items-center space-x-1 border-t-2">
                <div className="w-[118px] h-[42px] text-center flex flex-col bg-[#CAD5EB]                      ] space-y-1">
                  <span className="text-[14px] font-[700]">오버트레이닝</span>
                  <span className="text-[10px] font-[400]">
                    비접촉(non-contact)부상
                  </span>
                </div>
                <div className="flex flex-1">
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[118px] h-[42px] text-center flex flex-col bg-[#FFE177] space-y-1">
                  <span className="text-[14px] font-[700]">부상</span>
                  <span className="text-[10px] font-[400]">
                    접촉(contact)부상
                  </span>
                </div>
                <div className="flex flex-1">
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[118px] h-[50px] text-center flex flex-col bg-[#D9D9D9]">
                  <span className="text-[14px] font-[700]">질병</span>
                  <span className="text-[10px] font-[400]">
                    스포츠 부상 및 손상 외 질병
                    <br />
                    (e.x.,감기,장염,식중독 등)
                  </span>
                </div>
                <div className="flex flex-1">
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, idx) => (
                    <div key={idx} className="text-center w-1/12 text-[14px]">
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[82px] flex items-center space-x-1">
                <div className="w-[118px] h-[25px] text-center flex flex-col border-[#f00] border space-y-1">
                  <span className="text-[14px] font-[700]">선수인원</span>
                </div>
                <div className="flex flex-1">
                  {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((el, idx) => (
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
