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
