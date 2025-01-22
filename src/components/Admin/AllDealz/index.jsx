/**
 * External dependencies
 */
import React, { useState, useEffect } from "react";

/**
 * Internal dependencies
 */
import { helper } from "@/helpers";
import CommonTable from "@/components/Common/CommonTable";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import { PAGINATION } from "@/lib/constants";
import DealzFilter from "@/components/DealzFilter";
import IconChart from "@/components/Icons/IconChart";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";
import Typography from "@/components/Common/Typography";
import { getAllSuperAdminDealzRecords } from "@/api/dealz";
import PopoverMenu from "@/components/Common/PopoverMenu";
import IconEdit from "@/components/Icons/IconEdit";
import IconEye from "@/components/Icons/IconEye";
import IconTrash from "@/components/Icons/IconTrash";
import IconVerticalDots from "@/components/Icons/IconVerticalDots";
import Button from "@/components/Common/Button";
import BackNavigation from "@/components/Common/BackNavigation";

export default function Calendar({title, backNav}) {
  const [allRecords, setAllRecords] = useState([]);
  const [showPopover, setShowPopover] = useState(false);

  const menuItems = [
    {
      icon: <IconEdit width={16} height={16} />,
      label: "Edit",
      onClick: (dealzId) => window.location.href = `/admin/dealz/edit?dealz_id=${dealzId}`,
    },
    {
      icon: <IconEye width={16} height={16} />,
      label: "View",
      onClick: (dealzId) => window.location.href = `/admin/dealz/view?dealz_id=${dealzId}`,
    },
    {
      icon: <IconTrash width={16} height={16} />,
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  // Fetch agency users list
  const getAllDealzRecords = async () => {
    try {
      const showMessage = false;
      const response = await getAllSuperAdminDealzRecords(showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        const agencyAllRecords = response.data.dealz.map(recordItem => ({
          ...recordItem,
          agency_name: recordItem.agency_user?.agency?.agency_name
        }));
        console.log("agencyAllRecords", agencyAllRecords)
        setAllRecords(agencyAllRecords);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    getAllDealzRecords();
  }, []);
  
  const data = React.useMemo (() => allRecords);

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ NAME",
        accessorKey: "title",
      },
      {
        header: "Agency",
        accessorKey: "agency_name",
      },
      {
        header: "SLOT DATE",
        accessorKey: "slot_date",
        Cell: ({ row: { original } }) => {
          return original.slot_date_time + ' ' + original.slot_time;
        }
      },
      {
        header: "VALIDITY",
        accessorKey: "validity_date",
        Cell: ({ row: { original } }) => {
          return original.validity_date;
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
      {
        header: "ACTIONS",
        accessorKey: "actions",
        headerSorting: false,
        Cell: ({ row: { original } }) => {
          return (
            <PopoverMenu
              // menuItems={menuItems}
              menuItems={menuItems.map(item => ({
                ...item,
                onClick: () => item.onClick(original.dealz_id), // Pass dealz_id dynamically
              }))}
              arrow={false}
              show={showPopover === original.dealz_id}
              placement="auto"
              onClose={() => setShowPopover(null)}
            >
              <Button
                borderless
                className="!p-0 !bg-transparent"
                onClick={() => setShowPopover(original.dealz_id)}
              >
                <IconVerticalDots />
              </Button>
            </PopoverMenu>
          );
        },
      },
    ],
    [showPopover]
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
      id: "code",
      type: "input",
      placeholder: "COUPON CODE",
      icon: "/icons/tag-2-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-full",
      iconClassName: "!left-3",
      fullWidth: true
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
    <div className="w-full py-8">
      <div className="rounded-tl-2xl rounded-tr-2xl border border-light-blue p-6 flex flex-col gap-6">
      {backNav ? (
        <BackNavigation
          text={title}
          baseClassName="!mb-0 w-max"
          className="text-2xl font-semibold"
        />
      ) : (
        <div className="flex items-center gap-2">
          <Typography variant="subtitle">Recent DEALZ</Typography>
        </div>
      )}
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