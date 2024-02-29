import { atom, selector } from "recoil";
import { CheckboxType } from "@/types/player";

const playerApproveCheckState = atom<CheckboxType[]>({
  key: "playerApproveCheckState",
  default: [
    {
      id: 0,
      name: "",
      check: false,
      belongto: "",
    },
  ],
});

const playerApproveCheckSelector = selector<CheckboxType[]>({
  key: "playerApproveCheckSelector",
  get: ({ get }) => {
    const check = get(playerApproveCheckState);
    return check;
  },
  set: ({ set }, newValue) => {
    set(playerApproveCheckState, newValue);
  },
});

export { playerApproveCheckState, playerApproveCheckSelector };
