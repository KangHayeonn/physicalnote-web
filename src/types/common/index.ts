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
