import React, { useState, useMemo } from "react";
import TabBar01 from "@/components/common/tabBar01";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { WeeklyReportDataType, WeeklyReportType } from "@/types/report";

const WeeklyReport = ({
  weeklyData,
  totalLen,
  getWeeklyEvent,
}: WeeklyReportType) => {
  const [page2, setPage2] = useState<number>(0);
  const [data, setData] = useState<WeeklyReportDataType[]>(weeklyData);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const data2 = [
    {
      name: "dh",
      position: "미드필더",
      weight: 72,
      bodyFat: 1,
      index: 4,
      musclePain: 6,
      ExerciseLoad: 10,
    },
  ];

  // 열 항목
  let columnData2 = [
    {
      Header: "선수이름",
      accessor: "name",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "포지션",
      accessor: "position",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "몸무게",
      accessor: "weight",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "체지방(%)",
      accessor: "bodyFat",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "후퍼인댁스",
      accessor: "index",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "근육통",
      accessor: "musclePain",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "운동부하",
      accessor: "ExerciseLoad",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
  ];

  const columns2 = useMemo(() => columnData2, []);

  // pagination
  const itemPerPage2 = 10;
  const totalItems2 = data2?.length;
  const {
    currentPage: currentPage2,
    totalPages: totalPages2,
    currentItems: currentItems2,
    handlePageChange: handlePageChange2,
  } = usePagination((page) => setPage2(page), itemPerPage2, totalItems2);

  const next2 = () => {
    if (currentPage2 + 1 < totalPages2) {
      handlePageChange2(currentPage2 + 1);
    }
  };

  const prev2 = () => {
    if (currentPage2 > 0) {
      handlePageChange2(currentPage2 - 1);
    }
  };

  const handleRowClick2 =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

  // 탭바 모듈 로직 시작
  const [activeTab, setActiveTab] = useState("index");

  const tabs = [
    { key: "index", label: "후퍼인댁스" },
    { key: "bodyFat", label: "체지방" },
    { key: "weight", label: "몸무게" },
    { key: "musclePain", label: "근육통" },
    { key: "ExerciseLoad", label: "운동부하" },
  ];

  const onTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <>
      <div className="pb-10">
        <TabBar01 tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      </div>
      {activeTab === "index" && <div className="h-[400px]">123</div>}
      <div className="flex flex-col space-y-10">
        <Table
          columns={columns2}
          data={data || []}
          onClickRow={handleRowClick2}
          isSelectedCheckbox={isChecked}
        />
        <Pagination
          currentPage={currentPage2}
          totalPage={totalPages2}
          onPageChange={handlePageChange2}
          setPage={setPage2}
          next={next2}
          prev={prev2}
        />
      </div>
    </>
  );
};

export default WeeklyReport;
