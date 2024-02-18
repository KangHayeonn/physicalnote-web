import { Column } from "react-table";
import { PrivateDataType } from "@/types/privateData";

export interface SearchProps {
  title?: string;
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
  data: PrivateDataType[];
  onClickRow?: (id: number) => (e: React.MouseEvent<HTMLDivElement>) => void;
  isSelectedCheckbox?: boolean;
  onSelect?: (selectedRows: any) => void;
}

export interface TableRowType {
  column: Column;
  data: PrivateDataType;
}
