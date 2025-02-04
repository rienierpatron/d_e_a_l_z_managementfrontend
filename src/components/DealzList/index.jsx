/**
 * External dependencies
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
/**
 * Internal dependencies
 */
import { api } from "@/api";
import CommonTable from "@/components/Common/CommonTable";
import BackNavigation from "@/components/Common/BackNavigation";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import { PAGINATION } from "@/lib/constants";
import DealzFilter from "@/components/DealzFilter";
import IconChart from "@/components/Icons/IconChart";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";
import PopoverMenu from "@/components/Common/PopoverMenu";
import Button from "@/components/Common/Button";
import IconVerticalDots from "@/components/Icons/IconVerticalDots";
import IconEdit from "@/components/Icons/IconEdit";
import IconEye from "@/components/Icons/IconEye";
import IconTrash from "@/components/Icons/IconTrash";
import EditDealConfirmationDialog from "@/components/EditDealConfirmationDialog";
import { loadDelzStatusOptions } from "@/lib/utils";
import DeleteDealConfirmationDialog from "@/components/DeleteDealConfirmationDialog";
import { formatDateToYYYYMMDD } from "@/lib/date";
import IconArrowRight from "../Icons/IconArrowRight";

export default function DealzList({
  showFilter = false,
  showNavigation = false,
}) {
  const router = useRouter();
  const [dealzList, setDealzList] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showEditWarningDialog, setShowEditWarningDialog] = useState(null);
  const [showDeleteWarningDialog, setShowDeleteWarningDialog] = useState(null);
  const intialPaginationStatus = {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  };
  const [pagination, setPagination] = useState(intialPaginationStatus);
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState({
    orderColumn: "",
    orderDirection: "",
  });

  const menuItems = [
    {
      icon: <IconEdit width={16} height={16} />,
      label: "Edit",
      onClick: (row) => setShowEditWarningDialog(row.dealz_id),
    },
    {
      icon: <IconEye width={16} height={16} />,
      label: "View",
      onClick: (row) => router.push(`/dealz/view/${row.dealz_id}`),
    },
    {
      icon: <IconTrash width={16} height={16} />,
      label: "Delete",
      onClick: (row) => setShowDeleteWarningDialog(row.dealz_id),
    },
  ];

  const columns = React.useMemo(
    () => [
      {
        header: "DEALZ title",
        accessorKey: "title",
        className: "font-medium",
      },
      {
        header: "Slot",
        accessorKey: "slot_date",
        Cell: ({ row: { original } }) => {
          return original?.slot_date_time;
        },
      },
      {
        header: "Validity",
        accessorKey: "valid_date_from",
        Cell: ({ row: { original } }) => {
          return original?.validity_date;
        },
      },
      {
        header: "Website or booking link",
        accessorKey: "link",
        headerSorting: false,
      },
      {
        header: "Created by",
        accessorKey: "created_by",
        Cell: ({ row: { original } }) => {
          return (
            original.agency_user?.user?.first_name +
            " " +
            original?.agency_user?.user?.last_name
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

          // Conditionally remove the "Edit" menu item if the status is not 'draft' or 'revision'
          if (!["draft", "revision"].includes(original.status)) {
            const editIndex = currentRowMenuItems.findIndex(
              (item) => item.label === "Edit"
            );
            if (editIndex !== -1) {
              currentRowMenuItems.splice(editIndex, 1); // Remove the "Edit" item
            }
          }

          // Conditionally remove the "Delete" menu item if the status is not 'draft'
          if (!["draft"].includes(original.status)) {
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

  const filterFields = [
    {
      id: "title",
      type: "input",
      placeholder: "DEALZ title",
      icon: "/icons/tag-2-icon.svg",
      className: "!pl-10 py-3 !h-auto xl:w-[170px] 3xl:w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "slot_date",
      type: "datePicker",
      placeholder: "Slot date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "xl:w-[170px] 3xl:w-[200px]",
    },
    {
      id: "start_date",
      type: "datePicker",
      placeholder: "Start date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "xl:w-[170px] 3xl:w-[200px]",
    },
    {
      id: "end_date",
      type: "datePicker",
      placeholder: "End date",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "xl:w-[170px] 3xl:w-[200px]",
    },
    {
      id: "created_by",
      type: "input",
      placeholder: "Created by",
      icon: <IconProfileCircle />,
      className: "!pl-10 py-3 !h-auto xl:w-[170px] 3xl:w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "status",
      type: "select",
      placeholder: "Status",
      icon: <IconChart />,
      options: loadDelzStatusOptions(),
      controlStyle: { paddingLeft: "40px", width: "170px" },
    },
  ];

  const fetchDealRecords = async () => {
    try {
      const params = {
        offset: (pagination.currentPage - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        ...filters, // Include the active filters
        orderColumn: sorting.orderColumn,
        orderDirection: sorting.orderDirection,
      };
      const res = await api.dealz.getDealRecords(params, false);
      if (res.status === "ok") {
        setDealzList(res?.data?.dealz);
        setTotalRecords(res?.data?.totalOverallResult);
      }
    } catch (error) {
      console.log("Error in fetching deal records", error);
    }
  };

  const deleteDealRecords = async () => {
    try {
      const res = await api.dealz.deleteDeal({
        dealzId: showDeleteWarningDialog,
        isStaff: false,
      });
      if (res.status === "ok") {
        setShowDeleteWarningDialog(null);
        fetchDealRecords();
      }
    } catch (error) {
      console.log("Error in deleting deal record", error);
    }
  };

  useEffect(() => {
    fetchDealRecords();
  }, [pagination, filters, sorting]);

  const handleApply = (filterState = {}) => {
    const appliedFilters = {
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

    // Reset pagination and set new filters
    setPagination(intialPaginationStatus);
    setFilters(appliedFilters);
  };

  return (
    <>
      <div className="rounded-tl-2xl rounded-tr-2xl border border-light-blue p-6 flex flex-col gap-6">
        <div className="flex justify-between">
          {showNavigation ? (
            <BackNavigation
              text="DEALZ"
              baseClassName="!mb-0 w-max"
              className="text-2xl font-semibold"
            />
          ) : (
            <p className="!mb-0 w-max text-2xl font-semibold">DEALZ</p>
          )}
          {!showFilter && (
            <Button
              className="!p-0 underline"
              variant="primary"
              borderless
              outlined
              iconPosition="right"
              icon={<IconArrowRight />}
              onClick={() =>
                router.push({
                  pathname: "/calendar",
                })
              }
            >
              View All
            </Button>
          )}
        </div>
        {showFilter && (
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
        )}
      </div>
      <CommonTable
        columns={columns}
        data={dealzList?.length ? dealzList : []}
        totalCount={totalRecords}
        pageSize={pagination.pageSize}
        paginationRequired={showFilter}
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
      <EditDealConfirmationDialog
        open={showEditWarningDialog}
        onClose={() => setShowEditWarningDialog(null)}
        onSubmit={() => router.push(`/dealz/edit/${showEditWarningDialog}`)}
      />
      <DeleteDealConfirmationDialog
        open={showDeleteWarningDialog}
        onClose={() => setShowDeleteWarningDialog(null)}
        onSubmit={() => deleteDealRecords()}
      />
    </>
  );
}
