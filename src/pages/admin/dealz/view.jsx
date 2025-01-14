import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import React, { useState } from "react";
import FormSelect from "@/components/Common/FormSelect";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconCalendar from "@/components/Icons/IconCalendar";
import IconDollar from "@/components/Icons/IconDollar";
import IconCouponWide from "@/components/Icons/IconCouponWide";
import CustomDatePicker from "@/components/Common/DatePicker";
import FormInput from "@/components/Common/FormInput";
import Image from "next/image";
import SlotNotAvailableDialog from "@/components/Admin/SlotNotAvailableDialog";
import RequestToReviseDialog from "@/components/Admin/RequestToReviseDialog";

// Options for Slot Time Selection
export const SLOT_TIME_OPTIONS = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
];

// Reusable Deal Information Card Component
const DealInfoCard = ({ icon: Icon, label, children }) => (
  <div className="flex gap-2 items-center">
    <Icon className="text-dark-gray" />
    <Typography variant="caption" className="uppercase">{label}</Typography>
    <div>{children}</div>
  </div>
);

export default function DealzView() {
  const [showSlotNotAvailableWarningDialog, setShowSlotNotAvailableDialog] = useState(false);
  const [showRequestReviseWarningDialog, setShowRequestReviseWarningDialog] = useState(false);

  const [selectedDate] = useState(new Date("2024-12-25"));  // No state update, read-only
  const [selectedSlotTime] = useState("morning");  // Slot time is hardcoded for this example

  return (
    <div className="w-full px-10 py-8">
      {/* Header Section */}
      <div className="flex justify-between pb-8">
        <div>
          <Typography variant="heading">Holiday Specials</Typography>
          <Typography variant="caption">Your Next Favorite Deal</Typography>
        </div>
      </div>

      {/* Deal Information Section */}
      <div className="grid grid-cols-2 gap-4 pb-5">
        <DealInfoCard icon={IconCoupon} label="DEALZ Code">Unique code</DealInfoCard>
        <DealInfoCard icon={IconCalendar} label="Agency Name">Burger King</DealInfoCard>
        <DealInfoCard icon={IconDollar} label="Discount">$25</DealInfoCard>
        <DealInfoCard icon={IconCalendar} label="Website or Booking link">https://chaaat.io</DealInfoCard>
        
        {/* Validity */}
        <div className="flex gap-2 items-center">
          <IconCalendar className="text-dark-gray" />
          <Typography variant="caption" className="uppercase">Validity</Typography>
          <div>25-29 Jan, 2025</div>
        </div>

        {/* Slot Selection (Read-only View) */}
        <div className="flex gap-2 items-center w-full">
          <IconCouponWide className="text-dark-gray" />
          <Typography variant="caption" className="uppercase">Slot</Typography>
          <div className="flex flex-nowrap items-center">
            {/* Display Date as text, no interaction */}
            <div className="text-gray-700">
              {selectedDate.toLocaleDateString()}  {/* Display the formatted date */}
            </div>
            <div className="text-gray-700 ml-4 capitalize">
              {selectedSlotTime}  {/* Display selected slot time */}
            </div>
          </div>
        </div>
      </div>

      {/* Deal Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="uppercase pb-2">Wording for the Deal</Typography>
        <Typography variant="caption" className="!text-black">Enjoy $25 off on your next purchase. Treat yourself to the best deals and make your experience even more rewarding.</Typography>
      </div>

      {/* Follow-Up Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="uppercase pb-2">Wording for the follow-up message</Typography>
        <Typography variant="caption" className="!text-black">Enjoy [X]% off on your next purchase.</Typography>
      </div>

      {/* Customer Reach and File Upload Section */}
      <div className="flex justify-between">
        <div>
          <div className="relative p-4 rounded-2xl border border-light-gray w-max">
            <Image src="/icons/csv-preview.svg" width={48} height={48} alt="CSV Preview" />
          </div>
          <Typography variant="caption">Coupon.csv</Typography>
        </div>
        <div>
          <Typography variant="caption" className="uppercase pb-2">Total Number of Customers Reached for This DEALZ Broadcast</Typography>
          <div className="bg-light-gray text-black p-2 rounded w-full">
            {/* Display value instead of input */}
            1200
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <SlotNotAvailableDialog
        open={showSlotNotAvailableWarningDialog}
        onClose={() => setShowSlotNotAvailableDialog(false)}
        onSubmit={() => setShowSlotNotAvailableDialog(false)}
      />
      <RequestToReviseDialog
        open={showRequestReviseWarningDialog}
        onClose={() => setShowRequestReviseWarningDialog(false)}
        onSubmit={() => setShowRequestReviseWarningDialog(false)}
      />
    </div>
  );
}