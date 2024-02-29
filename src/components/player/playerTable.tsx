import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { cls } from "@/utils";
import { TableRowType } from "@/types/common";
import { playerApproveCheckSelector } from "@/recoil/player/playerState";
import Button from "@/components/common/button";
import { PlayerTableType, CheckboxType } from "@/types/player";
import DropDown from "@/components/common/dropdown";
import { belongtoList } from "@/constants/mock/searchCategoryList";

const TableRow = ({ column, data }: TableRowType) => {
  const accessor = column?.accessor;
  if (!accessor) return null;

  const formatData = (item: any) => {
    if (typeof item === "number") {
      const roundedNum = parseFloat(item.toFixed(2));
      return roundedNum;
    }
    return item;
  };

  return (
    <td className="py-[20px] px-[20px] text-[14px] whitespace-normal">
      <div>
        <span>{formatData(data[accessor.toString()]) || "-"}</span>
      </div>
    </td>
  );
};

const PlayerTable = ({
  columns,
  data,
  onClickApprove,
  onClickDisapprove,
  onClickAllApprove,
}: PlayerTableType) => {
  const [initCheckList, setInitCheckList] = useRecoilState(
    playerApproveCheckSelector
  );
  const [checkList, setCheckList] = useState<CheckboxType[]>(initCheckList);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [belongto, setBelongto] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);

  const isChecked = (id: number) => {
    return checkList.find((checkItem) => checkItem.id === id)?.check || false;
  };

  const toggleCheck = (id: number) => {
    setCheckList((prevCheckList) => {
      const updateCheckedList = prevCheckList.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        }
        return item;
      });

      setIsCheckAll(isAllChecked(updateCheckedList));

      return updateCheckedList;
    });
  };

  const setAllCheck = () => {
    setIsCheckAll((prevCheck) => {
      const newCheck = !prevCheck;

      setCheckList((prevCheckList) => {
        return prevCheckList.map((item) => {
          return { ...item, check: newCheck };
        });
      });

      return newCheck;
    });
  };

  const isAllChecked = (list: CheckboxType[]) => {
    return list.every((item) => item.check === true);
  };

  const onBelongtoChange = (grade: string) => {
    setCheckList((prevCheckList) => {
      const updateCheckedList = prevCheckList.map((item) => {
        if (item.id === userId) {
          return { ...item, belongto: grade };
        }
        return item;
      });

      return updateCheckedList;
    });
  };

  useEffect(() => {
    setInitCheckList(checkList);
  }, [checkList]);

  useEffect(() => {
    setCheckList(initCheckList);
  }, [initCheckList]);

  useEffect(() => {
    setIsCheckAll(false);
  }, [data]);

  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-full h-full py-[20px] flex justify-center items-center cursor-pointer">
                <Image
                  src={
                    isCheckAll
                      ? "/icons/checkbox_on.svg"
                      : "/icons/checkbox_off.svg"
                  }
                  width={0}
                  height={0}
                  alt="like button"
                  style={{ width: "30px", height: "auto" }}
                  onClick={setAllCheck}
                />
              </th>
              {columns.map((column, idx) => (
                <th
                  key={`column${idx}`}
                  className={cls("min-w-[110px] py-[20px] text-[14px]")}
                >
                  <div className="flex items-center justify-center">
                    <span>{column.Header?.toString()}</span>
                  </div>
                </th>
              ))}
              <th className="min-w-[110px] py-[20px] text-[14px]">소속</th>
              <th onClick={() => onClickAllApprove && onClickAllApprove()}>
                <Button
                  text="일괄승인"
                  type="button"
                  classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                />
              </th>
            </tr>
          </thead>
          <tbody className="text-center divide-y-[1px]">
            {data.map((item: any, idx: any) => {
              // const isRowExpanded = expandedRows.includes(row.values.id);
              return (
                <tr
                  key={`data${idx}`}
                  className="cursor-pointer hover:bg-[#eefdd3] transition-colors"
                >
                  <td className="min-w-[40px] h-full py-[20px] flex justify-center items-center cursor-pointer">
                    <Image
                      src={
                        isChecked(item.userId)
                          ? "/icons/checkbox_on.svg"
                          : "/icons/checkbox_off.svg"
                      }
                      width={0}
                      height={0}
                      alt="like button"
                      style={{ width: "30px", height: "auto" }}
                      onClick={() => toggleCheck(item.userId)}
                    />
                  </td>
                  {columns.map((col, index) => {
                    return (
                      <TableRow
                        key={`rowData${idx}${index}`}
                        column={col}
                        data={item}
                      />
                    );
                  })}
                  <td
                    className="w-[160px] py-[20px] cursor-pointer"
                    onClick={() => setUserId(item.userId)}
                  >
                    <DropDown
                      dropDownList={belongtoList}
                      text="소속변경"
                      isSize="small"
                      changeText={onBelongtoChange}
                    />
                  </td>
                  <td className="py-[20px] cursor-pointer">
                    <div className="flex space-x-2">
                      <div
                        onClick={() =>
                          onClickDisapprove &&
                          onClickDisapprove(false, Number(item.userId))
                        }
                      >
                        <Button
                          text="거절"
                          type="button"
                          classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                        />
                      </div>
                      <div
                        onClick={() =>
                          onClickApprove &&
                          onClickApprove(true, Number(item.userId))
                        }
                      >
                        <Button
                          text="승인"
                          type="button"
                          classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default PlayerTable;
