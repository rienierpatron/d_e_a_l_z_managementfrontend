import React, { useState }  from "react";
import CommonTable from "./commonTable";
import Typography from "@/components/Typography";

export default function Calendar() {
  const data = React.useMemo(
    () => [
      { dealz_title: "Alice", slot_details: "29th Dec, Morning", validity: "25th Dec - 4th Jan", created_by: "John Doe", status: 'Draft' },
      { dealz_title: "Bob", slot_details: "31st Dec, Morning", validity: "31st Dec - 5th Jan", created_by: "John Doe", status: 'Pending Review' },
      { dealz_title: "Charlie", slot_details: "5th Jan, Evening", validity: "4th Jan - 10th Jan", created_by: "Will Smith", status: 'Approved & Scheduled' },
      { dealz_title: "David", slot_details: "5th Dec, Morning", validity: "5th Dec - 15th Dec", created_by: "Will Smith", status: 'Closed' },
      { dealz_title: "David", slot_details: "10th Jan, Evening", validity: "9th Jan - 18th Jan", created_by: "Will Smith", status: 'Needs Revising' },
      { dealz_title: "Alice", slot_details: "29th Dec, Morning", validity: "25th Dec - 4th Jan", created_by: "John Doe", status: 'Draft' },
      { dealz_title: "Bob", slot_details: "31st Dec, Morning", validity: "31st Dec - 5th Jan", created_by: "John Doe", status: 'Pending Review' },
      { dealz_title: "Charlie", slot_details: "5th Jan, Evening", validity: "4th Jan - 10th Jan", created_by: "Will Smith", status: 'Approved & Scheduled' },
      { dealz_title: "David", slot_details: "5th Dec, Morning", validity: "5th Dec - 15th Dec", created_by: "Will Smith", status: 'Closed' },
      { dealz_title: "David", slot_details: "10th Jan, Evening", validity: "9th Jan - 18th Jan", created_by: "Will Smith", status: 'Needs Revising' },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ Title",
        accessorKey: "dealz_title",
        filterIcon: "/icons/tag-icon.svg"
      },
      {
        header: "Slot",
        accessorKey: "slot_details",
        filterIcon: "/icons/slot-icon.svg"
      },
      {
        header: "Validity",
        accessorKey: "validity",
        filterIcon: "/icons/calendar-icon.svg"
      },
      {
        header: "Created by",
        accessorKey: "created_by",
        filterIcon: "/icons/created-by-icon.svg"
      },
      {
        header: "Status",
        accessorKey: "status",
        filterIcon: "/icons/chart-icon.svg"
      },
    ],
    []
  );

  return (
    <div className="w-full p-5">
      <div className="overflow-x-auto">
        <Typography variant="title" className="p-5 text-gray-700 border border-b-0 rounded-t-xl mb-[8px]">
          DEALZ
        </Typography>
        <CommonTable columns={columns} data={data} pageSize={8} showFilters={true} />
      </div>
    </div>
  );
};