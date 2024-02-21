import { SeriesDataType } from "@/types/chart";

export const xAxisData = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const seriesData: SeriesDataType[] = [
  {
    type: "bar",
    yAxisKey: "nonContactCnt",
    data: [4, 20, 12, 25],
    color: "#CAD5EB",
  },
  {
    type: "bar",
    yAxisKey: "contactCnt",
    data: [4, 10, 20, 18],
    color: "#FFE177",
  },
  {
    type: "line",
    curve: "linear",
    yAxisKey: "totalCount",
    data: [1, 6, 4, 5],
    color: "#FF0000",
  },
  {
    type: "bar",
    yAxisKey: "diseaseCount",
    data: [1, 6, 4, 5],
    color: "#D9D9D9",
  },
];

export const yAxisIds = [
  { id: "nonContactCnt" },
  { id: "contactCnt" },
  { id: "totalCount" },
  { id: "diseaseCount" },
];
