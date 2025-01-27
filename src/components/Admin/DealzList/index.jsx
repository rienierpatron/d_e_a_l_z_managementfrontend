/**
 * External dependencies
 */
import React, { useState, useEffect } from "react";

/**
 * Internal dependencies
 */
import { api } from "@/api";
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

export default function DealzList({
  title, 
  backNav, 
  showFilter = false,
  showNavigation = false}) {
  const [allRecords, setAllRecords] = useState([]);
  const [dealzList, setDealzList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const [showPopover, setShowPopover] = useState(false);
  const intialPaginationStatus = {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    pageIndex: 0,
  };
  const [pagination, setPagination] = useState(intialPaginationStatus);

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
  const getAllDealzRecords = async (filters = {}) => {
    try {
      const params = {
        offset: (pagination.currentPage - 1) * pagination.pageSize,
        limit: pagination.pageSize,
      };
      // Add filters to params if their values are not empty or undefined
      for (const key in filters) {
        if (filters[key]) {
          params[key] = filters[key];
        }
      }
      const res = await api.dealz.getAllSuperAdminDealzRecords(params, false);
      if (res.status === "ok") {
        console.log(res?.data?.dealz[0].agency_user);
        setDealzList(res?.data?.dealz);
        setTotalRecords(res?.data?.totalOverallResult);
      }
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    getAllDealzRecords();
  }, [pagination]);

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ NAME",
        accessorKey: "title",
      },
      {
        header: "Agency",
        accessorKey: "agency_user.agency.agency_name",
      },
      {
        header: "SLOT DATE",
        accessorKey: "slot_date_time"
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
        Cell: ({ row: { original } }) => {
          return original.agency_user.user.first_name + ' ' + original.agency_user.user.last_name;
        }
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

  const handleApply = async (filterState) => {
    // setPagination(intialPaginationStatus);
    const filters = {
      title: filterState?.title ?? "",
      status: filterState?.status?.value ?? "",
      valid_date_from: filterState?.start_date
        ? formatDateToYYYYMMDD(filterState.start_date)
        : "",
      valid_date_to: filterState?.end_date
        ? formatDateToYYYYMMDD(filterState.end_date)
        : "",
      created_by: filterState?.created_by,
      slot_date: filterState?.slot_date
        ? formatDateToYYYYMMDD(filterState.slot_date)
        : "",
    };
    await fetchDealRecords(filters);
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
    <>
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
          data={dealzList?.length ? dealzList : []}
          totalCount={totalRecords}
          pageSize={pagination.pageSize}
          paginationRequired={showFilter}
          sortingServerSide={true}
          paginationServerSide={true}
          currentPage={pagination.currentPage - 1}
          onPageChange={(newPage) =>
            setPagination({ ...pagination, currentPage: newPage })
          }
          onPageSizeChange={(pageSize) => {
            setPagination({ ...pagination, pageSize, currentPage: 1 });
          }}
          onSortChange={(orderBy, order) => {}}
        />
      </div>

    </>
  );
}