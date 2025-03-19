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
import IconSave from "@/components/Icons/IconSave";
import IconClipboardClick from "@/components/Icons/IconClipboardClick";
import { SUBSCRIPTIONS } from "@/lib/constants";
import { previewDealzDateRange, previewSlotDate } from "@/lib/date";
import { api } from "@/api";
import SaveWarningDialog from "@/components/SaveWarningDialog";
import IconCalendar from "../Icons/IconCalendar";
import { helper } from "@/helpers";
import IconClock from "../Icons/IconClock";
import IconTextBlock from "../Icons/IconTextBlock";
import IconLink from "../Icons/IconLink";

const DealzBuilderStep5 = ({
  formData,
  setFormData,
  mode,
  dealzId = "",
  initialState,
  currentSubscription,
  setIsFormDirty,
}) => {
  const {
    title,
    valid_date_from,
    valid_date_to,
    link,
    slot_date,
    slot_time,
    cta_link_text,
    initial_cta_text,
    dealz_text,
    dealz_image,
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

  const handleSubmit = async (status, redirect = "") => {
    setIsLoading(status);
    setIsFormDirty(false);
    const payload = {
      ...formData,
      status: status === "one-time-purchase" ? "draft" : status,
      link: formData.link,
      banner_image: null,
      code: null,
      amount: null,
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
        if (redirect) {
          return router.push(redirect);
        } else {
          return router.push("/calendar");
        }
      } else {
        setIsLoading(null);
        if (
          res &&
          res?.data?.status === "error" &&
          res.data.message ===
            "Please subscribe to a plan to submit DEALZ for review."
        ) {
          helper.general.alert("error", {
            message: (
              <span>
                {res.data.message}{" "}
                <a href="/subscriptions" className="text-secondary underline">
                  Subscribe Now
                </a>
              </span>
            ),
          });
        }
      }
      setIsLoading(null);
    } catch (error) {
      setIsLoading(null);
      console.log(error);
    }
  };

  const showOneTimePurchaseButton = () => {
    // Condition: No subscription
    if (!currentSubscription?.subscription) {
      return true;
    }
    // Get available slot count
    const availableSlots = currentSubscription?.available_inventory?.slot ?? 0;

    // Condition: If available slot count is 0
    if (availableSlots === 0) {
      return true;
    }
    return false;
  };

  const handleOneTimePurchase = async () => {
    try {
      const status = "one-time-purchase";
      await handleSubmit(status, "/subscriptions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <BackNavigation
            text="Review your DEAL"
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
                Your next favorite deal awaits
              </Typography>
            </div>
            {dealz_image && (
              <div className="flex flex-col gap-[6px] items-center w-max">
                <div className="bg-white w-max">
                  <Image
                    src={dealz_image}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="h-[1px] border border-dashed border-#[D0C4D0] my-4"></div>
          <div className="flex flex-col gap-6">
            {slot_date && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <IconCalendar />
                  <Typography variant="caption">Slot date</Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {previewSlotDate(slot_date)}
                  {""}
                </Typography>
              </div>
            )}
            {slot_time && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px] items-center">
                  <IconClock />
                  <Typography variant="caption">Slot time</Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {slot_time.charAt(0) + slot_time.slice(1).toLowerCase()}
                </Typography>
              </div>
            )}
            {valid_date_from && valid_date_to && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px]">
                  <Image src="/icons/global.svg" width={20} height={20} />
                  <Typography variant="caption">Schedule</Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {previewDealzDateRange(valid_date_from, valid_date_to)}
                </Typography>
              </div>
            )}
            {initial_cta_text && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px] items-center">
                  <Image src="/icons/tag-icon.svg" width={20} height={20} />
                  <Typography variant="caption">Business name</Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {initial_cta_text}
                </Typography>
              </div>
            )}
            {cta_link_text && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px] items-center">
                  <IconTextBlock />
                  <Typography variant="caption">Button link text</Typography>
                </div>
                <Typography className="!font-medium" variant="body">
                  {cta_link_text}
                </Typography>
              </div>
            )}
            {link && (
              <div className="flex justify-between items-center">
                <div className="flex gap-[6px] items-center">
                  <IconLink />
                  <Typography variant="caption">Link</Typography>
                </div>
                <Typography
                  className="!font-medium break-all max-w-[200px]"
                  variant="body"
                >
                  {link}
                </Typography>
              </div>
            )}
            <div className="bg-white rounded-2xl p-6">
              <Typography variant="caption" className="text-xs mb-4">
                Dealz text
              </Typography>
              <Typography
                variant="caption"
                className="text-midnight-blue whitespace-pre-wrap"
              >
                {dealz_text}
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="mt-2 w-[5px] h-[5px] bg-dark-gray rounded-full flex-shrink-0"></div>
                <span className="text-xs text-dark-gray font-medium">
                  <a
                    className="text-secondary underline"
                    href="/files/redemption-flow-guide.pdf"
                    target="_blank"
                  >
                    Click here
                  </a>{" "}
                  to review the redemption flow and notify your staff about the
                  active deal.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-2 w-[5px] h-[5px] bg-dark-gray rounded-full flex-shrink-0"></div>
                <span className="text-xs text-dark-gray font-medium">
                  By submitting, you agree that your deal will be reviewed by
                  the DEALZ team to ensure compliance with guidelines.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-2 w-[5px] h-[5px] bg-dark-gray rounded-full flex-shrink-0"></div>
                <span className="text-xs text-dark-gray font-medium">
                  You will receive a notification once your deal has been
                  approved.
                </span>
              </div>
            </div>
          </div>
        </div>

        {!isViewMode && (
          <div className="flex flex-col">
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
            {showOneTimePurchaseButton() && (
              <Button
                outlined
                // variant="primary"
                isRound
                className="mt-4 !text-secondary !border-secondary hover:!border-secondary hover:!text-secondary"
                onClick={() => handleOneTimePurchase()}
                isLoading={isLoading === "one-time-purchase"}
                disabled={!!isLoading}
              >
                Save as Draft & make one-time purchase
              </Button>
            )}
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
