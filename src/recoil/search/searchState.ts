import { AddressResponseType } from "@/types/schedule";
import { atom, selector } from "recoil";

const searchPlayerGraderState = atom<string>({
  key: "searchPlayerGrader",
  default: "ALL",
});

const searchPlayerGraderSelector = selector<string>({
  key: "searchPlayerGraderSelector",
  get: ({ get }) => {
    const grader = get(searchPlayerGraderState);
    return grader;
  },
  set: ({ set }, newValue) => {
    set(searchPlayerGraderState, newValue);
  },
});

const searchCategoryState = atom<string>({
  key: "searchCategory",
  default: "",
});

const searchCategorySelector = selector<string>({
  key: "searchCategorySelector",
  get: ({ get }) => {
    const category = get(searchCategoryState);
    return category;
  },
  set: ({ set }, newValue) => {
    set(searchCategoryState, newValue);
  },
});

const searchKeywordState = atom<string>({
  key: "searchKeyword",
  default: "",
});

const searchKeywordSelector = selector<string>({
  key: "searchKeywordSelector",
  get: ({ get }) => {
    const keyword = get(searchKeywordState);
    return keyword;
  },
  set: ({ set }, newValue) => {
    set(searchKeywordState, newValue);
  },
});

const searchAddressState = atom<AddressResponseType>({
  key: "searchAddressState",
  default: {
    title: "",
    roadAddress: "",
    address: "",
  },
});

const searchAddressSelector = selector<AddressResponseType>({
  key: "searchAddressSelector",
  get: ({ get }) => {
    const address = get(searchAddressState);
    return address;
  },
  set: ({ set }, newValue) => {
    set(searchAddressState, newValue);
  },
});

const addressKeywordState = atom<string>({
  key: "addressKeywordState",
  default: "",
});

const addressKeywordSelector = selector<string>({
  key: "addressKeywordSelector",
  get: ({ get }) => {
    const keyword = get(addressKeywordState);
    return keyword;
  },
  set: ({ set }, newValue) => {
    set(addressKeywordState, newValue);
  },
});

export {
  searchPlayerGraderState,
  searchPlayerGraderSelector,
  searchCategoryState,
  searchCategorySelector,
  searchKeywordState,
  searchKeywordSelector,
  searchAddressState,
  searchAddressSelector,
  addressKeywordState,
  addressKeywordSelector,
};
