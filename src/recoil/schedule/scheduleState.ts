import { CategoryListType, CategoryType } from "@/types/schedule";
import { atom, selector, RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const recordDateState = atom<Date>({
  key: "recordDateState",
  default: new Date(),
});

const recordDateSelector = selector<Date>({
  key: "recordDateSelector",
  get: ({ get }) => {
    const note = get(recordDateState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(recordDateState, newValue);
  },
});

const dailyDateState = atom<Date>({
  key: "dailyDateState",
  default: new Date(),
});

const dailyDateSelector = selector<Date>({
  key: "dailyDateSelector",
  get: ({ get }) => {
    const note = get(dailyDateState);
    return note;
  },
  set: ({ set }, newValue) => {
    set(dailyDateState, newValue);
  },
});

const categoryState = atom<CategoryListType>({
  key: "categoryState",
  default: {
    id: 0,
    name: "",
    colorCode: "",
  },
});

const categorySelector = selector<CategoryListType>({
  key: "categorySelector",
  get: ({ get }) => {
    const category = get(categoryState);
    return category;
  },
  set: ({ set }, newValue) => {
    set(categoryState, newValue);
  },
});

export {
  recordDateState,
  recordDateSelector,
  dailyDateState,
  dailyDateSelector,
  categoryState,
  categorySelector,
};
