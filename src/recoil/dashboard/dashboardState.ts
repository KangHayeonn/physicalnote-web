import { atom } from "recoil";
import {
  TeamConditionInfoType,
  TeamHooperIndexInfoType,
  TeamInjuryInfoType,
  TeamNoteInfoType,
  TodayTrainingPlanInfoType,
  TrainingBalanceInfoType,
  TrainingLoadGraphInfoType,
  WeeklyWorkLoadInfoType,
} from "@/types/dashboard";

const teamConditionState = atom<TeamConditionInfoType>({
  key: "teamCondition",
  default: {
    hooperIndexValue: 12,
    hooperIndexString: "",
    urineValue: 5,
    registeredPlayerIds: [1],
    registeredPlayerCnt: 1,
    unRegisteredPlayerIds: [17, 21, 26, 27],
    unRegisteredPlayerCnt: 4,
  },
});

const teamHooperIndexState = atom<TeamHooperIndexInfoType[]>({
  key: "teamHooperIndex",
  default: [
    {
      userInfo: {
        userId: 0,
        profile: null,
        name: "홍길동",
        positions: ["미드필더"],
      },
      hooperIndexInfo: {
        id: 40,
        sleep: "적정(1단계)",
        stress: "적정(1단계)",
        fatigue: "적정(1단계)",
        muscleSoreness: "적정(1단계)",
        recordDate: "2024-02-13",
      },
    },
  ],
});

const teamInjuryState = atom<TeamInjuryInfoType>({
  key: "teamInjury",
  default: {
    teamInjuryCnt: 1,
    injuryInfoList: [],
  },
});

const todayTrainingPlanState = atom<TodayTrainingPlanInfoType[]>({
  key: "todayTrainingPlan",
  default: [
    {
      id: 16,
      categoryName: "우운동",
      startTime: "14:00:00",
      endTime: "16:00:00",
      address: "상현 레스피아",
      content: "운동 운동",
    },
  ],
});

const weeklyWorkloadState = atom<WeeklyWorkLoadInfoType>({
  key: "weeklyWorkload",
  default: {
    stringOfWeekly: "2024년 2월 7주차",
    workloadInfoList: [
      {
        value: 480,
        xvalue: "화(02월 13일)",
      },
      {
        value: 1080,
        xvalue: "수(02월 14일)",
      },
    ],
  },
});

const trainingBalanceState = atom<TrainingBalanceInfoType>({
  key: "trainingBalance",
  default: {
    thisWeekValue: 780,
    lastTwoWeekValue: 496.15384615384613,
    lastTwoWeekBalanceValue: 1.5720930232558141,
    lastTwoWeekValueOfString: "과다",
    lastFourWeekValue: 488.7391304347826,
    lastFourWeekBalanceValue: 1.5959434214037898,
    lastFourWeekValueOfString: "과다",
    lastSixWeekValue: 645.24,
    lastSixWeekBalanceValue: 1.2088525199925608,
    lastSixWeekOfString: "충분",
    lastEightWeekValue: 1099.9666666666667,
    lastEightWeekBalanceValue: 0.7091123973453741,
    lastEightWeekValueOfString: "부족",
  },
});

const trainingLoadGraphState = atom<TrainingLoadGraphInfoType[]>({
  key: "trainingLoadGraph",
  default: [
    {
      monthOfString: "2023-12월",
      weeklyGraphInfo: [
        {
          value: 780,
          xvalue: "2주차",
        },
        {
          value: 4179.5,
          xvalue: "3주차",
        },
        {
          value: 150,
          xvalue: "4주차",
        },
        {
          value: 2445,
          xvalue: "5주차",
        },
      ],
    },
  ],
});

const teamNoteState = atom<TeamNoteInfoType>({
  key: "teamNote",
  default: {
    content:
      '<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n<title>전송 현황</title>\n</head>\n<body>\n<div>\n    <h1 style="text-align: center;">전송 현황</h1>\n    <p>• 전송 후원에 대한 비고사항</p>\n    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">\n        <tr>\n            <th style="background-color: #f2f2f2; padding: 10px; text-align: center;" colspan="5">1) 오후 피지컬 세션 그룹별</th>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">14:30~15:00 (5명)</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">홍길동</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">이순신</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">강태공</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">김구</td>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">15:00~15:00 (3명)</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">이성계</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">박문수</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">빈곤</td>\n        </tr>\n        <tr>\n            <th style="background-color: #f2f2f2; padding: 10px; text-align: center;" colspan="5">2) 전 비목: 손목 보호대, 하리 밴드</th>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;" colspan="5">이러한으로 자유롭게 세부내용 전송이 가능</td>\n        </tr>\n    </table>\n</div>\n</body>\n</html>',
    recordDate: "2024-02-13",
  },
});

export {
  teamConditionState,
  teamHooperIndexState,
  teamInjuryState,
  todayTrainingPlanState,
  weeklyWorkloadState,
  trainingBalanceState,
  trainingLoadGraphState,
  teamNoteState,
};
