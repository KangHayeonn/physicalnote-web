import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";
import Pagination from "@/components/common/pagination";
import usePagination from "@/utils/hooks/usePagination";
import DatePickerComponent from "@/components/common/datepicker";
import PlayerHooperIndex from "@/components/privateData/playerHooperIndex";
import { cls } from "@/utils";
import Api from "@/api/privateData";
import { playerDetailRowTitle } from "@/constants/mock/privateData";
import {
  PlayerTotalInfoType,
  PlayerMonthDataType,
  PrivateTableRowType,
  PlayerInfoType,
} from "@/types/privateData";
import { getDateFormatMonthDay, getDateToString } from "@/utils/dateFormat";
import Button from "@/components/common/button";

const PrivateDataDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<number>(0);
  const [totalLen, setTotalLen] = useState<number>(0);
  const [searchYear, setSearchYear] = useState<Date | null>(new Date());
  const [userInfo, setUserInfo] = useState<PlayerInfoType>({
    userId: 0,
    profile: "",
    name: "가선수",
    positions: ["미드필더"],
    importantYn: false,
  });
  const [totalInfo, setTotalInfo] = useState<PlayerTotalInfoType>();
  const [monthData, setMonthData] = useState<PlayerMonthDataType[]>([]);

  // pagination
  const itemPerPage = 10;
  const totalItems = totalLen; // data length
  const { currentPage, totalPages, currentItems, handlePageChange } =
    usePagination((page) => setPage(page), itemPerPage, totalItems);

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
    getPlayerDetail();
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
    getPlayerDetail();
  };

  const getPlayerDetail = async () => {
    await Api.v1GetPlayerDetail(
      Number(id),
      getDateToString(searchYear || new Date()),
      currentPage,
      itemPerPage
    ).then((res) => {
      const { content, totalElements } = res.data;
      if (content.length > 0) {
        setUserInfo({ ...content[0]?.userSimpleInfo });
        setTotalInfo({ ...content[0]?.totalInfo });
        setMonthData([...content[0]?.dataList]);
        setTotalLen(totalElements);
      }
    });
  };

  const getTotalResult = (
    data: PlayerTotalInfoType,
    key: string,
    word: string
  ) => {
    let result = null;
    Object.keys(data).find((item) => {
      if (item.startsWith(key) && item.includes(word)) {
        result = Number(data[item]).toFixed(1);
        return true;
      }
      return false;
    });
    return result || "-";
  };

  const goBack = () => {
    router.back();
  };

  const resetPage = () => {
    handlePageChange(0);
  };

  useEffect(() => {
    if (id) {
      getPlayerDetail();
    }
  }, [searchYear, page]);

  const TableRow = ({ column, data }: PrivateTableRowType) => {
    const key = column?.key;
    if (!key) return null;

    return (
      <td className="py-[20px] text-[14px] whitespace-normal">
        <div>
          <span>
            {data[key.toString()] !== undefined ? data[key.toString()] : "-"}
          </span>
        </div>
      </td>
    );
  };

  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex space-x-2">
          <h1 className="text-[28px] font-[700]">
            개인 데이터 _{" "}
            <span className="text-[20px]">
              {userInfo.name}({userInfo.positions?.join(" / ")})
            </span>
          </h1>
          {userInfo.importantYn ? (
            <Image
              src="/images/star_checked.svg"
              width={0}
              height={0}
              alt="like button"
              style={{ width: "30px", height: "auto" }}
            />
          ) : (
            <Image
              src="/images/star_unchecked.svg"
              width={0}
              height={0}
              alt="like button"
              style={{ width: "30px", height: "auto" }}
            />
          )}
        </div>
        <div className="flex items-center justify-end">
          <DatePickerComponent
            calendarType="yearMonth"
            changeYear={setSearchYear}
            onClick={resetPage}
          />
        </div>
        <div className="bg-white py-4 my-4 px-4 rounded-[4px]">
          {monthData.length !== 0 ? (
            <>
              <table className="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th className={cls("py-[20px] text-[14px] bg-[#eefdd3]")}>
                      <div>
                        <span>전체평균</span>
                      </div>
                    </th>
                    <th className={cls("py-[20px] text-[14px] bg-[#eefdd3]")}>
                      <div>
                        <span>전체평균오차</span>
                      </div>
                    </th>
                    <th className={cls("py-[20px] text-[14px] bg-[#eefdd3]")}>
                      <div>
                        <span>지난 30일 평균</span>
                      </div>
                    </th>
                    {monthData.map((data, idx) => {
                      return (
                        <th
                          key={`column${idx}`}
                          className={cls("py-[20px] text-[14px]")}
                        >
                          <div>
                            <span>
                              {getDateFormatMonthDay(new Date(data.date))}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="text-center divide-y-[1px]">
                  {playerDetailRowTitle.map((row, idx) => {
                    return (
                      <tr
                        key={row.key}
                        className="cursor-pointer transition-colors"
                      >
                        <td className="py-[20px] text-[14px] whitespace-normal">
                          {row.value}
                        </td>
                        <td className="py-[20px] text-[14px] whitespace-normal bg-[#eefdd3]">
                          {totalInfo
                            ? getTotalResult(totalInfo, row.key, "TotalAvg")
                            : "-"}
                        </td>
                        <td className="py-[20px] text-[14px] whitespace-normal bg-[#eefdd3]">
                          {totalInfo
                            ? getTotalResult(totalInfo, row.key, "TotalStdDev")
                            : "-"}
                        </td>
                        <td className="py-[20px] text-[14px] whitespace-normal bg-[#eefdd3]">
                          {totalInfo
                            ? getTotalResult(
                                totalInfo,
                                row.key,
                                "Last30MonthAvg"
                              )
                            : "-"}
                        </td>
                        {monthData.map((rowData, index) => {
                          return (
                            <TableRow
                              key={`rowData${idx}${index}`}
                              column={row}
                              data={rowData}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPage={totalPages}
                onPageChange={handlePageChange}
                setPage={setPage}
                next={next}
                prev={prev}
              />
              <PlayerHooperIndex />
              <div className="flex items-center justify-end py-8">
                <Button
                  type="button"
                  text="뒤로가기"
                  classnames="text-[#8DBE3D] text-[12px] font-[700]"
                  onClick={goBack}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full py-10 font-bold">
              데이터가 없습니다.
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default PrivateDataDetail;
