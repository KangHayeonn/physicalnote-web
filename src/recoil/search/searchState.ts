import { atom } from "recoil";

const searchPlayerGraderState = atom<string>({
  key: "searchPlayerGrader",
  default: "ALL",
});

const searchCategoryState = atom<string>({
  key: "searchCategory",
  default: "",
});

const searchKeywordState = atom<string>({
  key: "searchKeyword",
  default: "",
});

export { searchPlayerGraderState, searchCategoryState, searchKeywordState };
