import { NextPage } from "next";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { useRouter } from "next/router";
import { MouseEvent, useMemo, useState } from "react";

const PrivateData: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const data = [
    {
      id: 1,
      name: "dh",
      age: 23,
      tel: "010-1234-1234",
      height: 180,
      weight: 72,
      position: "미드필더",
      belongto: "1군",
    },
    {
      id: 2,
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
      Header: "나이",
      accessor: "age",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "전화번호",
      accessor: "tel",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "키(cm)",
      accessor: "height",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "몸무게(kg)",
      accessor: "weight",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "포지션",
      accessor: "position",
      Cell: ({ value }: any) => (value ? value : "-"),
    },
    {
      Header: "소속",
      accessor: "belongto",
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
    router.push(`/privateData/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-[28px] font-[700]">개인 데이터</h1>
      <Search />
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        <Table
          columns={columns}
          data={data || []}
          onClickRow={handleRowClick}
          isSelectedCheckbox={true}
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
    </Layout>
  );
};

export default PrivateData;
