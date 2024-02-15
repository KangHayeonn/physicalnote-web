export interface SeriesDataType {
  type: "line" | "bar" | "pie" | "scatter";
  yAxisKey: string;
  data: number[];
  color: string;
}

export interface YAxisIds {
  id: string;
}

export interface AxisWithCompositionProps {
  xAxisData: string[];
  seriesData: any;
  yAxisIds: YAxisIds[];
  height?: number;
  margin?: { left: number; right: number };
}
