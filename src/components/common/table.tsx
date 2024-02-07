import React, { MouseEvent, forwardRef, useEffect, useState } from "react";
import { useTable, Column, useRowSelect } from "react-table";
import { cls } from "../../libs/commons/utils";
import { useRecoilState } from "recoil";

export interface Data {
  id?: number;
  name?: string;
  age?: number;
  tel?: string;
}

interface TableProps {
  columns: Column[];
  data: Data[];
  onClickRow?: (id: number) => (e: MouseEvent<HTMLDivElement>) => void;
  isSelectedCheckbox?: boolean;
  onSelect?: (selectedRows: any) => void;
}

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const Table = ({
  columns,
  data,
  onClickRow,
  isSelectedCheckbox,
  onSelect,
}: TableProps) => {
  // const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => {
      if (isSelectedCheckbox) {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox
                {...row.getToggleRowSelectedProps()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            ),
          },
          ...columns,
        ];
      }
      return columns;
    });
  });

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedFlatRows.map((row) => row.original.id));
    }
  }, [selectedFlatRows]);

  // 토글 아코디언
  // const onToggleRow = (id: number) => {
  //   const isRowExpanded = expandedRows.includes(id);
  //   if (isRowExpanded) {
  //     setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
  //   } else {
  //     setExpandedRows([...expandedRows, id]);
  //   }
  // };

  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={cls("py-[20px] text-[14px]")}
                    {...column.getHeaderProps()}
                  >
                    <div className="flex items-center justify-center">
                      <span>{column.render("Header")}</span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="text-center divide-y-[1px]"
            {...getTableBodyProps()}
          >
            {rows.map((row) => {
              prepareRow(row);
              // const isRowExpanded = expandedRows.includes(row.values.id);
              return (
                <>
                  <tr
                    onClick={onClickRow(row.original.id)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="py-[20px] text-[14px] whitespace-normal "
                          {...cell.getCellProps()}
                        >
                          <div>
                            <span>{cell.render("Cell")}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {/* {isRowExpanded && (
                    <tr key={`expanded_${row.values.id}`}>
                      <td colSpan={columns.length}>
                        <div className="p-4 w-full">
                          {row.values.type === "GENERAL" && (
                            <ExpGeneralTable queryId={row.values.id} />
                          )}
                          {row.values.type === "PRESCRIPTION" && (
                            <ExpPriscriptionTable queryId={row.values.id} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )} */}
                </>
              );
            })}
          </tbody>
          {/* <pre>
            <code>
              {JSON.stringify(
                {
                  데이터: selectedFlatRows.map((row) => row.original),
                },
                null,
                2
              )}
            </code>
          </pre> */}
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
