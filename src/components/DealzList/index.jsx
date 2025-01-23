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
  const [totalRecords, setTotalRecords] = useState(10);
  const [showEditWarningDialog, setShowEditWarningDialog] = useState(null);
  const [showDeleteWarningDialog, setShowDeleteWarningDialog] = useState(null);
  const intialPaginationStatus = {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  };
  const [pagination, setPagination] = useState(intialPaginationStatus);
  const [filters, setFilters] = useState({}); // New state for filters
  const [sorting, setSorting] = useState({
    orderColumn: '',
    orderDirection: ''
  })

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
        header: "DEALZ TITLE",
        accessorKey: "title",
      },
      {
        header: "SLOT",
        accessorKey: "slot_date",
        Cell: ({ row: { original } }) => {
          return original?.slot_date_time
        }
      },
      {
        header: "VALIDITY",
        accessorKey: "valid_date_from",
        Cell: ({ row: { original } }) => {
          return original?.validity_date
        }
      },
      {
        header: "WEBSITE OR BOOKING LINK",
        accessorKey: "link",
        headerSorting: false,
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
          const currentRowMenuItems = menuItems.slice(); // Create a shallow copy of menuItems

          // Conditionally remove the "Edit" menu item if the status is not 'draft' or 'revision'
          if (!["draft", "revision"].includes(original.status)) {
            const editIndex = currentRowMenuItems.findIndex(
              (item) => item.label === "Edit"
            );
            if (editIndex !== -1) {
              currentRowMenuItems.splice(editIndex, 1); // Remove the "Edit" item
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
      placeholder: "DEALZ TITLE",
      icon: "/icons/tag-2-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-[200px]",
      iconClassName: "!left-3",
    },
    {
      id: "slot_date",
      type: "datePicker",
      placeholder: "SLOT DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "start_date",
      type: "datePicker",
      placeholder: "START DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "end_date",
      type: "datePicker",
      placeholder: "END DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "!w-[200px]",
    },
    {
      id: "created_by",
      type: "input",
      placeholder: "CREATED BY",
      icon: <IconProfileCircle />,
      className: "!pl-10 py-3 !h-auto !w-[200px]",
      iconClassName: "!left-3",
      // fullWidth: true,
    },
    {
      id: "status",
      type: "select",
      placeholder: "STATUS",
      icon: <IconChart />,
      options: loadDelzStatusOptions(),
      controlStyle: { paddingLeft: "40px", width: "200px" },
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
      const res = await api.dealz.deleteDeal(showDeleteWarningDialog);
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
  }, [pagination, filters,sorting]); // Trigger API call when pagination or filters change

  const handleApply = (filterState) => {
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
