import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { AxisConfig, BarChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";
import {
  searchPlayerGraderState,
  searchCategoryState,
  searchKeywordState,
} from "@/recoil/search/searchState";
import TabBar01 from "@/components/common/tabBar01";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { WeeklyReportDataType, WeeklyReportType } from "@/types/report";
import { weeklyColumnData } from "@/constants/mock/report";
import PrivateApi from "@/api/privateData";
import ReportApi from "@/api/report";
import { showToast } from "@/utils";
import {
  WeeklyChartDataType,
  ReportRequestType,
  SearchFilterType,
  HooperIndexResponseType,
  BodyFatResponseType,
  WeightResponseType,
  MuscleSorenessResponseType,
  WorkLoadResponseType,
} from "@/types/report";
import { getFullDateToString } from "@/utils/dateFormat";

type ExtendedAxisConfig = AxisConfig & { categoryGapRatio?: number };

const WeeklyReport = ({
  initPage,
  weeklyData,
  searchDate,
  totalLen,
  getWeeklyEvent,
}: WeeklyReportType) => {
  const [page, setPage] = useState<number>(0);
  const [pageChart, setPageChart] = useState<number>(0);
  const [data, setData] = useState<WeeklyReportDataType[]>(weeklyData);
  const [totalLength, setTotalLength] = useState<number>(totalLen);
  const [totalLengthChart, setTotalLengthChart] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
    playerGrader: "ALL",
    category: "",
    keyword: "",
  });
  const [activeTab, setActiveTab] = useState("hooperIndex");
  const [uData, setUData] = useState<Array<number>>([]);
  const [xLabels, setXLabels] = useState<Array<string>>([]);

  const tabs = [
    { key: "hooperIndex", label: "후퍼인덱스" },
    { key: "bodyFat", label: "체지방" },
    { key: "weight", label: "몸무게" },
    { key: "muscleSoreness", label: "근육통" },
    { key: "workLoad", label: "운동부하" },
  ];

  const searchGrader = useRecoilValue(searchPlayerGraderState);
  const searchCategory = useRecoilValue(searchCategoryState);
  const searchKeyword = useRecoilValue(searchKeywordState);

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
  const totalItemsChart = totalLengthChart;
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
    getChartEvent();
  };

  const prevChart = () => {
    if (currentPageChart > 0) {
      handlePageChangeChart(currentPageChart - 1);
    }
    getChartEvent();
  };

  const getChartEvent = async () => {
    const date = getFullDateToString(searchDate);
    const queryParams: ReportRequestType = {
      recordDate: date,
    };
    if (searchFilter.playerGrader !== "ALL") {
      queryParams.playerGrade = searchFilter.playerGrader;
    }

    if (searchFilter.category === "name") {
      queryParams.name = searchFilter.keyword;
    }
    if (searchFilter.category === "position") {
      queryParams.position = searchFilter.keyword;
    }

    if (activeTab === "hooperIndex") {
      await ReportApi.v1GetHooperIndexReport(
        queryParams,
        currentPageChart,
        itemPerPageChart
      ).then((res) => {
        const { content, totalElements } = res.data;

        const tempUData: Array<number> = [];
        const tempXLabels: Array<string> = [];

        content.map((item: HooperIndexResponseType) => {
          tempUData.push(item.hooperIndex);
          tempXLabels.push(item.userName);
        });

        setUData(tempUData);
        setXLabels(tempXLabels);
        setTotalLengthChart(totalElements);
      });
    } else if (activeTab === "bodyFat") {
      await ReportApi.v1GetBodyFatReport(
        queryParams,
        currentPageChart,
        itemPerPageChart
      ).then((res) => {
        const { content, totalElements } = res.data;

        const tempUData: Array<number> = [];
        const tempXLabels: Array<string> = [];

        content.map((item: BodyFatResponseType) => {
          tempUData.push(item.bodyFat);
          tempXLabels.push(item.userName);
        });

        setUData(tempUData);
        setXLabels(tempXLabels);
        setTotalLengthChart(totalElements);
      });
    } else if (activeTab === "weight") {
      await ReportApi.v1GetWeightReport(
        queryParams,
        currentPageChart,
        itemPerPageChart
      ).then((res) => {
        const { content, totalElements } = res.data;

        const tempUData: Array<number> = [];
        const tempXLabels: Array<string> = [];

        content.map((item: WeightResponseType) => {
          tempUData.push(item.weight);
          tempXLabels.push(item.userName);
        });

        setUData(tempUData);
        setXLabels(tempXLabels);
        setTotalLengthChart(totalElements);
      });
    } else if (activeTab === "muscleSoreness") {
      await ReportApi.v1GetMuscleSorenessReport(
        queryParams,
        currentPageChart,
        itemPerPageChart
      ).then((res) => {
        const { content, totalElements } = res.data;

        const tempUData: Array<number> = [];
        const tempXLabels: Array<string> = [];

        content.map((item: MuscleSorenessResponseType) => {
          tempUData.push(item.muscleSoreness);
          tempXLabels.push(item.userName);
        });

        setUData(tempUData);
        setXLabels(tempXLabels);
        setTotalLengthChart(totalElements);
      });
    } else {
      await ReportApi.v1GetWorkLoadReport(
        queryParams,
        currentPageChart,
        itemPerPageChart
      ).then((res) => {
        const { content, totalElements } = res.data;

        const tempUData: Array<number> = [];
        const tempXLabels: Array<string> = [];

        content.map((item: WorkLoadResponseType) => {
          tempUData.push(item.workLoad);
          tempXLabels.push(item.userName);
        });

        setUData(tempUData);
        setXLabels(tempXLabels);
        setTotalLengthChart(totalElements);
      });
    }
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

    await PrivateApi.v1UpdateImportantPlayer(id).then((res) => {
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

  const onTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  useEffect(() => {
    getWeeklyEvent(currentPage, itemPerPage);
  }, [page]);

  useEffect(() => {
    setSearchFilter({
      playerGrader: searchGrader,
      category: searchCategory,
      keyword: searchKeyword,
    });
  }, [searchGrader, searchCategory, searchKeyword]);

  useEffect(() => {
    getChartEvent();
  }, [pageChart, activeTab, searchDate]);

  useEffect(() => {
    setData(weeklyData);
    setTotalLength(totalLen);
    getChartEvent();
  }, [weeklyData, totalLen]);

  useEffect(() => {
    handlePageChange(0);
    handlePageChangeChart(0);
  }, [initPage, searchDate, searchFilter]);

  return (
    <>
      <div className="pb-5">
        <TabBar01 tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      {uData.length !== 0 && xLabels.length !== 0 && (
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
      {data.length !== 0 ? (
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
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default WeeklyReport;
