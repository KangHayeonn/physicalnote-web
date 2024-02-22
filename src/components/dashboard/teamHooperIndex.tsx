import React, { useState, useEffect } from "react";
import usePagination from "@/utils/hooks/usePagination";
import Item from "@/components/common/item";
import { useRecoilValue } from "recoil";
import { teamHooperIndexState } from "@/recoil/dashboard/dashboardState";
import {
  TeamHooperIndexInfoType,
  LevelCircleType,
  PaginationProps,
} from "@/types/dashboard";
import Pagination2 from "@/components/common/pagination02";

const TeamHooperIndex = ({ initPage, getData }: PaginationProps) => {
  const hooperIndex = useRecoilValue(teamHooperIndexState);
  const [teamCaution, setTeamCaution] = useState<TeamHooperIndexInfoType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // pagination
  const itemPerPage = 6;
  const totalItems = totalLength;
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

  const toggleEvent = (idx: number) => {
    const tempIsOpen = [...isOpen];
    tempIsOpen[idx] = !tempIsOpen[idx];

    setIsOpen(tempIsOpen);
  };

  useEffect(() => {
    handlePageChange(0);
  }, [initPage]);

  useEffect(() => {
    getData(currentPage);
  }, [page]);

  useEffect(() => {
    if (hooperIndex) {
      setTeamCaution(hooperIndex.content);
      const length = hooperIndex.content.length;
      setTotalLength(hooperIndex.totalElements);
      setIsOpen(Array.from({ length }, () => false));
    }
  }, [hooperIndex]);

  const LevelCircle = ({ level }: LevelCircleType) => {
    if (!level) {
      return (
        <div className="flex items-center space-x-1">
          <div className="text-[12px] text-[#000]">-</div>
        </div>
      );
    }

    const isLevelTrue = (key: string) => {
      return level.includes(key);
    };

    return (
      <div className="flex items-center space-x-1">
        {isLevelTrue("위험") && (
          <>
            <div className="text-[12px] text-[#C1C1C1]">위험</div>
            <div className="w-[12px] h-[12px] bg-[#FF0000] rounded-[50%]"></div>
          </>
        )}
        {isLevelTrue("관리요망") && (
          <>
            <div className="text-[12px] text-[#C1C1C1]">관리요망</div>
            <div className="w-[12px] h-[12px] bg-[#FFCD1D] rounded-[50%]"></div>
          </>
        )}
        {isLevelTrue("적정") && (
          <>
            <div className="text-[12px] text-[#C1C1C1]">적정</div>
            <div className="w-[12px] h-[12px] bg-[#1EAD2D] rounded-[50%]"></div>
          </>
        )}
        {isLevelTrue("좋음") && (
          <>
            <div className="text-[12px] text-[#C1C1C1]">좋음</div>
            <div className="w-[12px] h-[12px] bg-[#7230FF] rounded-[50%]"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="col-span-7 flex flex-col space-y-2">
      <div className="flex justify-between">
        <div className="space-x-2">
          <span className="text-[15px] font-[400] ">■ 관찰대상</span>
          <em className="text-[12px] text-[#FF0000] font-[400] not-italic">
            (컨디션조절이 필요해요!)
          </em>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Pagination2
            currentPage={currentPage}
            totalPage={totalPages}
            next={next}
            prev={prev}
          />
        </div>
      </div>
      {teamCaution.length !== 0 ? (
        <div className="grid grid-cols-6 gap-10">
          {teamCaution.map((el, idx) => (
            <div key={`hooper-index${idx}`} onClick={() => toggleEvent(idx)}>
              {!isOpen[idx] ? (
                <Item
                  key={`teamCaution${idx}`}
                  imageUrl={el.userInfo.profile}
                  position={el.userInfo.positions.join("/")}
                  name={el.userInfo.name}
                />
              ) : (
                <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-[150px] h-[182px] flex flex-col justify-center items-center space-y-1 p-2">
                  <div className="w-full flex justify-start text-[14px] font-[700] mb-3">
                    <span>{`${el.userInfo.positions.join("/")} ${el.userInfo.name}`}</span>
                  </div>
                  <div className="w-full flex justify-between text-[12px]">
                    <div className="text-[14px]">수면의 질</div>
                    <LevelCircle level={el.hooperIndexInfo?.sleep} />
                  </div>
                  <div className="w-full flex justify-between text-[12px]">
                    <div className="text-[14px]">스트레스</div>
                    <LevelCircle level={el.hooperIndexInfo?.stress} />
                  </div>
                  <div className="w-full flex justify-between text-[12px]">
                    <div className="text-[14px]">피로</div>
                    <LevelCircle level={el.hooperIndexInfo?.fatigue} />
                  </div>
                  <div className="w-full flex justify-between text-[12px]">
                    <div className="text-[14px]">근육통</div>
                    <LevelCircle level={el.hooperIndexInfo?.muscleSoreness} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-[400]">
          관찰대상이 없습니다.
        </div>
      )}
    </div>
  );
};

export default TeamHooperIndex;
