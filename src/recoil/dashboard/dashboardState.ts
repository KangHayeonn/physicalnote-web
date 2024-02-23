import { atom, selector, RecoilEnv } from "recoil";
import {
  TeamConditionInfoType,
  TeamCautionPageType,
  TeamInjuryInfoType,
  TeamNoteInfoType,
  TodayTrainingPlanInfoType,
  TrainingBalanceInfoType,
  TrainingLoadGraphInfoType,
  WeeklyWorkLoadInfoType,
} from "@/types/dashboard";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const teamConditionState = atom<TeamConditionInfoType>({
  key: "teamConditionState",
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

const teamConditionSelector = selector<TeamConditionInfoType>({
  key: "teamConditionSelector",
  get: ({ get }) => {
    const note = get(teamConditionState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(teamConditionState, newValue);
  },
});

const teamHooperIndexState = atom<TeamCautionPageType>({
  key: "teamHooperIndexState",
  default: {
    content: [],
    totalElements: 0,
  },
});

const teamHooperIndexSelector = selector<TeamCautionPageType>({
  key: "teamHooperIndexSelector",
  get: ({ get }) => {
    const note = get(teamHooperIndexState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(teamHooperIndexState, newValue);
  },
});

const teamInjuryState = atom<TeamInjuryInfoType>({
  key: "teamInjuryState",
  default: {
    teamInjuryCnt: 1,
    injuryInfoList: [],
  },
});

const teamInjurySelector = selector<TeamInjuryInfoType>({
  key: "teamInjurySelector",
  get: ({ get }) => {
    const note = get(teamInjuryState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(teamInjuryState, newValue);
  },
});

const todayTrainingPlanState = atom<TodayTrainingPlanInfoType[]>({
  key: "todayTrainingPlanState",
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

const todayTrainingPlanSelector = selector<TodayTrainingPlanInfoType[]>({
  key: "todayTrainingPlanSelector",
  get: ({ get }) => {
    const note = get(todayTrainingPlanState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(todayTrainingPlanState, newValue);
  },
});

const weeklyWorkloadState = atom<WeeklyWorkLoadInfoType>({
  key: "weeklyWorkloadState",
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

const weeklyWorkloadSelector = selector<WeeklyWorkLoadInfoType>({
  key: "weeklyWorkloadSelector",
  get: ({ get }) => {
    const note = get(weeklyWorkloadState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(weeklyWorkloadState, newValue);
  },
});

const trainingBalanceState = atom<TrainingBalanceInfoType>({
  key: "trainingBalanceState",
  default: {
    thisWeekValue: 0,
    lastTwoWeekValue: 0,
    lastTwoWeekBalanceValue: 0,
    lastTwoWeekValueOfString: "",
    lastFourWeekValue: 0,
    lastFourWeekBalanceValue: 0,
    lastFourWeekValueOfString: "",
    lastSixWeekValue: 0,
    lastSixWeekBalanceValue: 0,
    lastSixWeekOfString: "",
    lastEightWeekValue: 0,
    lastEightWeekBalanceValue: 0,
    lastEightWeekValueOfString: "",
  },
});

const trainingBalanceSelector = selector<TrainingBalanceInfoType>({
  key: "trainingBalanceSelector",
  get: ({ get }) => {
    const note = get(trainingBalanceState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(trainingBalanceState, newValue);
  },
});

const trainingLoadGraphState = atom<TrainingLoadGraphInfoType[]>({
  key: "trainingLoadGraphState",
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

const trainingLoadGraphSelector = selector<TrainingLoadGraphInfoType[]>({
  key: "trainingLoadGraphSelector",
  get: ({ get }) => {
    const note = get(trainingLoadGraphState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(trainingLoadGraphState, newValue);
  },
});

const teamNoteState = atom<TeamNoteInfoType>({
  key: "teamNoteState",
  default: {
    content:
      '<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n<title>전송 현황</title>\n</head>\n<body>\n<div>\n    <h1 style="text-align: center;">전송 현황</h1>\n    <p>• 전송 후원에 대한 비고사항</p>\n    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">\n        <tr>\n            <th style="background-color: #f2f2f2; padding: 10px; text-align: center;" colspan="5">1) 오후 피지컬 세션 그룹별</th>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">14:30~15:00 (5명)</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">홍길동</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">이순신</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">강태공</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">김구</td>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">15:00~15:00 (3명)</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">이성계</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">박문수</td>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;">빈곤</td>\n        </tr>\n        <tr>\n            <th style="background-color: #f2f2f2; padding: 10px; text-align: center;" colspan="5">2) 전 비목: 손목 보호대, 하리 밴드</th>\n        </tr>\n        <tr>\n            <td style="border: 1px solid black; padding: 10px; text-align: center;" colspan="5">이러한으로 자유롭게 세부내용 전송이 가능</td>\n        </tr>\n    </table>\n</div>\n</body>\n</html>',
    recordDate: "2024-02-13",
  },
});

const teamNoteSelector = selector<TeamNoteInfoType>({
  key: "teamNoteSelector",
  get: ({ get }) => {
    const note = get(teamNoteState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(teamNoteState, newValue);
  },
});

export {
  teamConditionState,
  teamConditionSelector,
  teamHooperIndexState,
  teamHooperIndexSelector,
  teamInjuryState,
  teamInjurySelector,
  todayTrainingPlanState,
  todayTrainingPlanSelector,
  weeklyWorkloadState,
  weeklyWorkloadSelector,
  trainingBalanceState,
  trainingBalanceSelector,
  trainingLoadGraphState,
  trainingLoadGraphSelector,
  teamNoteState,
  teamNoteSelector,
};
