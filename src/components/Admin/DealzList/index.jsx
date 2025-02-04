/**
 * External dependencies
 */
import React, { useState, useEffect } from "react";

/**
 * Internal dependencies
 */
import { api } from "@/api";
import CommonTable from "@/components/Common/CommonTable";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import { PAGINATION, USER } from "@/lib/constants";
import DealzFilter from "@/components/DealzFilter";
import IconChart from "@/components/Icons/IconChart";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";
import Typography from "@/components/Common/Typography";
import PopoverMenu from "@/components/Common/PopoverMenu";
import IconEdit from "@/components/Icons/IconEdit";
import IconEye from "@/components/Icons/IconEye";
import IconTrash from "@/components/Icons/IconTrash";
import IconVerticalDots from "@/components/Icons/IconVerticalDots";
import Button from "@/components/Common/Button";
import BackNavigation from "@/components/Common/BackNavigation";
import { loadDelzStatusOptions } from "@/lib/utils";
import { formatDateToYYYYMMDD } from "@/lib/date";
import IconBuilding from "@/components/Icons/IconBuilding";
import DeleteDealConfirmationDialog from "@/components/DeleteDealConfirmationDialog";
import { useUser } from "@/context/UserContext";

export default function DealzList({
  title,
  backNav,
  showFilter = false,
  showNavigation = false,
}) {
  const { user } = useUser();
  const [showDeleteWarningDialog, setShowDeleteWarningDialog] = useState(null);
  const [dealzList, setDealzList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(10);
  const [showPopover, setShowPopover] = useState(false);
  const intialPaginationStatus = {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    pageIndex: 0,
  };
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState({
    orderColumn: "",
    orderDirection: "",
  });
  const [pagination, setPagination] = useState(intialPaginationStatus);

  const menuItems = [
    {
      icon: <IconEdit width={16} height={16} />,
      label: "Edit",
      onClick: (dealzId) =>
        (window.location.href = `/admin/dealz/edit?dealz_id=${dealzId.dealz_id}`),
    },
    {
      icon: <IconEye width={16} height={16} />,
      label: "View",
      onClick: (dealzId) =>
        (window.location.href = `/admin/dealz/view?dealz_id=${dealzId.dealz_id}`),
    },
    {
      icon: <IconTrash width={16} height={16} />,
      label: "Delete",
      onClick: (row) => setShowDeleteWarningDialog(row.dealz_id),
    },
  ];

  // Fetch agency users list
  const getAllDealzRecords = async () => {
    try {
      const params = {
        offset: (pagination.currentPage - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        ...filters,
        orderColumn: sorting.orderColumn,
        orderDirection: sorting.orderDirection,
      };
      const res = await api.dealz.getAllSuperAdminDealzRecords(params, false);
      if (res.status === "ok") {
        setDealzList(res?.data?.dealz);
        setTotalRecords(res?.data?.totalOverallResult);
      }
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  useEffect(() => {
    if (
      user &&
      (user?.user_role?.role_name === USER.ROLES.SUPERADMIN ||
        user?.user_role?.role_name === USER.ROLES.STAFF)
    ) {
      getAllDealzRecords();
    }
  }, [pagination, filters, sorting, user]);

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ name",
        accessorKey: "title",
        className: "font-medium"
      },
      {
        header: "Agency",
        accessorKey: "agency_name",
        Cell: ({ row: { original } }) => {
          return original?.agency_user?.agency?.agency_name;
        },
      },
      {
        header: "Slot date",
        accessorKey: "slot_date",
        Cell: ({ row: { original } }) => {
          return original?.slot_date_time;
        },
      },
      {
        header: "Validity",
        accessorKey: "valid_date_from",
        Cell: ({ row: { original } }) => {
          return original.validity_date;
        },
      },
      {
        header: "Created by",
        accessorKey: "created_by",
        Cell: ({ row: { original } }) => {
          return (
            original.agency_user.user.first_name +
            " " +
            original.agency_user.user.last_name
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ row: { original } }) => {
          return <DealzStatusRenderer status={original.status} />;
        },
      },
      {
        header: "Actions",
        accessorKey: "actions",
        headerSorting: false,
        Cell: ({ row: { original } }) => {
          /**
           * Notes:
           * - Only Super amdin can delete all type of dealz
           * - Customer can only delete draft dealz
           * - Customer can only edit draft and revision dealz
           */

          const currentRowMenuItems = menuItems.slice();
      
          // Conditionally remove the "Delete" menu item if the status is 'pending'
          if (["pending", "approved"].includes(original.status)) {
            const deleteIndex = currentRowMenuItems.findIndex(
              (item) => item.label === "Delete"
            );
            if (deleteIndex !== -1) {
              currentRowMenuItems.splice(deleteIndex, 1); // Remove the "Delete" item
            }
          }

          return (
            <PopoverMenu
              menuItems={currentRowMenuItems}
              arrow={false}
              show={showPopover === original.dealz_id}
              placement="auto"
              onClose={() => setShowPopover(null)}
              rowData={original}
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

  const deleteDealRecords = async () => {
    try {
      const res = await api.dealz.deleteDeal({
        dealzId: showDeleteWarningDialog,
        isStaff: true,
      });
      if (res.status === "ok") {
        setShowDeleteWarningDialog(null);
        getAllDealzRecords();
      }
    } catch (error) {
      console.log("Error in deleting deal record", error);
    }
  };

  const handleApply = async (filterState) => {
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
      agency_name: filterState?.agency_name ?? "",
    };
    // Reset pagination and set new filters
    setPagination(intialPaginationStatus);
    setFilters(filters);
  };

  const filterFields = [
    {
      id: "title",
      type: "input",
      placeholder: "DEALZ title",
      icon: "/icons/tag-2-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "agency_name",
      type: "input",
      placeholder: "Agency name",
      icon: <IconBuilding />,
      className: "!pl-10 py-3 !h-auto !w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "slot_date",
      type: "datePicker",
      placeholder: "Slot date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "start_date",
      type: "datePicker",
      placeholder: "Start date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "end_date",
      type: "datePicker",
      placeholder: "End date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "created_by",
      type: "input",
      placeholder: "Created by",
      icon: <IconProfileCircle />,
      className: "!pl-10 py-3 !h-auto !w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "status",
      type: "select",
      placeholder: "Status",
      icon: <IconChart />,
      options: loadDelzStatusOptions(),
      controlStyle: { paddingLeft: "40px", width: "200px" },
    },
  ];

  return (
    <>
      <div className="w-full">
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
          <DealzFilter
            fields={filterFields}
            onApply={handleApply}
            className="flex-wrap"
            onClearFilter={() => {
              setPagination({
                ...pagination,
                currentPage: 1,
                pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
              });
              setFilters({});
            }}
          />
        </div>
        <CommonTable
          columns={columns}
          data={dealzList?.length ? dealzList : []}
          totalCount={totalRecords}
          pageSize={pagination.pageSize}
          paginationRequired={true}
          sortingServerSide={true}
          paginationServerSide={true}
          currentPage={pagination.currentPage}
          onPageChange={(newPage) =>
            setPagination({ ...pagination, currentPage: newPage })
          }
          onPageSizeChange={(pageSize) => {
            setPagination({ ...pagination, pageSize, currentPage: 1 });
          }}
          onSortChange={(orderBy, order) => {
            setSorting({
              orderColumn: orderBy,
              orderDirection: order?.toUpperCase(),
            });
          }}
        />
      </div>
      <DeleteDealConfirmationDialog
        open={showDeleteWarningDialog}
        onClose={() => setShowDeleteWarningDialog(null)}
        onSubmit={() => deleteDealRecords()}
      />
    </>
  );
}
