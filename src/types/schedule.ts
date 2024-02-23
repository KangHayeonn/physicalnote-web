export interface CategoryType {
  colorCode: string;
  name: string;
}

export interface ScheduleRequestType {
  address: string;
  calendarCategoryId: number;
  content: string;
  endTime: string;
  images: Array<string>;
  importantYn: boolean;
  name: string;
  playerGrade: string;
  recordDate: string;
  startTime: string;
  userIds: Array<string>;
}

export interface ScheduleResponseType {
  id: number;
  name: string;
  categoryId: number;
  colorCode: string;
  colorCodeValue: string;
  recordDate: string;
  importantYn: boolean;
}

export interface CategoryResponseType {
  id: number;
  name: string;
  colorCode: string;
}

export interface CategoryColorResponseType {
  colorCode: string;
  colorCodeValue: string;
}

export interface DailyScheduleResponseType {
  id: number;
  userSimpleInfo: UserSimpleInfoType[];
  categoryName: string;
  categoryColorCode: string;
  recordDate: string;
  workoutTime: string;
  address: string;
  content: string;
  images: Array<string>;
  importantYn: boolean;
}

export interface UserSimpleInfoType {
  id: number;
  name: string;
  playerGrade: string;
  teamId: number;
}

export interface ImportantScheduleResponseType {
  id: number;
  name: string;
  address: string;
  recordDate: string;
  workoutTime: string;
  importantYn: boolean;
}

export interface PlayerSimpleResponseType {
  id: number;
  name: string;
  phone: string;
  positions: Array<string>;
  playerGrade: string;
}
