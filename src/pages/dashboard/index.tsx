import { NextPage } from "next";
import Layout from "@/components/layout";
import Button from "@/components/common/button";
import DatePickerComponent from "@/components/common/datepicker";
import TeamCondition from "@/components/dashboard/teamCondition";
import TeamHooperIndex from "@/components/dashboard/teamHooperIndex";
import TeamInjury from "@/components/dashboard/teamInjury";
import TodayTrainingPlan from "@/components/dashboard/todayTrainingPlan";
import WeeklyWorkLoad from "@/components/dashboard/weeklyWorkLoad";
import TrainingBalance from "@/components/dashboard/trainingBalance";
import TeamNote from "@/components/dashboard/teamNote";
import TrainingLoadGraph from "@/components/dashboard/trainingLoadGraph";

const Dashboard: NextPage = () => {
  // X축 데이터와 seriesData를 생성합니다.
  // const xAxisData: Array<string> = [];
  // const seriesData: any = [];
  /*
  Object.keys(monthsData).forEach((month) => {
    const monthData = monthsData[month];

    for (let i = 1; i <= 4; i++) {
      xAxisData.push(`${month}-${i}주차`);
    }

    monthData.forEach((data: any) => {
      data.data.forEach((weekData, i) => {
        seriesData.push({
          type: data.type,
          yAxisKey: data.yAxisKey,
          data: [weekData],
          name: `${month}-${i + 1}주차`,
          color: data.color,
        });
      });
    });
  });*/

  return (
    <div className="min-w-[1920px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">대시보드</h1>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            text="2주전"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => {}}
          />
          <Button
            type="button"
            text="지난주"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => {}}
          />
          <Button
            type="button"
            text="오늘"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => {}}
          />
          <DatePickerComponent calendarType="date" initDate={new Date()} />
          <Button
            type="button"
            text="초기화"
            classnames="text-[#000] text-[13px] font-[700]"
            onClick={() => {}}
          />
        </div>
        <div className="space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-[20px] font-[500]">팀 컨디션</h2>
            <div className="grid grid-cols-12 space-x-10">
              <TeamCondition />
              <TeamHooperIndex />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-12 space-x-10">
              <TeamInjury />
              <TodayTrainingPlan />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[20px] font-[500]">운동부하 밸런스</h2>
            <div className="grid grid-cols-12 space-x-10">
              <WeeklyWorkLoad />
              <div className="flex col-span-7 space-x-10">
                <TrainingBalance />
                <TeamNote />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <TrainingLoadGraph />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
