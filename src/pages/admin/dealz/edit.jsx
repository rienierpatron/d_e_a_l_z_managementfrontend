import React, { useState, useEffect } from "react";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { useRouter } from "next/router";
import { getDealzSuperAdminRecordDetail, updateSuperAdminDealzRecord, updateSuperAdminStatusDealzRecord } from "@/api/dealz";
import { helper } from "@/helpers";
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import FormSelect from "@/components/Common/FormSelect";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconCalendar from "@/components/Icons/IconCalendar";
import IconDollar from "@/components/Icons/IconDollar";
import IconCouponWide from "@/components/Icons/IconCouponWide";
import IconCompany from "@/components/Icons/IconCompany";
import IconGlobe from "@/components/Icons/IconGlobe";
import CustomDatePicker from "@/components/Common/DatePicker";
import FormInput from "@/components/Common/FormInput";
import Image from "next/image";
import SlotNotAvailableDialog from "@/components/Admin/SlotNotAvailableDialog";
import RequestToReviseDialog from "@/components/Admin/RequestToReviseDialog";
import SaveDetailsDialog from "@/components/Admin/SaveDetailsDialog";
import classNames from "classnames";
import IconCloseCircle from "@/components/Icons/IconCloseCircle";

// Options for Slot Time Selection
export const SLOT_TIME_OPTIONS = [
  { label: "MORNING", value: "MORNING" },
  { label: "AFTERNOON", value: "AFTERNOON" },
  { label: "EVENING", value: "EVENING" },
];

// Reusable Deal Information Card Component
const DealInfoCard = ({ icon: Icon, label, children }) => (
  <div className="flex gap-2 items-center">
    <Icon className="text-dark-gray" />
    <Typography variant="caption">{label}</Typography>
    <div className="capitalize">{children}</div>
  </div>
);

