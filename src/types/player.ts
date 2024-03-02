import { Column } from "react-table";

export interface PlayerListResponseType {
  id: number;
  name: string;
  age: number;
  phone: string | null;
  height: number;
  weight: number;
  positions: Array<string>;
  playerGrade: string;
  importantYn: boolean;
}

export interface PlayerListDataType {
  id: number;
  name: string;
  age: number;
  phone: string | null;
  height: number;
  weight: number;
  position: string;
  belongto: string;
  importantYn: boolean;
}

export interface PlayerChangeRequestType {
  playerGrade: string;
  userIds: Array<number>;
}

export interface ApprovePlayerRequestType {
  approvalYn: boolean;
  playerGrade: string;
  userIds: Array<number>;
}

export interface PositionType {
  id: number;
  userId: number;
  name: string;
}

export interface ApprovePlayerResponseType {
  userId: number;
  userName: string;
  age: number;
  phone: string | null;
  height: number;
  weight: number;
  positions: Array<PositionType>;
  requestDate: string;
}

export interface ApprovePlayerListType {
  userId: number;
  name: string;
  age: number;
  phone: string | null;
  height: number;
  weight: number;
  position: string;
}

export interface PlayerTableType {
  columns: Column[];
  data: ApprovePlayerListType[];
  onClickApprove?: (approvalYn: boolean, id: number) => Promise<void>;
  onClickDisapprove?: (approvalYn: boolean, id: number) => Promise<void>;
  onClickAllApprove?: () => Promise<void>;
}

export interface CheckboxType {
  id: number;
  name: string;
  check: boolean;
  belongto: string;
}

export interface PlayerDetailResponseType {
  userInfo: UserInfoType;
  unregisteredInfo: UnregisteredInfoType[];
  hooperIndexInfo: HooperIndexInfoType;
  intensityInfo: IntensityInfoType[];
  riskInfo: RiskInfoType;
  urineResponseDto: UrineInfoType;
  feedBackInfo: FeedBackInfoType;
  weekIntensityGraph: IntensityGraphType[];
  weekHooperIndexGraph: HooperIndexGraphType;
  weekWorkoutTimeGraph: WorkoutTimeGraphType[];
  monthIntensityGraph: IntensityGraphType[];
  monthHooperIndexGraph: HooperIndexGraphType;
  monthWorkoutTimeGraph: WorkoutTimeGraphType[];
  injuryInfo: InjuryInfoType[];
}

export interface UserInfoType {
  id: number;
  profile: string;
  name: string;
  height: number;
  weight: number;
  positions: Array<string>;
  leftValue: number;
  rightValue: number;
  importantYn: boolean;
}

export interface UnregisteredInfoType {
  day: string; // 요일
  unregisteredCategory: string; // 미등록 카테고리
  unregisteredDate: string; // 미등록 날짜
}

export interface HooperIndexInfoType {
  id: number;
  sleep: string;
  stress: string;
  fatigue: string;
  muscleSoreness: string;
  recordDate: string;
}

export interface IntensityInfoType {
  id: number;
  type: string;
  level: number;
  recordDate: string;
}

export interface RiskInfoType {
  id: number;
  injuryLevel: number;
  injuryPercent: number;
  recordDate: string;
}

export interface UrineInfoType {
  id: number;
  weight: number;
  differenceFat: number | null; // 전날 대비 몸무게 %
  urine: string;
  recordDate: string;
}

export interface FeedBackInfoType {
  id: number;
  userId: number;
  userName: string;
  content: string;
  recordDate: string;
}

export interface IntensityGraphType {
  id: number | null;
  type: string | null;
  level: number;
  xvalue: string; // x값
}

export interface HooperIndexGraphType {
  sleepInfo: GraphValueType[];
  stressInfo: GraphValueType[];
  fatigueInfo: GraphValueType[];
  muscleSorenessInfo: GraphValueType[];
}

export interface GraphValueType {
  level: number;
  xvalue: string;
}

export interface WorkoutTimeGraphType {
  id: number | null;
  type: string;
  workoutTime: string;
  xvalue: string;
}

export interface InjuryInfoType {
  id: number;
  injuryType: string | null; // 부상 경위
  distinctionType: string | null; // 앞 뒤 구분
  bodyType: string | null; // 상체 하체 구분
  muscleType: string | null; // 근육 부위 구분
  recordDate: string | null;
  injuryLevelType: string | null; // 고통 정도
  injuryLevelString: string | null; // 고통 텍스트
  comment: string | null; // 부상 코멘트
}

export interface HooperGraphType {
  sleep: {
    value: Array<number>;
    xvalue: Array<string>;
  };
  stress: {
    value: Array<number>;
    xvalue: Array<string>;
  };
  fatigue: {
    value: Array<number>;
    xvalue: Array<string>;
  };
  muscleSoreness: {
    value: Array<number>;
    xvalue: Array<string>;
  };
}
