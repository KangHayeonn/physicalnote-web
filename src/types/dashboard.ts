export interface DashboardResponseType {
  teamConditionInfo: TeamConditionInfoType;
  todayTrainingPlanInfo: TodayTrainingPlanInfoType[];
  weeklyWorkloadInfo: WeeklyWorkLoadInfoType;
  trainingBalanceInfo: TrainingBalanceInfoType;
  trainingLoadGraphInfo: TrainingLoadGraphInfoType[];
  trainingDurationGraphInfo: TrainingLoadGraphInfoType[];
  teamNoteInfo: TeamNoteInfoType;
}

// 팀 컨디션 정보
export interface TeamConditionInfoType {
  hooperIndexValue: number;
  hooperIndexString: string;
  urineValue: number;
  registeredPlayerIds: Array<number>;
  registeredPlayerCnt: number;
  unRegisteredPlayerIds: Array<number>;
  unRegisteredPlayerCnt: number;
}

// 관찰대상 정보
export interface TeamHooperIndexInfoType {
  userInfo: UserInfoType;
  hooperIndexInfo: HooperIndexInfoType | null;
}

export interface UserInfoType {
  userId: number;
  profile: string | null;
  name: string;
  positions: Array<string>;
}

export interface HooperIndexInfoType {
  id: number;
  sleep: string;
  stress: string;
  fatigue: string;
  muscleSoreness: string;
  recordDate: string;
}

// 부상 정보
export interface TeamInjuryInfoType {
  teamInjuryCnt: number;
  injuryInfoList: InjuryInfoListType[];
}

export interface InjuryInfoListType {
  injuryInfo: InjuryInfoType[];
  userInfo: UserInfoType[];
}

export interface InjuryInfoType {
  injuryOfString: string;
  injuryDetails: string;
}

// 훈련계획 정보
export interface TodayTrainingPlanInfoType {
  id: number;
  categoryName: string;
  startTime: string;
  endTime: string;
  address: string;
  content: string;
}

// 주간 트레이닝 부하 정보
export interface WeeklyWorkLoadInfoType {
  stringOfWeekly: string;
  workloadInfoList: WorkLoadInfoType[];
}

export interface WorkLoadInfoType {
  value: number;
  xvalue: string;
}

// 트레이닝 밸런스 정보
export interface TrainingBalanceInfoType {
  thisWeekValue: number; // 이번주
  lastTwoWeekValue: number; // 지난 2주
  lastTwoWeekBalanceValue: number; // 지난 2주 밸런스 값
  lastTwoWeekValueOfString: string; // 지난 2주 문자열 값
  lastFourWeekValue: number;
  lastFourWeekBalanceValue: number;
  lastFourWeekValueOfString: string;
  lastSixWeekValue: number;
  lastSixWeekBalanceValue: number;
  lastSixWeekOfString: string;
  lastEightWeekValue: number;
  lastEightWeekBalanceValue: number;
  lastEightWeekValueOfString: string;
}

// 훈련 부하 모니터링 정보
export interface TrainingLoadGraphInfoType {
  monthOfString: string;
  weeklyGraphInfo: WorkLoadInfoType[];
}

// 비고 정보
export interface TeamNoteInfoType {
  content: string;
  recordDate: string;
}

export interface LevelCircleType {
  level: string | undefined;
}
