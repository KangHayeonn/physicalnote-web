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
