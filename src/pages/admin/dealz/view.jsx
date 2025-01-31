import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { helper } from "@/helpers";
import Typography from "@/components/Common/Typography";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconCalendar from "@/components/Icons/IconCalendar";
import IconDollar from "@/components/Icons/IconDollar";
import IconCouponWide from "@/components/Icons/IconCouponWide";
import IconCompany from "@/components/Icons/IconCompany";
import IconGlobe from "@/components/Icons/IconGlobe";
import Image from "next/image";
import { getDealzSuperAdminRecordDetail } from "@/api/dealz";

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
  const router = useRouter();
  const [dealzId, setDealzId] = useState(null);
  const [dealzDetails, setDealzDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const showMessage = false;
      const response = await getDealzSuperAdminRecordDetail(dealzId, showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        setDealzDetails(response.data);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading deal details...</div>;
  }

  // Return an error message if no dealzDetails are found
  if (!dealzDetails) {
    return <div className="text-center py-6">Deal details not found.</div>;
  }

  return (
    <div className="w-full px-10 py-8">
      {/* Header Section */}
      <div className="flex justify-between pb-8">
        <div>
          <Typography variant="heading">{dealzDetails.dealz?.title}</Typography>
          <Typography variant="caption">{dealzDetails.dealz?.description}</Typography>
        </div>
      </div>

      {/* Deal Information Section */}
      <div className="grid grid-cols-2 gap-4 pb-5">
        <DealInfoCard icon={IconCompany} label="Agency Name">{dealzDetails.dealz?.agency_user?.agency?.agency_name}</DealInfoCard>
        <DealInfoCard icon={IconCoupon} label="DEALZ Type">
          {dealzDetails.dealz?.daily_deal
            ? "Daily Dealz"
            : dealzDetails.dealz?.weekly_deal
            ? "Weekly Deal"
            : "No Deal Type"}
        </DealInfoCard>
        <DealInfoCard icon={IconCoupon} label="DEALZ Code">{dealzDetails.dealz?.coupon_code_type}</DealInfoCard>
        
        <DealInfoCard icon={IconDollar} label="Discount">${dealzDetails.dealz?.amount}</DealInfoCard>
        <DealInfoCard icon={IconGlobe} label="Website or Booking link">{dealzDetails.dealz?.link}</DealInfoCard>
        
        {/* Validity */}
        <div className="flex gap-2 items-center">
          <IconCalendar className="text-dark-gray" />
          <Typography variant="caption" className="uppercase">Validity</Typography>
          <div>{dealzDetails.dealz?.validity_date}</div>
        </div>

        <DealInfoCard icon={IconCoupon} label="Coupon created method">{dealzDetails.dealz?.coupon_creation_type}</DealInfoCard>

        {/* Slot Selection (Read-only View) */}
        <div className="flex gap-2 items-center w-full">
          <IconCouponWide className="text-dark-gray" />
          <Typography variant="caption" className="uppercase">Slot</Typography>
          <div className="flex flex-nowrap items-center">
            {/* Display Date as text, no interaction */}
            <div className="text-gray-700">
              {dealzDetails.dealz?.slot_date_time}
            </div>
          </div>
        </div>
      </div>

      <DealInfoCard icon={IconCalendar} label="Created date">{dealzDetails.dealz?.created_date_time_ago}</DealInfoCard>

      {/* Deal Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="uppercase pb-2">Wording for the Deal</Typography>
        <Typography variant="caption" className="!text-black">{dealzDetails.dealz?.initial_message}</Typography>
      </div>

      {/* Follow-Up Wording Section */}
      <div className="p-4 border border-light-gray rounded-xl my-6">
        <Typography variant="caption" className="uppercase pb-2">Wording for the follow-up message</Typography>
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
              <Typography variant="caption" className="pr-1">Generated Coupon Code:</Typography>
              <Typography>{dealzDetails.coupons?.[0]?.code}</Typography>
            </div>
          )}
        </div>
        <div>
          <Typography variant="caption" className="uppercase pb-2">Total Number of Customers Reached for This DEALZ Broadcast</Typography>
          <div className="bg-light-gray text-black p-2 rounded w-full">
            {/* Display value instead of input */}
            {dealzDetails.dealz?.reach_count || "0"}
          </div>
        </div>
      </div>
    </div>
  );
}