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
import FormInput from "@/components/Common/FormInput";
import CustomDatePicker from "@/components/Common/DatePicker";
import FormSelect from "@/components/Common/FormSelect";
import IconChart from "@/components/Icons/IconChart";
import IconCalendar from "@/components/Icons/IconCalendar";

const MyDealz = () => {
  const router = useRouter();
  const { query } = router;
  const viewAllDealz = (query?.show && query.show === "all-dealz") || false;

  const [showPopover, setShowPopover] = useState(false);

  const menuItems = [
    {
      icon: <IconEdit width={16} height={16} />,
      label: "Edit",
      onClick: () => console.log("Edit clicked"),
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
      schedule: "12-29 Dec, Morning",
      discount: "$25",
      website: "www.xyz.com",
      status: "draft",
    },
    {
      id: 2,
      title: "Test robot",
      schedule: "12-29 Dec, Morning",
      discount: "$25",
      website: "www.xyz.com",
      status: "pending",
    },
    {
      id: 3,
      title: "Template qa test",
      schedule: "12-29 Dec, Morning",
      website: "www.xyz.com",
      status: "approved",
    },
    {
      id: 4,
      title: "Template qa test",
      schedule: "02-06 Dec, Morning",
      discount: "$25",
      website: "www.xyz.com",
      status: "revision",
    },
    {
      id: 5,
      title: "Test robot",
      schedule: "12-29 Dec, Morning",
      discount: "$25",
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
        header: "SCHEDULED",
        accessorKey: "schedule",
      },
      {
        header: "DISCOUNT",
        accessorKey: "discount",
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

  if (!viewAllDealz) {
    columns.splice(2, 2);
  }

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
          <div className="flex items-center gap-6">
            <FormInput
              icon="/icons/tag-2-icon.svg"
              placeholder="DEAL TITLE"
              rounded
              className="!pl-10 py-3 !h-auto"
              iconClassName="!left-3"
              fullWidth
            />
            <CustomDatePicker
              id="start-date"
              placeholder="Start date"
              inputClassName="!rounded-[32px] !pl-10 !py-3 !h-[50px]"
              onChange={(value) => {}}
              className="w-full"
            />
            <CustomDatePicker
              id="end-date"
              placeholder="End date"
              inputClassName="!rounded-[32px] !pl-10 !py-3 !h-[50px]"
              className="w-full"
            />
            <FormSelect
              id="status"
              name="status"
              options={[]}
              rounded
              icon={<IconCalendar />}
              height="50px"
              controlStyle={{
                paddingLeft: "40px",
              }}
            />
            <FormSelect
              id="status"
              name="status"
              options={[]}
              rounded
              icon={<IconChart />}
              placeholder="Status"
              height="50px"
              controlStyle={{
                paddingLeft: "40px",
              }}
            />
            <Button
              variant="primary"
              isRound
              outlined
              icon={<IconArrowRight />}
              iconPosition="right"
              className="!px-6 !py-3"
            >
              Apply
            </Button>
          </div>
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
    </div>
  );
};

export default MyDealz;
