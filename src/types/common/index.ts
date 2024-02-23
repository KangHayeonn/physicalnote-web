import { Column } from "react-table";
import { PrivateDataType } from "@/types/privateData";
import { DailyReportDataType, WeeklyReportDataType } from "@/types/report";
import { PlayerSimpleResponseType } from "@/types/schedule";

export interface SearchProps {
  title?: string;
  onClickSubmit?: () => void;
  resetPage?: () => void;
}

export interface ValidType {
  searchType: string;
  searchCategory: string;
  searchName: string;
  searchPosition: string;
}

export interface SearchCategoryType {
  key: string;
  value: string;
}

export interface DropDownProps {
  defaultText?: string | undefined;
  text?: string | undefined;
  width?: number | undefined;
  dropDownList?: Array<SearchCategoryType>;
  changeText?: (category: string) => void | undefined;
}

export interface TableType {
  columns: Column[];
  data:
    | PrivateDataType[]
    | DailyReportDataType[]
    | WeeklyReportDataType[]
    | PlayerSimpleResponseType[];
  onClickRow?: (id: number) => (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelectedCheckbox?: boolean;
  onSelect?: (id: number, e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TableRowType {
  column: Column;
  data: PrivateDataType;
  onClick:
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}
