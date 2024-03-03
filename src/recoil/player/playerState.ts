import { atom, selector } from "recoil";
import { CheckboxType, PlayerDetailResponseType } from "@/types/player";

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

const playerDetailState = atom<PlayerDetailResponseType>({
  key: "playerDetailState",
  default: {
    userInfo: {
      id: 0,
      profile: "",
      name: "",
      height: 0,
      weight: 0,
      positions: [],
      leftValue: 0,
      rightValue: 0,
      importantYn: false,
    },
    unregisteredInfo: [],
    hooperIndexInfo: {
      id: 0,
      sleep: "",
      stress: "",
      fatigue: "",
      muscleSoreness: "",
      recordDate: "",
    },
    intensityInfo: [],
    riskInfo: {
      id: 0,
      injuryLevel: 0,
      injuryPercent: 0,
      recordDate: "",
    },
    urineResponseDto: {
      id: 0,
      weight: 0,
      differenceFat: null,
      urine: "",
      recordDate: "",
    },
    feedBackInfo: null,
    weekIntensityGraph: [],
    weekHooperIndexGraph: {
      sleepInfo: [],
      stressInfo: [],
      fatigueInfo: [],
      muscleSorenessInfo: [],
    },
    weekWorkoutTimeGraph: [],
    monthIntensityGraph: [],
    monthHooperIndexGraph: {
      sleepInfo: [],
      stressInfo: [],
      fatigueInfo: [],
      muscleSorenessInfo: [],
    },
    monthWorkoutTimeGraph: [],
    injuryInfo: [],
  },
});

const playerDetailSelector = selector<PlayerDetailResponseType>({
  key: "playerDetailSelector",
  get: ({ get }) => {
    const detail = get(playerDetailState);
    return detail;
  },
  set: ({ set }, newValue) => {
    set(playerDetailState, newValue);
  },
});

export {
  playerApproveCheckState,
  playerApproveCheckSelector,
  playerDetailState,
  playerDetailSelector,
};
