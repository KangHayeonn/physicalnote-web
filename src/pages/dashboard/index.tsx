import React, { useState, useEffect } from "react";
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
import { useSetRecoilState } from "recoil";
import {
  teamConditionState,
  teamHooperIndexState,
  teamInjuryState,
  todayTrainingPlanState,
  weeklyWorkloadState,
  trainingBalanceState,
  trainingLoadGraphState,
  teamNoteState,
} from "@/recoil/dashboard/dashboardState";
import Api from "@/api/dashboard";
import { getFullDateToString } from "@/utils/dateFormat";
import { DashboardResponseType } from "@/types/dashboard";

const Dashboard: NextPage = () => {
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  const setTeamCondition = useSetRecoilState(teamConditionState);
  const setTeamCaution = useSetRecoilState(teamHooperIndexState);
  const setTeamInjury = useSetRecoilState(teamInjuryState);
  const setTodayTrainingPlan = useSetRecoilState(todayTrainingPlanState);
  const setWeeklyWorkload = useSetRecoilState(weeklyWorkloadState);
  const setTrainingBalance = useSetRecoilState(trainingBalanceState);
  const setTrainingLoadGraph = useSetRecoilState(trainingLoadGraphState);
  const setTeamNote = useSetRecoilState(teamNoteState);

  const toggleDate = (type: string) => {
    const today = new Date();

    if (type === "lastWeek") {
      const lastWeek = today.setDate(today.getDate() - 7);
      setInitDate(new Date(lastWeek));
    }

    if (type === "yesterday") {
      const yesterday = today.setDate(today.getDate() - 1);
      setInitDate(new Date(yesterday));
    }

    if (type === "today") {
      setInitDate(today);
    }
  };

  const getDashboardInfo = async () => {
    await Api.v1GetDashboard(getFullDateToString(searchDate)).then((res) => {
      const result: DashboardResponseType = res.data;

      setTeamCondition({ ...result.teamConditionInfo });
      setTodayTrainingPlan([...result.todayTrainingPlanInfo]);
      setWeeklyWorkload(result.weeklyWorkloadInfo);
      setTrainingBalance({ ...result.trainingBalanceInfo });
      setTeamNote({ ...result.teamNoteInfo });
      setTrainingLoadGraph([...result.trainingLoadGraphInfo]);
    });
  };

  const getTeamCautionInfo = async () => {
    await Api.v1GetTeamCaution(getFullDateToString(searchDate), 0, 6).then(
      (res) => {
        const { content } = res.data;
        setTeamCaution(content);
      }
    );
  };

  const getTeamInjuryInfo = async () => {
    await Api.v1GetTeamInjury(0, 4).then((res) => {
      const { teamInjuryCnt, userInjuryInfoList } = res.data;
      setTeamInjury({
        teamInjuryCnt,
        injuryInfoList: userInjuryInfoList.content,
      });
    });
  };

  const init = () => {
    setInitDate(new Date());
  };

  useEffect(() => {
    getDashboardInfo();
    getTeamCautionInfo();
    getTeamInjuryInfo();
  }, [searchDate]);

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
    <div className="min-w-[2050px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">대시보드</h1>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            text="2주전"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("lastWeek")}
          />
          <Button
            type="button"
            text="지난주"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("lastWeek")}
          />
          <Button
            type="button"
            text="오늘"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("today")}
          />
          <DatePickerComponent
            calendarType="date"
            initDate={initDate}
            changeDate={setSearchDate}
          />
          <Button
            type="button"
            text="초기화"
            classnames="text-[#000] text-[13px] font-[700]"
            onClick={init}
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
