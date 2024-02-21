export interface ReportRequestType {
  playerGrade?: string;
  name?: string;
  position?: string;
  recordDate: string;
}

export interface DailyReportResponseType {
  userId: number;
  userName: string;
  positions: Array<string>;
  bodyFat: number;
  weight: number;
  compareWeight: number;
  urine: number;
  sleep: number;
  stress: number;
  fatigue: number;
  muscleSoreness: number;
  hooperIndex: number;
  importantYn: boolean;
}

export interface WeeklyReportResponseType {
  userId: number;
  userName: string;
  positions: Array<string>;
  bodyFat: number;
  weight: number;
  muscleSoreness: number;
  hooperIndex: number;
  workoutLoad: number;
  importantYn: boolean;
  hooperIndexTop3Yn: boolean;
  muscleSorenessTop3Yn: boolean;
  workoutLoadTop3Yn: boolean;
}

export interface DailyReportDataType {
  id: number;
  userName: string;
  position: string;
  bodyFat: number;
  weight: number;
  compareWeight: number;
  urine: number;
  sleep: number;
  stress: number;
  fatigue: number;
  muscleSoreness: number;
  hooperIndex: number;
  importantYn: boolean;
  [key: string]: any;
}

export interface WeeklyReportDataType {
  id: number;
  userName: string;
  position: string;
  bodyFat: number;
  weight: number;
  muscleSoreness: number;
  hooperIndex: number;
  workoutLoad: number;
  importantYn: boolean;
  hooperIndexTop3Yn: boolean;
  muscleSorenessTop3Yn: boolean;
  workoutLoadTop3Yn: boolean;
  [key: string]: any;
}

export interface DailyReportType {
  initPage: number;
  dailyData: DailyReportDataType[];
  totalLen: number;
  getDailyEvent: (currentPage?: number, itemPerPage?: number) => Promise<void>;
}

export interface WeeklyReportType {
  initPage: number;
  weeklyData: WeeklyReportDataType[];
  searchDate: Date;
  totalLen: number;
  getWeeklyEvent: (currentPage?: number, itemPerPage?: number) => Promise<void>;
}

export interface SearchFilterType {
  playerGrader: string;
  category: string;
  keyword: string;
}

export interface WeeklyChartDataType {
  userId: number;
  userName: number;
  hooperIndex?: number;
  bodyFat?: number;
  weight?: number;
  muscleSoreness?: number;
  workLoad?: number;
}

export interface HooperIndexResponseType {
  userId: number;
  userName: string;
  hooperIndex: number;
}

export interface BodyFatResponseType {
  userId: number;
  userName: string;
  bodyFat: number;
}

export interface WeightResponseType {
  userId: number;
  userName: string;
  weight: number;
}

export interface MuscleSorenessResponseType {
  userId: number;
  userName: string;
  muscleSoreness: number;
}

export interface WorkLoadResponseType {
  userId: number;
  userName: string;
  workLoad: number;
}
