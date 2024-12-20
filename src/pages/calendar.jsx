import React, { useState }  from "react";
import CommonTable from "./commonTable";

export default function Calendar() {
  const data = React.useMemo(
    () => [
      { name: "Alice", country: "USA", start_date: "12-25-2024", end_date: "12-31-2024" },
      { name: "Bob", country: "UK", start_date: "01-01-2025", end_date: "01-15-2025" },
      { name: "Charlie", country: "Canada", start_date: "02-01-2025", end_date: "02-10-2025" },
      { name: "David", country: "Germany", start_date: "03-01-2025", end_date: "03-20-2025" }
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ Title",
        accessorKey: "name",
      },
      {
        header: "Age",
        accessorKey: "start_date", // 'start_date' will be the key
        cell: (info) => {
          // Custom rendering of start_date and end_date together
          const { start_date, end_date } = info.row.original;
          return (
            <span>
              {start_date} - {end_date}
            </span>
          );
        },
      },
      {
        header: "Country",
        accessorKey: "country",
      },
    ],
    []
  );


  return (
    <div className="p-5 w-full">
      <div className="overflow-x-auto ">
        <CommonTable columns={columns} data={data} pageSize={2} />
      </div>
    </div>
  );
};