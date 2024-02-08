import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  Row,
  useReactTable,
  FilterFns,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import React, { Fragment, useEffect } from "react";

const InnerTable = (innerProps) => {
  console.info("Received", innerProps.innerData);

  const innerData = innerProps.innerData.map((data) => data.original);
  console.info("Extracted", innerData);
  const testTable = useReactTable({
    data: innerProps.innerData,
    columns: innerProps.itemColumns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: null,
    debugTable: true,
  });
  console.info(
    "testing this",
    testTable.getRowModel().rows[0].getVisibleCells(),
  );

  return (
    <table>
      <thead
        style={{
          display: "grid",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {testTable.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id + "inner"}
            style={{ display: "flex", width: "100%" }}
          >
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id + "inner cell"}
                  style={{
                    display: "flex",
                    width: header.getSize(),
                  }}
                >
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {testTable.getRowModel().rows.map((row) => (
          <tr key={row.id + "a"} style={{ width: "100%" }}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  background: "blue",
                  maxWidth: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InnerTable;
