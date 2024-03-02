import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import ModalForm from "@/components/common/modal/modalForm";
import PlayerTable from "@/components/player/playerTable";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import { CategoryModalProps } from "@/types/schedule";
import { playerApproveCheckSelector } from "@/recoil/player/playerState";
import Api from "@/api/player";
import {
  ApprovePlayerListType,
  ApprovePlayerResponseType,
  CheckboxType,
} from "@/types/player";
import { columnData2 } from "@/constants/mock/player";
import { showToast } from "@/utils";

const PlayerRequestModal = ({ setIsOpen, handleEvent }: CategoryModalProps) => {
  const [checkbox, setCheckbox] = useRecoilState(playerApproveCheckSelector);
  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(1);
  const [data, setData] = useState<ApprovePlayerListType[]>([]);

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

  const onClickClose = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
    handleEvent();
  };

  const handleApprove = async (approvalYn: boolean, id: number) => {
    const player = checkbox.filter((item) => item.id === id);

    if (player.length === 0) return;
    if (player[0].belongto === "") {
      showToast("소속을 선택해주세요.");
      return;
    }

    const params = {
      approvalYn,
      playerGrade: player[0].belongto,
      userIds: [id],
    };

    await Api.v1ApprovePlayerRequests(params).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        data.approvalYn
          ? showToast("선수 요청을 승인하였습니다.")
          : showToast("선수 요청을 거절하였습니다.");
      }
      handlePageChange(0);
      getPlayerRequest();
    });
  };

  const handleAllApprove = async () => {
    const checkedItems = checkbox.filter((item) => item.check);

    const checkedPlayerIds = checkedItems.map((item) => item.id);
    const checkedPlayerBelongto = [
      ...new Set(checkedItems.map((item) => item.belongto)),
    ];

    if (checkedPlayerIds.length === 0) {
      showToast("선택된 선수가 없습니다.");
      return;
    }

    if (checkedPlayerBelongto.length > 1) {
      showToast("동일한 소속으로 선택해주세요.");
      return;
    }

    if (checkedPlayerBelongto[0] === "") {
      showToast("소속을 선택해주세요.");
      return;
    }

    const params = {
      approvalYn: true,
      playerGrade: checkedPlayerBelongto[0],
      userIds: checkedPlayerIds,
    };

    await Api.v1ApprovePlayerRequests(params).then((res) => {
      const { status } = res;
      if (status === 200) {
        showToast("선수 요청을 승인하였습니다.");
      }
      handlePageChange(0);
      getPlayerRequest();
    });
  };

  const getPlayerRequest = async () => {
    await Api.v1GetPlayerRequests(currentPage, itemPerPage).then((res) => {
      const { content, totalElements } = res?.data;

      const tempData: ApprovePlayerListType[] = [];
      const initCheckbox: CheckboxType[] = [];

      content?.map((item: ApprovePlayerResponseType) => {
        const names = item.positions.map((position) => position.name);

        tempData.push({
          name: item.userName,
          position: names.join(" / "),
          ...item,
        });

        initCheckbox.push({
          id: item.userId,
          name: item.userName,
          check: false,
          belongto: "",
        });
      });

      setData(tempData);
      setCheckbox(initCheckbox);
      setTotalLen(totalElements);
    });
  };

  useEffect(() => {
    getPlayerRequest();
  }, [page]);

  return (
    <ModalForm onClickEvent={onClickClose}>
      <div>
        <h1 className="text-[28px] font-[700] ml-10">미등록 선수 승인하기</h1>
        {data.length !== 0 ? (
          <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
            <PlayerTable
              columns={columnData2}
              data={data || []}
              onClickApprove={handleApprove}
              onClickDisapprove={handleApprove}
              onClickAllApprove={handleAllApprove}
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
            미등록 선수가 없습니다.
          </div>
        )}
      </div>
    </ModalForm>
  );
};

export default PlayerRequestModal;
