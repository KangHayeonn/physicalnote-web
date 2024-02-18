import React, { useState } from "react";
import Image from "next/image";
import { cls } from "@/utils";
import { useRecoilState } from "recoil";
import { PrivateDataType } from "@/types/privateData";
import { TableType, TableRowType } from "@/types/common";

const TableRow = ({ column, data }: TableRowType) => {
  const accessor = column?.accessor;
  if (!accessor) return null;

  return (
    <td className="py-[20px] text-[14px] whitespace-normal ">
      <div>
        <span>{data[accessor.toString()] || "-"}</span>
      </div>
    </td>
  );
};

const Table = ({
  columns,
  data,
  onClickRow,
  isSelectedCheckbox,
  onSelect,
}: TableType) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              {isSelectedCheckbox ? <th></th> : null}
              {columns.map((column, idx) => (
                <th
                  key={`column${idx}`}
                  className={cls("py-[20px] text-[14px]")}
                >
                  <div className="flex items-center justify-center">
                    <span>{column.Header?.toString()}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center divide-y-[1px]">
            {data.map((item, idx) => {
              // const isRowExpanded = expandedRows.includes(row.values.id);
              return (
                <tr
                  key={`data${idx}`}
                  onClick={onClickRow && onClickRow(Number(item.id))}
                  className="cursor-pointer hover:bg-[#eefdd3] transition-colors"
                >
                  {isSelectedCheckbox && (
                    <td className="py-[20px] text-[14px] whitespace-normal ">
                      <div>
                        {isChecked ? (
                          <Image
                            src="/images/star_checked.svg"
                            width={0}
                            height={0}
                            alt="unlike button"
                            style={{ width: "18px", height: "auto" }}
                          />
                        ) : (
                          <Image
                            src="/images/star_unchecked.svg"
                            width={0}
                            height={0}
                            alt="unlike button"
                            style={{ width: "18px", height: "auto" }}
                          />
                        )}
                      </div>
                    </td>
                  )}
                  {columns.map((col, index) => {
                    return (
                      <TableRow
                        key={`rowData${idx}${index}`}
                        column={col}
                        data={item}
                      />
                    );
                  })}
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

export default Table;
