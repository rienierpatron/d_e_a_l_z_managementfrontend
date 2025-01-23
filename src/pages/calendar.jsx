/**
 * External dependencies
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
/**
 * Internal dependencies
 */
import CommonTable from "@/components/Common/CommonTable";
import BackNavigation from "@/components/Common/BackNavigation";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import { PAGINATION } from "@/lib/constants";
import DealzFilter from "@/components/DealzFilter";
import IconChart from "@/components/Icons/IconChart";
import IconProfileCircle from "@/components/Icons/IconProfileCircle";
import { api } from "@/api";
import PopoverMenu from "@/components/Common/PopoverMenu";
import Button from "@/components/Common/Button";
import IconVerticalDots from "@/components/Icons/IconVerticalDots";
import IconEdit from "@/components/Icons/IconEdit";
import IconEye from "@/components/Icons/IconEye";
import IconTrash from "@/components/Icons/IconTrash";
import EditDealConfirmationDialog from "@/components/EditDealConfirmationDialog";

export default function Calendar() {
  const router = useRouter();
  const [dealzList, setDealzList] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [totalRecords, setTotalRecords] = useState(10);
  const [showEditWarningDialog, setShowEditWarningDialog] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    pageIndex: 0,
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
      onClick: () => console.log("Delete clicked"),
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
        accessorKey: "slot_date_time",
      },
      {
        header: "VALIDITY",
        accessorKey: "validity_date",
      },
      {
        header: "WEBSITE OR BOOKING LINK",
        accessorKey: "link",
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
      fullWidth: true,
    },
    {
      id: "slot_date",
      type: "input",
      placeholder: "SLOT DATE",
      icon: "/icons/slot-icon.svg",
      className: "!pl-10 py-3 !h-auto !w-full",
      iconClassName: "!left-3",
      fullWidth: true,
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

  const fetchDealRecords = async () => {
    try {
      const params = {
        offset: (pagination.currentPage - 1) * pagination.pageSize,
        limit: pagination.pageSize,
      };
      const res = await api.dealz.getDealRecords(params, false);
      if (res.status === "ok") {
        setDealzList(res?.data?.dealz);
        setTotalRecords(res?.data?.totalOverallResult);
      }
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  useEffect(() => {
    fetchDealRecords();
  }, [pagination]);

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
        data={dealzList}
        totalCount={totalRecords}
        pageSize={pagination.pageSize}
        paginationRequired={true}
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
       <EditDealConfirmationDialog
        open={showEditWarningDialog}
        onClose={() => setShowEditWarningDialog(false)}
        onSubmit={() => router.push(`/dealz/edit/${showEditWarningDialog}`)}
      />
    </div>
  );
}
