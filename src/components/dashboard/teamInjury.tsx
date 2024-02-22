import React, { useState, useEffect } from "react";
import usePagination from "@/utils/hooks/usePagination";
import Item from "@/components/common/item";
import { useRecoilValue } from "recoil";
import Pagination2 from "@/components/common/pagination02";
import { teamInjuryState } from "@/recoil/dashboard/dashboardState";
import {
  TeamInjuryInfoType,
  LevelCircleType,
  PaginationProps,
} from "@/types/dashboard";

const TeamInjury = ({ initPage, getData }: PaginationProps) => {
  const teamInjuryInfo = useRecoilValue(teamInjuryState);
  const [teamInjury, setTeamInjury] = useState<TeamInjuryInfoType>({
    teamInjuryCnt: 0,
    injuryInfoList: [],
  });
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // pagination
  const itemPerPage = 4;
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

  const goPlayerDetail = (playerId: number) => {
    // todo : 선수 상세보기 페이지 이동
  };

  const LevelCircle = ({ level }: LevelCircleType) => {
    if (!level) {
      return (
        <div className="flex items-center space-x-1">
          <div className="text-[12px] text-[#000]">-</div>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-1">
        {level === "0단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#8DBE3D] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
        {level === "1단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#B7D487] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
        {level === "2단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#FBDD73] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
        {level === "3단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#FFC808] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
        {level === "4단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#F27C21] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
        {level === "5단계" && (
          <div className="px-3 py-0.5 ml-3 bg-[#FF0000] font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {level}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    handlePageChange(0);
  }, [initPage]);

  useEffect(() => {
    getData(currentPage);
  }, [page]);

  useEffect(() => {
    if (teamInjuryInfo) {
      setTeamInjury(teamInjuryInfo);
      const length = teamInjuryInfo.injuryInfoList.length;
      setTotalLength(teamInjuryInfo.teamInjuryCnt);
      setIsOpen(Array.from({ length }, () => false));
    }
  }, [teamInjuryInfo]);

  return (
    <div className="flex flex-col col-span-5 space-y-2">
      <h2 className="text-[20px] font-[500]">부상자 현황</h2>
      <div className="flex justify-between">
        <div>
          <div className="flex flex-col space-y-2">
            <span className="text-[15px] font-[400]">
              ■ 총 부상자 :{" "}
              {teamInjury.teamInjuryCnt < 10
                ? `0${teamInjury.teamInjuryCnt}`
                : teamInjury.teamInjuryCnt}
              명
            </span>
          </div>
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
      {teamInjury.teamInjuryCnt !== 0 ? (
        <div className="w-full grid grid-cols-4 gap-10">
          {teamInjury?.injuryInfoList.map((el, idx) => (
            <div key={`injury${idx}`} onClick={() => toggleEvent(idx)}>
              {!isOpen[idx] ? (
                <Item
                  key={`teamInjury${idx}`}
                  imageUrl={el.userInfo.profile}
                  position={el.userInfo.positions.join("/")}
                  name={el.userInfo.name}
                />
              ) : (
                <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-[150px] h-[182px] flex flex-col justify-start items-center space-y-1 p-2">
                  <div className="w-full flex justify-start text-[14px] font-[700] mt-1 mb-2">
                    <span>{`${el.userInfo.positions.join("/")} ${el.userInfo.name}`}</span>
                  </div>
                  {el.injuryInfo.map((item, index) => (
                    <div
                      key={`injuryItem${index}`}
                      className="w-full text-[12px] space-y-1"
                    >
                      {index < 2 && (
                        <>
                          <div className="text-[14px]">{`${index + 1}. ${item.injuryOfString}`}</div>
                          <LevelCircle level={item.injuryDetails} />
                        </>
                      )}
                    </div>
                  ))}
                  <div
                    className="flex item-center justify-center text-[11px] pt-2"
                    onClick={() => goPlayerDetail(el.userInfo.userId)}
                  >
                    <span className="underline">상세보기</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-[400]">
          부상자가 없습니다.
        </div>
      )}
    </div>
  );
};

export default TeamInjury;
