/**
 * External dependencies
 */
import React, { useState } from "react";

/**
 * Internal dependencies
 */
import CommonTable from "@/components/Common/CommonTable";
import BackNavigation from "@/components/Common/BackNavigation";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import { PAGINATION } from "@/lib/constants";
import DealzFilter from "@/components/DealzFilter";
import IconChart from "@/components/Icons/IconChart";
import IconCalendar from "@/components/Icons/IconCalendar";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";

export default function Calendar() {
  const data = React.useMemo(
    () => [
      {
        dealz_title: "Alice",
        slot_date: "23rd Nov, Morning",
        start_date: "22 Nov, 2024",
        end_date: "25 Nov, 2024",
        created_by: "John Doe",
        status: "draft",
      },
      {
        dealz_title: "Bob",
        slot_date: "22nd Nov, Morning",
        start_date: "22 Nov, 2024",
        end_date: "25 Nov, 2024",
        created_by: "John Doe",
        status: "pending",
      },
      {
        dealz_title: "Charlie",
        slot_date: "23rd Nov, Evening",
        start_date: "22 Nov, 2024",
        end_date: "25 Nov, 2024",
        created_by: "John Doe",
        status: "approved",
      },
      {
        dealz_title: "David",
        slot_date: "24th Nov, Evening",
        start_date: "22 Nov, 2024",
        end_date: "25 Nov, 2024",
        created_by: "John Doe",
        status: "revision",
      },
      {
        dealz_title: "David",
        slot_date: "23rd Nov, Morning",
        start_date: "22 Nov, 2024",
        end_date: "25 Nov, 2024",
        created_by: "John Doe",
        status: "closed",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ NAME",
        accessorKey: "dealz_title",
      },
      {
        header: "SLOT DATE",
        accessorKey: "slot_date",
      },
      {
        header: "VALIDITY",
        accessorKey: "start_date",
        Cell: ({ row: { original } }) => {
          return original.start_date + '-' + original.end_date;
        }
      },
      {
        header: "CREATED BY",
        accessorKey: "created_by",
      },
      {
        header: "STATUS",
        accessorKey: "status",
        Cell: ({ row: { original } }) => {
          return <DealzStatusRenderer status={original.status} />;
        },
      },
    ],
    []
  );

  const handleApply = (filterState) => {
    console.log("Filter applied:", filterState);
  };

  const filterFields = [
    {
      id: "deal_title",
      type: "input",
      placeholder: "DEAL TITLE",
      icon: "/icons/tag-2-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-full",
      iconClassName: "!left-3",
      fullWidth: true
    },
    {
      id: "slot_date",
      type: "input",
      placeholder: "SLOT DATE",
      icon: "/icons/slot-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-full",
      iconClassName: "!left-3",
      fullWidth: true
    },
    {
      id: "start_date",
      type: "datePicker",
      placeholder: "START DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "w-full",
    },
    {
      id: "created_by",
      type: "select",
      placeholder: "CREATED BY",
      icon: <IconProfileCircle />,
      options: [],
      controlStyle: { paddingLeft: "40px" },
    },
    {
      id: "status",
      type: "select",
      placeholder: "STATUS",
      icon: <IconChart />,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Closed", value: "closed" },
      ],
      controlStyle: { paddingLeft: "40px" },
    },
  ];

  return (
    <div className="w-full px-10 py-8">
      <div className="rounded-tl-2xl rounded-tr-2xl border border-light-blue p-6 flex flex-col gap-6">
        <BackNavigation
          text="DEALZ"
          baseClassName="!mb-0 w-max"
          className="text-2xl font-semibold"
        />
        <DealzFilter fields={filterFields} onApply={handleApply} />
      </div>
      <CommonTable
        columns={columns}
        data={data}
        pageSize={PAGINATION.DEFAULT_PAGE_SIZE}
        paginationRequired={true}
        sortingServerSide={true}
      />
    </div>
  );
}
