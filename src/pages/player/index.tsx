import { NextPage } from "next";
import { useState, useEffect } from "react";
import usePagination from "@/utils/hooks/usePagination";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Search from "@/components/common/search";
import Table from "@/components/common/table";
import Pagination from "@/components/common/pagination";
import DropDown from "@/components/common/dropdown";
import Button from "@/components/common/button";
import { belongtoList } from "@/constants/mock/searchCategoryList";
import { columnData } from "@/constants/player";
import { PlayerListDataType, PlayerListResponseType } from "@/types/player";
import PrivateApi from "@/api/privateData";
import PlayerApi from "@/api/player";
import { showToast } from "@/utils";
import { SearchFilterType } from "@/types/report";
import { useRecoilValue } from "recoil";
import {
  searchPlayerGraderSelector,
  searchCategorySelector,
  searchKeywordSelector,
} from "@/recoil/search/searchState";
import { PlayersRequestType } from "@/types/privateData";
import { CheckboxType } from "@/types/schedule";

const ManagePlayer: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(1);
  const [belongto, setBelongto] = useState<string>("");
  const [data, setData] = useState<PlayerListDataType[]>([]);
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>({
    playerGrader: "ALL",
    category: "",
    keyword: "",
  });
  const searchGrader = useRecoilValue(searchPlayerGraderSelector);
  const searchCategory = useRecoilValue(searchCategorySelector);
  const searchKeyword = useRecoilValue(searchKeywordSelector);

  const onBelongtoChange = (belongto: string) => {
    setBelongto(belongto);
  };

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

  const handleDetailClick = (id: number) => {
    router.push(`/player/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    // todo : delete api
  };

  const handleAllDeleteClick = () => {
    // todo : delete all api
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

  const getPlayerList = async () => {
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

    await PlayerApi.v1GetPlayers(queryParams, currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;

        const tempData: PlayerListDataType[] = [];
        const initCheckbox: CheckboxType[] = [];

        content.map((item: PlayerListResponseType) => {
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

          initCheckbox.push({
            id: item.id,
            name: item.name,
            check: false,
          });
        });

        // setCheckbox(initCheckbox);

        setData(tempData);
        setTotalLen(totalElements);
      }
    );
  };

  const resetPage = () => {
    handlePageChange(0);
  };

  useEffect(() => {
    getPlayerList();
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
      <h1 className="text-[28px] font-[700]">선수관리</h1>
      <Search onClickSubmit={getPlayerList} resetPage={resetPage} />
      <div className="flex items-center justify-end space-x-2">
        <DropDown
          dropDownList={belongtoList}
          text="소속변경"
          changeText={onBelongtoChange}
        />
        <Button
          text="변경"
          type="button"
          classnames="bg-white border-[#ededed] text-[#8DBE3D] px-[16px] h-[36px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:font-[700]"
        />
      </div>
      <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
        <Table
          columns={columnData}
          data={data || []}
          onClickDetail={handleDetailClick}
          onClickDelete={handleDeleteClick}
          onClickAllDelete={handleAllDeleteClick}
          isSelectedCheckbox={true}
          isCheckboxUse={true}
          isDetail={true}
          isDelete={true}
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

export default ManagePlayer;
