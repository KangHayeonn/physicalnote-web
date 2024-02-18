import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { useRecoilValue } from "recoil";
import {
  searchPlayerGraderState,
  searchCategoryState,
  searchKeywordState,
} from "@/recoil/search/searchState";
import Api from "@/api/privateData";
import {
  PrivateDataType,
  PlayersRequestType,
  PlayersResponseType,
} from "@/types/privateData";

const PrivateData: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [data, setData] = useState<PrivateDataType[]>([]);
  const [totalLen, setTotalLen] = useState<number>(0);
  const searchGrader = useRecoilValue(searchPlayerGraderState);
  const searchCategory = useRecoilValue(searchCategoryState);
  const searchKeyword = useRecoilValue(searchKeywordState);

  const columnData = [
    {
      Header: "선수이름",
      accessor: "name",
    },
    {
      Header: "나이",
      accessor: "age",
    },
    {
      Header: "전화번호",
      accessor: "phone",
    },
    {
      Header: "키(cm)",
      accessor: "height",
    },
    {
      Header: "몸무게(kg)",
      accessor: "weight",
    },
    {
      Header: "포지션",
      accessor: "position",
    },
    {
      Header: "소속",
      accessor: "belongto",
    },
  ];

  const columns = useMemo(() => columnData, []);

  // pagination
  const itemPerPage = 10;
  const totalItems = totalLen;
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
    getPrivateList();
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
    getPrivateList();
  };

  const handleImportantCheck = (
    id: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    // todo : 중요 선수 등록/삭제 api (id)
  };

  const handleRowClick =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      router.push(`/privateData/${id}`);
    };

  const getPrivateList = async () => {
    const queryParams: PlayersRequestType =
      searchGrader === "ALL" ? {} : { playerGrade: searchGrader };

    if (searchCategory === "name") {
      queryParams.name = searchKeyword;
    }
    if (searchCategory === "position") {
      queryParams.position = searchKeyword;
    }

    await Api.v1GetPlayers(queryParams, currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;
        const tempData: PrivateDataType[] = [];

        content.map((item: PlayersResponseType) => {
          const grade =
            item.playerGrade === "FIRST" ? "1군" : "SECOND" ? "2군" : "부상자";
          tempData.push({
            position: item.positions.join(", "),
            belongto: grade,
            ...item,
          });
        });

        setData(tempData);
        setTotalLen(totalElements);
      }
    );
  };

  useEffect(() => {
    getPrivateList();
  }, [page]);

  return (
    <Layout>
      <h1 className="text-[28px] font-[700]">개인 데이터</h1>
      <Search onClickSubmit={getPrivateList} />
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        <Table
          columns={columns}
          data={data || []}
          onClickRow={handleRowClick}
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
    </Layout>
  );
};

export default PrivateData;
