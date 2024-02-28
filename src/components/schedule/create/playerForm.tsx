import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  PlayerSimpleResponseType,
  PlayerSimpleDataType,
  CheckboxType,
} from "@/types/schedule";
import usePagination from "@/utils/hooks/usePagination";
import Pagination from "@/components/common/pagination";
import Table from "@/components/common/table";
import { columnData } from "@/constants/mock/schedule";
import { searchPlayerGraderSelector } from "@/recoil/search/searchState";
import { playerCheckSelector } from "@/recoil/schedule/scheduleState";
import Api from "@/api/schedule";

const PlayerForm = () => {
  const [searchGrader, setSearchGrader] = useRecoilState(
    searchPlayerGraderSelector
  );
  const setCheckbox = useSetRecoilState(playerCheckSelector);

  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(1);
  const [data, setData] = useState<PlayerSimpleDataType[]>([]);
  const [playerGrader, setPlayerGrader] = useState<string>("");

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

  const getPlayerSimpleList = async () => {
    const getGrader = () => {
      return playerGrader !== "ALL" ? playerGrader : "";
    };

    await Api.v1GetPlayerList(getGrader(), currentPage, itemPerPage).then(
      (res) => {
        const { content, totalElements } = res.data;

        const tempContent: PlayerSimpleDataType[] = [];
        const initCheckbox: CheckboxType[] = [];
        content.map((item: PlayerSimpleResponseType) => {
          const grade =
            item.playerGrade === "FIRST"
              ? "1군"
              : item.playerGrade === "SECOND"
                ? "2군"
                : "부상자";

          tempContent.push({
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

        setCheckbox(initCheckbox);

        setData([...tempContent]);
        setTotalLen(totalElements);
      }
    );
  };

  useEffect(() => {
    setPlayerGrader(searchGrader);
  }, [searchGrader]);

  useEffect(() => {
    getPlayerSimpleList();
  }, [page]);

  useEffect(() => {
    if (currentPage !== 0) {
      handlePageChange(0);
    } else {
      getPlayerSimpleList();
    }
  }, [playerGrader]);

  return (
    <>
      {data.length !== 0 ? (
        <div className="w-full mt-20 bg-white py-4 my-4 px-4 rounded-[4px]">
          <Table columns={columnData} data={data || []} isCheckboxUse={true} />
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
          선수 데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default PlayerForm;
