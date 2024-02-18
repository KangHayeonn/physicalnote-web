import { SearchCategoryType } from "@/types/common";

export interface PrivateDataType {
  id: number;
  name?: string;
  age?: number;
  phone?: string;
  height?: number;
  weight?: number;
  position?: string;
  belongto?: string;
  importantYn?: boolean;
  [key: string]: any;
}

export interface PlayersRequestType {
  playerGrade?: string;
  name?: string;
  position?: string;
}

export interface PlayersResponseType {
  id: number;
  name: string;
  age: number;
  phone: string;
  height: number;
  weight: number;
  positions: Array<string>;
  playerGrade: string;
  importantYn: boolean;
}

export interface PlayerTotalInfoType {
  urineTotalAvg: number;
  urineTotalStdDev: number;
  urineLast30MonthAvg: number;
  weightTotalAvg: number;
  weightTotalStdDev: number;
  weightLast30MonthAvg: number;
  sleepTotalAvg: number;
  sleepTotalStdDev: number;
  sleepLast30MonthAvg: number;
  stressTotalAvg: number;
  stressTotalStdDev: number;
  stressLast30MonthAvg: number;
  fatigueTotalAvg: number;
  fatigueTotalStdDev: number;
  fatigueLast30MonthAvg: number;
  muscleSorenessTotalAvg: number;
  muscleSorenessTotalStdDev: number;
  muscleSorenessLast30MonthAvg: number;
  hooperIndexTotalAvg: number;
  hooperIndexTotalStdDev: number;
  hooperIndexLast30MonthAvg: number;
  bodyFatTotalAvg: number;
  bodyFatTotalStdDev: number;
  bodyFatLast30MonthAvg: number;
  workoutIntensityTotalAvg: number;
  workoutIntensityTotalStdDev: number;
  workoutIntensityLast30MonthAvg: number;
  totalWorkoutTimeTotalAvg: number;
  totalWorkoutTimeTotalStdDev: number;
  totalWorkoutTimeLast30MonthAvg: number;
  totalWorkloadTotalAvg: number;
  totalWorkloadTotalStdDev: number;
  totalWorkloadLast30MonthAvg: number;
  [key: string]: any;
}

export interface PlayerMonthDataType {
  date: string;
  urine: number;
  weight: number;
  sleep: number;
  stress: number;
  fatigue: number;
  muscleSoreness: number;
  hooperIndex: number;
  bodyFat: number;
  workoutIntensity: number;
  totalWorkoutTime: number;
  totalWorkload: number;
  [key: string]: any;
}

export interface PrivateTableRowType {
  column: SearchCategoryType;
  data: PlayerMonthDataType;
}

export interface PlayerInfoType {
  userId: number;
  profile: string;
  name: string;
  positions: Array<string>;
  importantYn: boolean;
}
