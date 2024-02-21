import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { AxisConfig, BarChart } from "@mui/x-charts";
import TabBar01 from "@/components/common/tabBar01";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { WeeklyReportDataType, WeeklyReportType } from "@/types/report";
import { weeklyColumnData } from "@/constants/mock/report";
import Api from "@/api/privateData";
import { showToast } from "@/utils";
import { WeeklyChartDataType } from "@/types/report";

type ExtendedAxisConfig = AxisConfig & { categoryGapRatio?: number };

const WeeklyReport = ({
  initPage,
  weeklyData,
  totalLen,
  getWeeklyEvent,
}: WeeklyReportType) => {
  const [page, setPage] = useState<number>(0);
  const [pageChart, setPageChart] = useState<number>(0);
  const [data, setData] = useState<WeeklyReportDataType[]>(weeklyData);
  const [chartData, setChartData] = useState<WeeklyChartDataType[]>([]);
  const [totalLength, setTotalLength] = useState<number>(totalLen);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // pagination - table
  const itemPerPage = 10;
  const totalItems = totalLength;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
    getWeeklyEvent(currentPage, itemPerPage);
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
    getWeeklyEvent(currentPage, itemPerPage);
  };

  // pagination - chart
  const itemPerPageChart = 10;
  const totalItemsChart = chartData?.length;
  const {
    currentPage: currentPageChart,
    totalPages: totalPagesChart,
    currentItems: currentItemsChart,
    handlePageChange: handlePageChangeChart,
  } = usePagination(
    (pageChart) => setPageChart(pageChart),
    itemPerPageChart,
    totalItemsChart
  );

  const nextChart = () => {
    if (currentPageChart + 1 < totalPagesChart) {
      handlePageChangeChart(currentPageChart + 1);
    }
    // getWeeklyEvent(currentPage, itemPerPage);
  };

  const prevChart = () => {
    if (currentPageChart > 0) {
      handlePageChangeChart(currentPageChart - 1);
    }
    // getWeeklyEvent(currentPage, itemPerPage);
  };

  // 중요 선수 등록/삭제 (즐겨찾기)
  const handleImportantCheck = async (
    id: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, importantYn: !item.importantYn };
        }

        return item;
      })
    );

    await Api.v1UpdateImportantPlayer(id).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        if (data.importantYn) {
          showToast("즐겨찾기로 등록되었습니다.");
        } else {
          showToast("즐겨찾기가 해제되었습니다.");
        }
      }
    });
  };

  // 탭바 모듈 로직 시작
  const [activeTab, setActiveTab] = useState("hooperIndex");

  const tabs = [
    { key: "hooperIndex", label: "후퍼인덱스" },
    { key: "bodyFat", label: "체지방" },
    { key: "weight", label: "몸무게" },
    { key: "musclePain", label: "근육통" },
    { key: "ExerciseLoad", label: "운동부하" },
  ];

  // 그래프 (트레이닝 밸런스)
  const uData = [4000, 3000, 2000, 2780];
  const xLabels = ["이번주", "저번주", "지난4주", "지난8주"];

  const onTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  useEffect(() => {
    getWeeklyEvent(currentPage, itemPerPage);
  }, [page]);

  useEffect(() => {
    setData(weeklyData);
    setTotalLength(totalLen);
  }, [weeklyData, totalLen]);

  useEffect(() => {
    handlePageChange(0);
  }, [initPage]);

  return (
    <>
      <div className="pb-5">
        <TabBar01 tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      {activeTab === "hooperIndex" && (
        <>
          <div className="h-[320px]">
            <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
              <Box sx={{ width: "100%" }}>
                <BarChart
                  height={300}
                  series={[
                    {
                      data: uData,
                      type: "bar",
                      color: "#C6E19B",
                    },
                  ]}
                  xAxis={
                    [
                      {
                        scaleType: "band",
                        data: xLabels,
                        categoryGapRatio: 0.8,
                      },
                    ] as ExtendedAxisConfig[]
                  }
                />
              </Box>
            </div>
          </div>
          <Pagination
            currentPage={currentPageChart}
            totalPage={totalPagesChart}
            onPageChange={handlePageChangeChart}
            setPage={setPageChart}
            next={nextChart}
            prev={prevChart}
          />
        </>
      )}
      <div className="flex flex-col mt-20 space-y-10">
        <Table
          columns={weeklyColumnData}
          data={data || []}
          isSelectedCheckbox={isChecked}
          onSelect={handleImportantCheck}
        />
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={handlePageChange}
          setPage={setPage}
          next={next}
          prev={prev}
        />
      </div>
    </>
  );
};

export default WeeklyReport;
