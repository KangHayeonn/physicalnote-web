import { NextPage } from "next";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import { BarChart } from "@mui/x-charts";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { useState } from "react";
import DatePickerComponent from "@/components/common/datepicker";

const InjuryProgress: NextPage = () => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [searchYear, setSearchYear] = useState<Date | null>(null);

  const xAxisData = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const seriesData = [
    {
      type: "bar",
      // id: "revenue",
      yAxisKey: "money",
      data: [4, 20, 12, 25],
      color: "#4e79a7",
    },
    {
      type: "bar",
      // id: "revenue",
      yAxisKey: "money",
      data: [4, 10, 20, 18],
      color: "#efefef",
    },
    {
      type: "line",
      // id: 'cookies',
      yAxisKey: "quantities",
      data: [1, 6, 4, 5],
    },
    {
      type: "bar",
      // id: 'icecream',
      yAxisKey: "quantities",
      data: [1, 6, 4, 5],
      color: "#C6E19B",
    },
  ];

  const yAxisIds = [{ id: "money" }, { id: "quantities" }];

  return (
    <Layout>
      <div className="flex items-center space-x-[30px]">
        <h1 className="text-[28px] font-[700]">부상추이</h1>
        <DatePickerComponent calendarType="year" changeYear={setSearchYear} />
      </div>
      <div className="my-2 w-full grid">
        <div className="grid-cols-12">
          <AxisWithComposition
            xAxisData={xAxisData}
            seriesData={seriesData}
            yAxisIds={yAxisIds}
            height={350}
            margin={{ left: 120, right: 0 }}
          />
        </div>
        {!isPlayer ? (
          <div className="divide-y-2">
            <div className="h-[82px] flex items-center space-x-1 border-t-2">
              <div className="w-[118px] h-[42px] text-center flex flex-col bg-[#CAD5EB]                      ] space-y-1">
                <span className="text-[14px] font-[500]">오버트레이닝</span>
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
                <span className="text-[14px] font-[500]">부상</span>
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
                <span className="text-[14px] font-[500]">질병</span>
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
              <div className="w-[118px] h-[20px] text-center flex flex-col border-[#f00] border space-y-1">
                <span className="text-[14px] font-[500]">선수인원</span>
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
