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
