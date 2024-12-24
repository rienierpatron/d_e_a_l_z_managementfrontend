import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";

// Column Filter Component
const ColumnFilter = ({ column }) => {
  const isStatusColumn = column.columnDef.header === "Status";

  return (
    <div className="flex flex-1 items-center gap-2 relative">
      {column.columnDef.filterIcon && (
        <img
          src={column.columnDef.filterIcon}
          alt="Filter Icon"
          className="w-5 h-5 absolute left-5"
        />
      )}
      {isStatusColumn ? (
        <select
          value={column.getFilterValue() || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          className="pl-11 pr-4 py-3 border border-gray-300 rounded-3xl text-sm w-full"
        >
          <option value="">Status</option>
          <option value="Draft">Draft</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Approved & Scheduled">Approved & Scheduled</option>
          <option value="Close">Close</option>
        </select>
      ) : (
        <input
          value={column.getFilterValue() || ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={column.columnDef.header}
          className="pl-12 pr-4 py-3 border border-gray-300 rounded-3xl text-sm w-full"
        />
      )}
    </div>
  );
};

// Pagination Controls
const PaginationControls = ({ table }) => (
  <div className="flex items-center justify-between mt-4">
    <div>
      <button
        className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50 mx-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      {Array.from({ length: table.getPageCount() }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            table.getState().pagination.pageIndex === i
              ? "bg-pink-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } mx-1`}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50 mx-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
    </div>
    <div className="text-sm text-gray-600">
      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Go to page:</span>
      <input
        type="number"
        className="w-16 border border-gray-300 rounded-md text-sm px-2 py-1"
        value={table.getState().pagination.pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
        }}
      />
      <select
        className="border border-gray-300 rounded-md text-sm px-2 py-1"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </div>
);

// Row Style Helper
const getStatusClass = (status) => {
  switch (status) {
    case "Draft":
      return "text-green";
    case "Pending Review":
      return "text-purple";
    case "Approved & Scheduled":
      return "text-orange";
    case "Closed":
      return "text-blue-500";
    case "Needs Revising":
      return "text-red";
    case "Active":
      return "text-blue-500"
    case "Inactive":
      return "text-gray-500"
    default:
      return "";
  }
};

const CommonTable = ({ columns, data, pageSize = 5, showFilters = true }) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [filters, setFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, filters },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {showFilters && (
        <div className="pb-4 border-l border-r">
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="flex justify-between space-x-4">
              {headerGroup.headers.map((header) => (
                <div key={header.id} className="flex flex-1 w-full px-5">
                  <ColumnFilter column={header.column} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse border border-gray-200 w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-pink-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left text-sm font-medium text-gray-600 cursor-pointer"
                    style={{ 
                      maxWidth: header.column.columnDef.headerWidth, 
                      width: header.column.columnDef.headerWidth,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : header.column.columnDef.header}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-blue-50 odd:bg-white">
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;

                  // Check if the column has a custom cell renderer (e.g., for actions)
                  const cellContent = column.columnDef.Cell
                    ? column.columnDef.Cell({ row: { original: row.original }, cell })
                    : cell.getValue();

                  // Determine the styling based on the column
                  const statusClass = column.columnDef.accessorKey === "status" ? getStatusClass(cell.getValue()) : "";
                  
                  return (
                    <td
                      key={cell.id}
                      className={`px-4 py-4 text-sm ${statusClass}`}
                      style={{ 
                        maxWidth: cell.column.columnDef.headerWidth, 
                        width: cell.column.columnDef.headerWidth,
                        display: cell.column.columnDef.headerWidth ? "inline-block" : "" 
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls table={table} />
    </div>
  );
};

export default CommonTable;