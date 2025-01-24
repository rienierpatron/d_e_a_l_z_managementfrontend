/**
 * External dependencies
 */

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import { PAGINATION } from "@/lib/constants";
import IconArrowLeft from "@/components/Icons/IconArrowLeft";
import IconArrowRight from "@/components/Icons/IconArrowRight";

const PaginationControls = ({ table, onPageChange, onPageSizeChange }) => {
  const currentPage = table.getState().pagination.pageIndex + 1; // pageIndex starts from 0
  const totalPages = table.getPageCount();

  const getPaginationRange = () => {
    const range = [];
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    // Always include the first page
    range.push(1);

    // Add left ellipsis if needed
    if (showLeftEllipsis) range.push("...");

    // Add the current page range
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add right ellipsis if needed
    if (showRightEllipsis) range.push("...");

    // Always include the last page
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = getPaginationRange();

  return (
    <div className="flex items-center justify-between mt-4 flex-row-reverse">
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          className="rounded-full h-12 w-12 px-3 py-1 bg-light-blue hover:bg-gray-200 disabled:opacity-50 mx-1"
          onClick={() => {
            table.previousPage();
            if (typeof onPageChange === "function") {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <IconArrowLeft className="text-midnight-blue" />
        </button>

        {/* Page Buttons */}
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                className={`px-3 py-1 rounded-full h-12 w-12 text-base font-medium ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-white border text-midnight-blue hover:bg-primary hover:text-white"
                } mx-1`}
                onClick={() => {
                  table.setPageIndex(page - 1);
                  if (typeof onPageChange === "function") {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          className="rounded-full h-12 w-12 px-3 py-1 bg-light-blue hover:bg-gray-200 disabled:opacity-50 mx-1"
          onClick={() => {
            table.nextPage();
            if (typeof onPageChange === "function") {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={!table.getCanNextPage()}
        >
          <IconArrowRight className="text-midnight-blue" />
        </button>
      </div>
      {/* Pagination Info */}
      {/* <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div> */}

      <div className="flex items-center gap-2">
        {/* <span className="text-sm text-gray-600">Go to page:</span>
        <input
          type="number"
          className="w-16 border border-gray-300 rounded-md text-sm px-2 py-1"
          value={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        /> */}
        <select
          className="border rounded-md text-sm py-1 focus:outline-dark-gray focus:border-none focus-visible:outline-dark-gray"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            if (typeof onPageSizeChange === "function") {
              onPageSizeChange(Number(e.target.value));
            }
          }}
          style={{
            boxShadow: "none",
          }}
        >
          {PAGINATION.PAGE_SIZES.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CommonTable = ({
  columns,
  data,
  pageSize = 10,
  totalCount,
  order,
  orderBy,
  paginationRequired = true,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  sortingServerSide = false,
  rowClickable = false,
  onRowClick,
  tableWrapperClassName,
  tableClassName,
  paginationServerSide,
  currentPage,
}) => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  // To Reset Page
  useEffect(() => {
    if (currentPage && pageSize) {
      setPagination({
        ...pagination,
        pageIndex: currentPage - 1,
        pageSize
      });
    }
  }, [currentPage, pageSize]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize),
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: sortingServerSide,
    manualPagination: paginationServerSide,
  });

  const handleSorting = (header) => {
    // Check if sorting is enabled for this column
    if (header.column.columnDef.headerSorting !== false) {
      const isDescending = !sorting.length || sorting.find((ele) => ele.desc);
      if (isDescending) {
        setSorting([{ id: header.id, desc: false }]); // asc
      } else {
        setSorting([{ id: header.id, desc: true }]); // desc
      }
      if (typeof onSortChange === "function") {
        onSortChange(header.id, isDescending ? "asc" : "desc");
      }
    }
  };

  // To set default sorting
  useEffect(() => {
    if (order && orderBy) {
      setSorting([
        {
          id: orderBy,
          desc: order === "asc" ? true : false,
        },
      ]);
    }
  }, [order, orderBy]);

  return (
    <div>
      <div
        className={classNames(
          "overflow-x-auto h-full scrollbar-hide",
          tableWrapperClassName
        )}
      >
        <table
          className={classNames(
            "min-w-full table-fixed border-collapse border border-light-gray",
            tableClassName
          )}
        >
          <thead className="bg-gradient-table-head">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap px-4 py-4 text-left text-sm font-medium text-dark-gray cursor-pointer border border-l-0 border-r-0 border-[#CDD5E0]"
                    style={{
                      maxWidth: header.column.columnDef.headerWidth,
                      width: header.column.columnDef.headerWidth,
                    }}
                    onClick={() => handleSorting(header)}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder
                        ? null
                        : header.column.columnDef.header}{" "}
                      {header.column.getIsSorted() === "asc" ? (
                        <IconArrowLeft className="rotate-90" />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <IconArrowLeft className="-rotate-90" />
                      ) : (
                        ""
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNames("even:bg-blue-50 odd:bg-white", {
                  "cursor-pointer": rowClickable,
                })}
                onClick={() => {
                  if (rowClickable && typeof onRowClick === "function") {
                    onRowClick(row);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;

                  // Check if the column has a custom cell renderer (e.g., for actions)
                  const cellContent = column.columnDef.Cell
                    ? column.columnDef.Cell({
                        row: { original: row.original },
                        cell,
                      })
                    : cell.getValue();

                  return (
                    <td
                      key={cell.id}
                      className={`px-4 whitespace-normal py-4 text-base font-medium text-midnight-blue`}
                      style={{
                        maxWidth: cell.column.columnDef.headerWidth,
                        width: cell.column.columnDef.headerWidth,
                        display: cell.column.columnDef.headerWidth
                          ? "inline-block"
                          : "",
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
      {paginationRequired && (
        <PaginationControls
          table={table}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default CommonTable;
