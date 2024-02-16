import React from "react";
import Box from "@mui/material/Box";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  SeriesDataType,
  YAxisIds,
  AxisWithCompositionProps,
} from "@/types/chart";

const AxisWithComposition = ({
  xAxisData,
  seriesData,
  yAxisIds,
  height = 400,
  margin = { left: 70, right: 70 },
}: AxisWithCompositionProps) => {
  return (
    <Box
    // sx={{ width: "100%" }}
    >
      <ResponsiveChartContainer
        xAxis={[
          {
            scaleType: "band",
            data: xAxisData,
            id: "quarters",
          },
        ]}
        yAxis={yAxisIds}
        series={seriesData}
        height={height}
        margin={margin}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-25px, 0)",
          },
          [`.${axisClasses.right} .${axisClasses.label}`]: {
            transform: "translate(30px, 0)",
          },
        }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis axisId="quarters" labelFontSize={18} />
        <ChartsYAxis axisId={`${yAxisIds[0].id}`} />
        <ChartsYAxis axisId={`${yAxisIds[2].id}`} position="right" />
      </ResponsiveChartContainer>
    </Box>
  );
};

export default AxisWithComposition;