export default function DealzEdit() {
  const router = useRouter();
  const [dealzId, setDealzId] = useState(null);
  const [dealzDetails, setDealzDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlotTime, setSelectedSlotTime] = useState({ label: '', value: '' });
  const [dealzReached, setDealzReached] = useState(0);
  const [showSlotNotAvailableWarningDialog, setShowSlotNotAvailableDialog] = useState(false);
  const [showSaveDetailsWarningDialog, setShowSaveDetailsWarningDialog] = useState(false);
  const [showRequestReviseWarningDialog, setShowRequestReviseWarningDialog] = useState(false);
  const [reviseFields, setReviseFields] = useState({ 
    reviseReason: "",
    reviseEmail: "",
    reviseProfilePic: ""
  });

  // Ensuring dealzId is available and then fetch the data
  useEffect(() => {
    if (router.isReady && router.query.dealz_id) {
      const { dealz_id } = router.query;
      setDealzId(dealz_id); // Set the dealzId in state
      getDealzRecordDetails(dealz_id); // Fetch details from API
    }
  }, [router.isReady, router.query.dealz_id]);

  // Fetch agency users list
  const getDealzRecordDetails = async (dealzId) => {
    try {
      const showMessage = false;
      const response = await getDealzSuperAdminRecordDetail(dealzId, showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        setDealzDetails(response.data);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  // Update Dealz Record
  const updateDealzRecord = async(dealzId) => {
    const data = {
      "slot_date": selectedDate,
      "slot_time": selectedSlotTime.value,
      "reach_count": dealzReached
    }

    try {
      const response = await updateSuperAdminDealzRecord(data, dealzId);
      if (response && helper.cmpStr(response.status, "ok")) {
        setShowSaveDetailsWarningDialog(false)
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  }

  // Status Update Dealz Record
  const updateDealzRecordStatus = async(data, dealzId) => {
    try {
      const response = await updateSuperAdminStatusDealzRecord(data, dealzId);
      if (response && helper.cmpStr(response.status, "ok")) {
        console.log(response.data);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  }

  // Effect to handle setting the selectedDate once dealzDetails is fetched
  useEffect(() => {
    if (dealzDetails) {
      // Parse and set the selected date
      if (dealzDetails.dealz.slot_date) {
        const parsedDate = new Date(dealzDetails.dealz.slot_date);
        if (!isNaN(parsedDate)) {
          const formattedDate = formatDateToYYYYMMDD(parsedDate);
          setSelectedDate(formattedDate);
        } else {
          console.error("Invalid date format for slot_date_time:", dealzDetails.dealz.slot_date);
        }
      }

      // Set the slot time if available
      if (dealzDetails.dealz.slot_time) {
        const slot_value = { label: dealzDetails.dealz.slot_time, value: dealzDetails.dealz.slot_time }
        setSelectedSlotTime(slot_value);
      }

      // Set the slot time if available
      if (dealzDetails.dealz.reach_count) {
        setDealzReached(dealzDetails.dealz.reach_count);
      }

      if (dealzDetails.dealz.agency_user.user) {
        setReviseFields(prevState => ({
          ...prevState,
          reviseEmail: dealzDetails.dealz.agency_user.user.email || "",
          reviseProfilePic: dealzDetails.dealz.agency_user.user.profile_picture_url || "",
        }));
      }
    }
  }, [dealzDetails]);

  const handleDateChange = (newDate) => {
    // Ensure the newDate is a valid Date object
    const parsedDate = new Date(newDate);
    if (!isNaN(parsedDate)) {
      const formattedDate = formatDateToYYYYMMDD(parsedDate);
      setSelectedDate(formattedDate);
    } else {
      console.error("Invalid date selected");
    }
  };

  const handleSlotTimeChange = (newSlotTime) => {
    setSelectedSlotTime(newSlotTime);
  };

  const handleDealzReachedChange = (e) => {
    setDealzReached(e.target.value);
  };

  const handleSaveSubmit = () => {
    if (dealzId) {
      updateDealzRecord(dealzId);
    } else {
      console.log("dealzId not available, please wait.");
    }
  };

  const handleApprove = () => {
    if (dealzId) {
      const data = {
        status:
          dealzDetails?.dealz?.status === "approved" ? "pending" : "approved",
      };
      updateDealzRecordStatus(data, dealzId);
    } else {
      console.log("dealzId not available, please wait.");
    }
  };

  const handleRevision = () => {
    if (dealzId) {
      const data = {
        "status": "revision",
        "to": reviseFields.reviseEmail,
        "subject": "Revision Request",
        "message": reviseFields.reviseReason
      }
      updateDealzRecordStatus(data, dealzId);
    } else {
      console.log("dealzId not available, please wait.");
    }
  }

  const handleReviseFieldChange = (field, value) => {
    setReviseFields((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (!dealzDetails) {
    return <div>Deal details not found.</div>;  // Show a message if no deal details are found
  }

  return (
    <div className="w-full px-10 py-8">
      {/* Header Section */}
      <div className="flex justify-between pb-8">
        <div>
          <Typography variant="heading">{dealzDetails.dealz?.title}</Typography>
          <Typography variant="caption">{dealzDetails.dealz?.description}</Typography>
        </div>
        <div className="flex gap-3">
          <Button
            icon="/icons/refresh-circle-icon.svg"
            className="px-[16px] py-[10] border-0 !bg-light-gray"
            isRound
            onClick={() => setShowRequestReviseWarningDialog(true)}
          >
            Request to Revise
          </Button>
          <Button
            icon={
              dealzDetails?.dealz?.status === "approved" ? (
                <IconCloseCircle className="text-red" />
              ) : (
                "/icons/tick-circle-icon.svg"
              )
            }
            className={classNames(`px-[16px] py-[0] border-0 !bg-green-60`, {
              "!bg-red-40": dealzDetails?.dealz?.status === "approved",
            })}
            isRound
            onClick={handleApprove}
          >
            {dealzDetails?.dealz?.status === "approved"
              ? "Reject Approval"
              : "Approve"}
          </Button>
          <Button
            icon="/icons/save-icon.svg"
            className={`px-[16px] py-[0] border-0 !bg-light-gray ${dealzDetails.dealz?.status === "revision" ? "opacity-50 cursor-not-allowed" : ""}`}
            isRound
            onClick={() => setShowSaveDetailsWarningDialog(true)}
            disabled={dealzDetails.dealz?.status === "revision"}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Deal Information Section */}
      <div className="grid grid-cols-2 gap-4 pb-5">
        <DealInfoCard icon={IconCompany} label="Agency name">{dealzDetails.dealz?.agency_user?.agency?.agency_name}</DealInfoCard>
        <DealInfoCard icon={IconCoupon} label="DEALZ type">
          {dealzDetails.dealz?.daily_deal
            ? "Daily Dealz"
            : dealzDetails.dealz?.weekly_deal
            ? "Weekly Deal"
            : "No Deal Type"}
        </DealInfoCard>
        <DealInfoCard icon={IconCoupon} label="DEALZ code">{dealzDetails.dealz?.coupon_code_type}</DealInfoCard>
        <DealInfoCard icon={IconDollar} label="Discount">${dealzDetails.dealz?.amount}</DealInfoCard>
        <DealInfoCard icon={IconGlobe} label="Website or booking link">{dealzDetails.dealz?.link}</DealInfoCard>

        {/* Validity */}
        <div className="flex gap-2 items-center">
          <IconCalendar className="text-dark-gray" />
          <Typography variant="caption">Validity</Typography>
          <div>{dealzDetails.dealz?.validity_date}</div>
        </div>

        <DealInfoCard icon={IconCoupon} label="Coupon created method">{dealzDetails.dealz?.coupon_creation_type}</DealInfoCard>

        {/* Slot Selection */}
        <div className="flex gap-2 items-center w-full">
          <IconCouponWide className="text-dark-gray" />
          <Typography variant="caption">Slot</Typography>
          <div className="flex flex-nowrap items-center">
            <CustomDatePicker
              id="slot-date"
              inputClassName="!bg-white border-0"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-[200]"
            />
            <FormSelect
              id="slot-time"
              name="slot-time"
              placeholder="Slot time"
              options={SLOT_TIME_OPTIONS}
              value={selectedSlotTime}
              onChange={handleSlotTimeChange}
              rounded
              icon="/icons/company-icon.svg"
              className="border-0 uppercase"
            />
          </div>
        </div>
      </div>
      <DealInfoCard icon={IconCalendar} label="Created date">{dealzDetails.dealz?.created_date_time_ago}</DealInfoCard>

      {/* Deal Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="pb-2">Wording for the deal</Typography>
        <Typography variant="caption" className="!text-black">{dealzDetails.dealz?.initial_message}</Typography>
      </div>

      {/* Follow-Up Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="pb-2">Wording for the follow-up message</Typography>
        <Typography variant="caption" className="!text-black">{dealzDetails.dealz?.followup_message}</Typography>
      </div>

      {/* Customer Reach and File Upload Section */}
      <div className="flex justify-between">
        <div>
          {dealzDetails.coupons?.[0]?.code.startsWith('http') ? (
            <a href={dealzDetails.coupons?.[0]?.code} download>
              <div className="relative p-4 mt-2 rounded-2xl border border-light-gray w-max">
                <Image
                  src="/icons/csv-preview.svg"
                  width={48}
                  height={48}
                  alt="CSV Preview"
                />
              </div>
              <Typography variant="caption">Coupon.csv</Typography>
            </a>
          ) : (
            <div className="flex items-center">
              <Typography variant="caption" className="pr-1">Generated coupon code:</Typography>
              <Typography>{dealzDetails.coupons?.[0]?.code}</Typography>
            </div>
          )}
        </div>
        <div>
          <Typography variant="caption" className="pb-2">Total number of customers reached for this DEALZ broadcast</Typography>
          <FormInput
            type="text"
            placeholder="Total no. of DEALZ reached"
            id="dealz-reached"
            name="dealz-reached"
            required
            icon={<IconCouponWide className="text-black" />}
            fullWidth
            rounded
            className="bg-light-gray text-black"
            value={dealzReached}
            onChange={handleDealzReachedChange}
          />
        </div>
      </div>

      {/* Dialogs */}
      <SaveDetailsDialog 
        open={showSaveDetailsWarningDialog}
        onClose={() => setShowSaveDetailsWarningDialog(false)}
        onSubmit={handleSaveSubmit}
      />
      {/* <SlotNotAvailableDialog
        open={showSlotNotAvailableWarningDialog}
        onClose={() => setShowSlotNotAvailableDialog(false)}
        onSubmit={() => setShowSlotNotAvailableDialog(false)}
      /> */}
      <RequestToReviseDialog
        open={showRequestReviseWarningDialog}
        onClose={() => setShowRequestReviseWarningDialog(false)}
        onSubmit={handleRevision}
        reviseFields={reviseFields}
        onReviseFieldChange={handleReviseFieldChange}
      />
    </div>
  );
}
