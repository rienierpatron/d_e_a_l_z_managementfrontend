/**
 * External dependencies
 */
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import BackNavigation from "@/components/Common/BackNavigation";
import Button from "@/components/Common/Button";
import IconCloseOutlined from "@/components/Icons/IconCloseOutlined";
import Typography from "@/components/Common/Typography";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconDollar from "@/components/Icons/IconDollar";
import IconSave from "@/components/Icons/IconSave";
import IconClipboardClick from "@/components/Icons/IconClipboardClick";
import { DEALZ, SUBSCRIPTIONS } from "@/lib/constants";
import IconPercentage from "@/components/Icons/IconPercentage";
import { previewDealzDateRange, previewSlotDate } from "@/lib/date";
import { previewFileName } from "@/lib/utils";
import { api } from "@/api";
import SaveWarningDialog from "@/components/SaveWarningDialog";
import IconCalendar from "../Icons/IconCalendar";

const DealzBuilderStep5 = ({
  formData,
  setFormData,
  mode,
  dealzId = "",
  initialState,
  currentSubscription,
}) => {
  const {
    title,
    initial_message,
    offer_type,
    amount,
    valid_date_from,
    valid_date_to,
    link,
    followup_message,
    csv_file_name,
    coupon_code_file_url,
    coupon_creation_type,
    slot_date,
  } = formData;

  const isViewMode = mode === "view";
  const [saveWarningDialog, setSaveWarningDialog] = useState(null);

  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const handlBack = () => {
    if (isViewMode) {
      router.push("/calendar");
      return;
    }
    setFormData({
      ...formData,
      step: formData.step - 1,
    });
  };

  const handleSubmit = async (status) => {
    setIsLoading(status);
    const payload = {
      ...formData,
      status: status,
      amount:
        !formData.amount || formData.offer_type === DEALZ.OFFER_TYPE.Other
          ? 0
          : Number(formData.amount),
      link: formData.link ? formData.link : null,
      banner_image: formData.banner_image ? formData.banner_image : null,
      code:
        coupon_creation_type === DEALZ.COUPON_CREATION_TYPE.upload
          ? formData.coupon_code_file_url
          : formData.code,
    };
    delete payload.csv_file_name;
    delete payload.coupon_code_file_url;
    delete payload.step;
    if (
      currentSubscription?.subscription?.subscription_name?.toLowerCase() !==
      SUBSCRIPTIONS.SUBSCRIPTION_TYPES.Pro
    ) {
      delete payload.slot_time;
    }
    try {
      let res;
      if (dealzId) {
        res = await api.dealz.editDeal(dealzId, payload);
      } else {
        res = await api.dealz.createDeal(payload);
      }
      if (res.status === "ok") {
        setIsLoading(null);
        return router.push("/calendar");
      }
      setIsLoading(null);
    } catch (error) {
      setIsLoading(null);
      console.log("Error in upload file", error);
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <BackNavigation
            text="Preview the DEALZ"
            className="text-xl"
            baseClassName="!m-0"
            onClick={handlBack}
          />
          <Button
            className="text-red underline !p-0"
            borderless
            icon={<IconCloseOutlined />}
            onClick={() => {
              if (!dealzId) {
                setSaveWarningDialog(true);
              } else {
                router.push("/dashboard");
              }
            }}
          >
            Cancel
          </Button>
        </div>

        <div className="mt-4 bg-[linear-gradient(84deg,#E9F4FF_12.97%,#FFEDFF_92.92%)] p-6 rounded-3xl relative">
          <div className="absolute w-[60px] h-[60px] rounded-full bg-white top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4">
              <Typography variant="heading" className="!font-medium">
                {title}
              </Typography>
              <Typography variant="small" className="text-dark-gray">
                Your Next Favorite Deal Awaits
              </Typography>
            </div>
            {coupon_code_file_url &&
              DEALZ.COUPON_CREATION_TYPE.upload === coupon_creation_type && (
                <div className="flex flex-col gap-[6px] items-center w-max">
                  <div className="p-2 bg-white w-max rounded-lg">
                    <Image
                      src="/icons/csv-preview.svg"
                      width={30}
                      height={30}
                    />
                  </div>
                  {csv_file_name && (
                    <Typography variant="small" className="text-dark-gray">
                      {previewFileName(csv_file_name)}
                    </Typography>
                  )}
                </div>
              )}
          </div>
          <div className="h-[1px] border border-dashed border-#[D0C4D0] my-4"></div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-[6px]">
                <IconCoupon />
                <Typography variant="caption" className="uppercase">
                  DEALZ Type
                </Typography>
              </div>
              <Typography className="!font-medium" variant="body">
                Unique codes
              </Typography>
            </div>
            {offer_type !== DEALZ.OFFER_TYPE.Other && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  {offer_type === DEALZ.OFFER_TYPE.Percentage ? (
                    <IconPercentage />
                  ) : (
                    <IconDollar />
                  )}
                  <Typography variant="caption" className="uppercase">
                    {offer_type === DEALZ.OFFER_TYPE.Percentage
                      ? "Discount"
                      : "Dollar"}
                  </Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {offer_type === DEALZ.OFFER_TYPE.Percentage
                    ? `${amount}%`
                    : `$${amount}`}
                </Typography>
              </div>
            )}
            {link && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <Image src="/icons/global.svg" width={20} height={20} />
                  <Typography variant="caption" className="uppercase">
                    website or booking link
                  </Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {link}
                </Typography>
              </div>
            )}
            {slot_date && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <IconCalendar />
                  <Typography variant="caption" className="uppercase">
                    slot date
                  </Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {previewSlotDate(slot_date)}
                </Typography>
              </div>
            )}
            {valid_date_from && valid_date_to && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <Image src="/icons/global.svg" width={20} height={20} />
                  <Typography variant="caption" className="uppercase">
                    schedule
                  </Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {previewDealzDateRange(valid_date_from, valid_date_to)}
                </Typography>
              </div>
            )}
            <div className="bg-white rounded-2xl p-6">
              <Typography variant="caption" className="text-xs uppercase mb-4">
                wording for their deal
              </Typography>
              <Typography variant="caption" className="text-midnight-blue">
                {initial_message}
              </Typography>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <Typography variant="caption" className="text-xs uppercase mb-4">
                wording for the follow up message
              </Typography>
              <Typography variant="caption" className="text-midnight-blue">
                {followup_message}
              </Typography>
            </div>
          </div>
        </div>

        {!isViewMode && (
          <div className="flex items-center gap-4 mt-5">
            <Button
              icon={<IconSave />}
              variant="primary"
              isRound
              outlined
              className="w-full shadow-custom-primary font-bold"
              onClick={() => handleSubmit("draft")}
              isLoading={isLoading === "draft"}
              disabled={!!isLoading}
            >
              Save as Draft
            </Button>
            <Button
              icon={<IconClipboardClick />}
              variant="primary"
              isRound
              className="w-full shadow-custom-primary font-bold"
              onClick={() => handleSubmit("pending")}
              isLoading={isLoading === "pending"}
              disabled={!!isLoading}
            >
              Submit for Review
            </Button>
          </div>
        )}
      </div>
      <SaveWarningDialog
        open={saveWarningDialog}
        onClose={() => setSaveWarningDialog(false)}
        onSubmit={() => {
          setFormData(initialState);
          setSaveWarningDialog(false);
          router.push("/dealz/create");
        }}
      />
    </>
  );
};

export default DealzBuilderStep5;
