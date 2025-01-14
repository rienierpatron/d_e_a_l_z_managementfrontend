/**
 * External dependencies
 */
import React, { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import CommonTable from "@/components/Common/CommonTable";
import DealzStatusRenderer from "@/components/DealzStatusRenderer";
import PopoverMenu from "@/components/Common/PopoverMenu";
import Button from "@/components/Common/Button";
import IconVerticalDots from "@/components/Icons/IconVerticalDots";
import Typography from "@/components/Common/Typography";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import IconEdit from "@/components/Icons/IconEdit";
import IconEye from "@/components/Icons/IconEye";
import IconTrash from "@/components/Icons/IconTrash";
import IconArrowLeft from "@/components/Icons/IconArrowLeft";
import { PAGINATION } from "@/lib/constants";
import IconChart from "@/components/Icons/IconChart";
import IconCalendar from "@/components/Icons/IconCalendar";
import DealzFilter from "@/components/DealzFilter";
import EditDealConfirmationDialog from "@/components/EditDealConfirmationDialog";

const MyDealz = () => {
  const router = useRouter();
  const { query } = router;
  const viewAllDealz = (query?.show && query.show === "all-dealz") || false;
  const [showEditWarningDialog, setShowEditWarningDialog] = useState(false);

  const [showPopover, setShowPopover] = useState(false);

  const menuItems = [
    {
      icon: <IconEdit width={16} height={16} />,
      label: "Edit",
      onClick: () => setShowEditWarningDialog(true),
    },
    {
      icon: <IconEye width={16} height={16} />,
      label: "View",
      onClick: () => console.log("View clicked"),
    },
    {
      icon: <IconTrash width={16} height={16} />,
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  const tableData = [
    {
      id: 1,
      title: "Template qa test",
      slot_date: "23rd Nov, Morning",
      start_date: "22 Nov, 2024",
      end_date: "25 Nov, 2024",
      website: "www.xyz.com",
      status: "draft",
    },
    {
      id: 2,
      title: "Test robot",
      slot_date: "22nd Nov, Morning",
      start_date: "22 Nov, 2024",
      end_date: "25 Nov, 2024",
      website: "www.xyz.com",
      status: "pending",
    },
    {
      id: 3,
      title: "Template qa test",
      slot_date: "23rd Nov, Evening",
      start_date: "22 Nov, 2024",
      end_date: "25 Nov, 2024",
      website: "www.xyz.com",
      status: "approved",
    },
    {
      id: 4,
      title: "Template qa test",
      slot_date: "24th Nov, Evening",
      start_date: "22 Nov, 2024",
      end_date: "25 Nov, 2024",
      website: "www.xyz.com",
      status: "revision",
    },
    {
      id: 5,
      title: "Test robot",
      slot_date: "23rd Nov, Morning",
      start_date: "22 Nov, 2024",
      end_date: "25 Nov, 2024",
      website: "www.xyz.com",
      status: "closed",
    },
  ];

  const columns = React.useMemo(
    () => [
      {
        header: "DEAL TITLE",
        accessorKey: "title",
      },
      {
        header: "SLOT",
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
        header: "WEBSITE OR BOOKING LINK",
        accessorKey: "website",
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
              menuItems={menuItems}
              arrow={false}
              show={showPopover === original.id}
              placement="auto"
              onClose={() => setShowPopover(null)}
            >
              <Button
                borderless
                className="!p-0 !bg-transparent"
                onClick={() => setShowPopover(original.id)}
              >
                <IconVerticalDots />
              </Button>
            </PopoverMenu>
          );
        },
      },
    ],
    [showPopover, query]
  );

  // if (!viewAllDealz) {
  //   columns.splice(2, 2);
  // }

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
      id: "start_date",
      type: "datePicker",
      placeholder: "START DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "w-full",
    },
    {
      id: "end_date",
      type: "datePicker",
      placeholder: "END DATE",
      inputClassName: "!rounded-[32px] !pl-10 !py-3 !h-[50px]",
      className: "w-full",
    },
    {
      id: "duration",
      type: "select",
      placeholder: "DURATION",
      icon: <IconCalendar />,
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
    <div className={classNames({ "mt-8": !viewAllDealz })}>
      <div className="rounded-tl-2xl rounded-tr-2xl border border-light-blue p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {viewAllDealz && (
              <Button
                borderless
                className="!p-0"
                onClick={() => router.push("/dashboard")}
              >
                <IconArrowLeft />
              </Button>
            )}
            <Typography variant="subtitle">My DEALZ</Typography>
          </div>
          {!viewAllDealz && (
            <Button
              className="!p-0 underline"
              variant="primary"
              borderless
              outlined
              iconPosition="right"
              icon={<IconArrowRight />}
              onClick={() =>
                router.push({
                  pathname: "/dashboard",
                  query: { ...query, show: "all-dealz" },
                })
              }
            >
              View All
            </Button>
          )}
        </div>
        {viewAllDealz && (
          <DealzFilter
            fields={filterFields}
            onApply={() => {}}
            className="grid-cols-6 !gap-2"
          />
        )}
      </div>
      <CommonTable
        columns={columns}
        data={tableData}
        pageSize={PAGINATION.DEFAULT_PAGE_SIZE}
        paginationRequired={viewAllDealz ? true : false}
        onPageChange={(currentPage) => {}}
        onPageSizeChange={(pageSize) => {}}
        onSortChange={(orderBy, order) => {}}
        sortingServerSide={false}
      />
      <EditDealConfirmationDialog
        open={showEditWarningDialog}
        onClose={() => setShowEditWarningDialog(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default MyDealz;
