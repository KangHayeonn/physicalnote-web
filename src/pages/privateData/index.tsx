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
import { showToast } from "@/utils";
import { SearchFilterType } from "@/types/report";

const PrivateData: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [data, setData] = useState<PrivateDataType[]>([]);
  const [totalLen, setTotalLen] = useState<number>(0);
  const searchGrader = useRecoilValue(searchPlayerGraderState);
  const searchCategory = useRecoilValue(searchCategoryState);
  const searchKeyword = useRecoilValue(searchKeywordState);
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
    playerGrader: "ALL",
    category: "",
    keyword: "",
  });

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

  const handleRowClick =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      router.push(`/privateData/${id}`);
    };

  const getPrivateList = async () => {
    const queryParams: PlayersRequestType =
      searchFilter.playerGrader === "ALL"
        ? {}
        : { playerGrade: searchFilter.playerGrader };

    if (searchFilter.category === "name") {
      queryParams.name = searchFilter.keyword;
    }
    if (searchFilter.category === "position") {
      queryParams.position = searchFilter.keyword;
    }

    await Api.v1GetPlayers(queryParams, currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;
        const tempData: PrivateDataType[] = [];

        content.map((item: PlayersResponseType) => {
          const grade =
            item.playerGrade === "FIRST"
              ? "1군"
              : item.playerGrade === "SECOND"
                ? "2군"
                : "부상자";
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

  const resetPage = () => {
    handlePageChange(0);
  };

  useEffect(() => {
    getPrivateList();
  }, [page]);

  useEffect(() => {
    setSearchFilter({
      playerGrader: searchGrader,
      category: searchCategory,
      keyword: searchKeyword,
    });
  }, [searchGrader, searchCategory, searchKeyword]);

  return (
    <Layout>
      <h1 className="text-[28px] font-[700]">개인 데이터</h1>
      <Search onClickSubmit={getPrivateList} resetPage={resetPage} />
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        {data.length !== 0 ? (
          <>
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
          </>
        ) : (
          <div className="flex items-center justify-center w-full py-10 font-bold">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PrivateData;
