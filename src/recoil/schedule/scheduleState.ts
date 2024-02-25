import { CategoryListType, CategoryType, CheckboxType } from "@/types/schedule";
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

const playerCheckState = atom<CheckboxType[]>({
  key: "playerCheckState",
  default: [
    {
      id: 0,
      name: "",
      check: false,
    },
  ],
});

const playerCheckSelector = selector<CheckboxType[]>({
  key: "playerCheckSelector",
  get: ({ get }) => {
    const check = get(playerCheckState);
    return check;
  },
  set: ({ set }, newValue) => {
    set(playerCheckState, newValue);
  },
});

const selectCategoryState = atom<number>({
  key: "selectCategoryState",
  default: -1,
});

const selectCategorySelector = selector<number>({
  key: "selectCategorySelector",
  get: ({ get }) => {
    const category = get(selectCategoryState);
    return category;
  },
  set: ({ set }, newValue) => {
    set(selectCategoryState, newValue);
  },
});

const imageFiles = atom<File[]>({
  key: "imageFileState",
  default: [],
});

const imageFilesSelector = selector<File[]>({
  key: "imageFileSelector",
  get: ({ get }) => {
    const images = get(imageFiles);
    return images;
  },
  set: ({ set }, newValue) => {
    set(imageFiles, newValue);
  },
});

export {
  recordDateState,
  recordDateSelector,
  dailyDateState,
  dailyDateSelector,
  categoryState,
  categorySelector,
  playerCheckState,
  playerCheckSelector,
  selectCategoryState,
  selectCategorySelector,
  imageFiles,
  imageFilesSelector,
};
