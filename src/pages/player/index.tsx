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
import { columnData } from "@/constants/mock/player";
import { PlayerListDataType, PlayerListResponseType } from "@/types/player";
import PrivateApi from "@/api/privateData";
import PlayerApi from "@/api/player";
import { showToast } from "@/utils";
import { SearchFilterType } from "@/types/report";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  searchPlayerGraderSelector,
  searchCategorySelector,
  searchKeywordSelector,
} from "@/recoil/search/searchState";
import { PlayersRequestType } from "@/types/privateData";
import { CheckboxType } from "@/types/schedule";
import { playerCheckSelector } from "@/recoil/schedule/scheduleState";
import PlayerRequestModal from "@/components/player/playerRequestModal";

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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [requestCnt, setRequestCnt] = useState<number>(0);
  const searchGrader = useRecoilValue(searchPlayerGraderSelector);
  const searchCategory = useRecoilValue(searchCategorySelector);
  const searchKeyword = useRecoilValue(searchKeywordSelector);
  const [checkbox, setCheckbox] = useRecoilState(playerCheckSelector);

  const onBelongtoChange = (belongto: string) => {
    setBelongto(belongto);
  };

  // pagination
  const itemPerPage = 10;
  const totalItems = totalLen;
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

  const handleDeleteClick = async (id: number) => {
    const playerIds = [id];
    await PlayerApi.v1DeletePlayers(playerIds).then((res) => {
      const { status } = res;
      if (status === 200) {
        getPlayerList();
        showToast("선수가 일괄 삭제되었습니다.");
      }
    });
  };

  const handleAllDeleteClick = async () => {
    const checkedPlayerIds = checkbox
      .filter((item) => item.check)
      .map((item) => item.id);

    if (checkedPlayerIds.length === 0) {
      showToast("삭제할 선수를 선택해주세요.");
      return;
    }

    await PlayerApi.v1DeletePlayers(checkedPlayerIds).then((res) => {
      const { status } = res;
      if (status === 200) {
        getPlayerList();
        showToast("선수가 일괄 삭제되었습니다.");
      }
    });
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

  // 선수 소속 변경
  const onChangePlayerGrade = async () => {
    if (belongto === "") {
      showToast("변경할 소속을 선택해주세요.");
      return;
    }

    const checkedPlayerIds = checkbox
      .filter((item) => item.check)
      .map((item) => item.id);

    if (checkedPlayerIds.length === 0) {
      showToast("소속을 변경할 선수를 선택해주세요.");
      return;
    }

    const params = {
      playerGrade: belongto,
      userIds: checkedPlayerIds,
    };

    await PlayerApi.v1ChangePlayerGrade(params).then((res) => {
      const { status } = res;
      if (status === 200) {
        getPlayerList();
        showToast("소속이 정상 변경되었습니다.");
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
            position: item.positions.join(" / "),
            belongto: grade,
            ...item,
          });

          initCheckbox.push({
            id: item.id,
            name: item.name,
            check: false,
          });
        });

        setCheckbox(initCheckbox);
        setData(tempData);
        setTotalLen(totalElements);
      }
    );
  };

  const getPlayerRequest = async () => {
    await PlayerApi.v1GetPlayerRequests(0, 10).then((res) => {
      const { totalElements } = res.data;
      setRequestCnt(totalElements);
    });
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

  useEffect(() => {
    if (!isOpenModal) {
      setIsOpenModal(false);
    }
    getPlayerRequest();
  }, [isOpenModal]);

  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex items-center space-x-4">
          <h1 className="text-[28px] font-[700]">선수관리</h1>
          <button
            onClick={() => setIsOpenModal(true)}
            className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[170px] h-[25px] flex justify-center items-center space-x-2"
          >
            <span className="text-[12px] text-[#8DBE3D] font-[400]">
              미등록 선수 승인하기 : {requestCnt}명
            </span>
          </button>
        </div>
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
            onClick={onChangePlayerGrade}
          />
        </div>
        {data.length !== 0 ? (
          <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
            <Table
              columns={columnData}
              data={data || []}
              onClickDetail={handleDetailClick}
              onClickDelete={handleDeleteClick}
              onClickAllDelete={handleAllDeleteClick}
              onSelect={handleImportantCheck}
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
        ) : (
          <div>
            <div className="flex items-center justify-center w-full py-10 font-bold">
              등록된 선수가 없습니다.
            </div>
            <div
              className="flex items-center justify-center w-full"
              onClick={() => setIsOpenModal(true)}
            >
              <Button
                text="승인하기"
                type="button"
                classnames="bg-white border-[#ededed] text-[#B9B9C3] px-[16px] w-[80px] h-[25px]
                 rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] hover:font-[700] text-[12px]"
              />
            </div>
          </div>
        )}
      </Layout>
      {isOpenModal && (
        <PlayerRequestModal
          setIsOpen={setIsOpenModal}
          handleEvent={getPlayerList}
        />
      )}
    </div>
  );
};

export default ManagePlayer;
