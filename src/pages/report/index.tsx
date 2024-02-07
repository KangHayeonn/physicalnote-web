import { NextPage } from "next";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import { useState, useMemo, MouseEvent } from "react";
import { cls } from "@/libs/commons/utils";
import { useRouter } from "next/router";
import usePagination from "@/libs/commons/hooks/usePagination";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import TabBar01 from "@/components/common/tabBar01";

const Report: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [page2, setPage2] = useState(0);
  const [method, setMethod] = useState<"days" | "weeks">("days");

  const onClickDays = () => setMethod("days");
  const onClickWeeks = () => setMethod("weeks");

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
  // 탭바 모듈 로직 끝

  const data = [
    {
      name: "dh",
      age: 23,
      tel: "010-1234-1234",
      height: 180,
      weight: 72,
      position: "미드필더",
      belongto: "1군",
    },
    {
      name: "mike",
      age: 23,
      tel: "010-1234-1234",
      height: 180,
      weight: 72,
      position: "미드필더",
      belongto: "1군",
    },
  ];

  // 열 항목
  let columnData = [
    {
      Header: "선수이름",
      accessor: "name",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "체지방(%)",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "몸무게",
      accessor: "weight",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "%(전날대비차이)",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "소변검사",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "잠",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "스트레스",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "피로도",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "근육통",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "후퍼인댁스",
      accessor: "",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
  ];

  const columns = useMemo(() => columnData, []);

  // pagination
  const itemPerPage = 10;
  const totalItems = data?.length;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleRowClick = (id: number) => (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(id);
  };

  // ================================================================================
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
  const totalItems2 = data?.length;
  const {
    currentPage: currentPage2,
    totalPages: totalPages2,
    currentItems: currentItems2,
    handlePageChange: handlePageChange2,
  } = usePagination((page) => setPage2(page), itemPerPage, totalItems);

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

  const handleRowClick2 = (id: number) => (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(id);
  };

  return (
    <Layout>
      <h1 className="text-[28px] font-[700]">리포트</h1>
      <Search />
      <div className="flex w-[260px] h-[47px] rounded-lg shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden font-[700]">
        <div
          onClick={onClickDays}
          className={cls(
            "w-1/2 flex items-center justify-center cursor-pointer",
            method === "days" ? "bg-[#C6E19B] text-white" : "text-[#8DBE3D]"
          )}
        >
          일간
        </div>
        <div
          onClick={onClickWeeks}
          className={cls(
            "w-1/2 flex items-center justify-center cursor-pointer",
            method === "weeks" ? "bg-[#C6E19B] text-white" : "text-[#8DBE3D]"
          )}
        >
          주간
        </div>
      </div>
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        {method === "days" && (
          <>
            <Table
              columns={columns}
              data={data || []}
              onClickRow={handleRowClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPageChange={handlePageChange}
              setPage={setPage}
              next={next}
              prev={prev}
            />
          </>
        )}
        {method === "weeks" && (
          <>
            <div className="pb-10">
              <TabBar01
                tabs={tabs}
                activeTab={activeTab}
                onTabClick={onTabClick}
              />
            </div>
            {activeTab === "index" && <div className="h-[400px]">123</div>}
            <div className="flex flex-col space-y-10">
              <Table
                columns={columns2}
                data={data2 || []}
                onClickRow={handleRowClick2}
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
        )}
      </div>
    </Layout>
  );
};

export default Report;
