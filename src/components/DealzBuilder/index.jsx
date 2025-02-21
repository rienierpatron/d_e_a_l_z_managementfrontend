/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import MobilePreview from "@/components/MobilePreview";
import DealzBuilderStep1 from "@/components/DealzBuilder/step1";
import DealzBuilderStep2 from "@/components/DealzBuilder/step2";
import DealzBuilderStep3 from "@/components/DealzBuilder/step3";
import DealzBuilderStep4 from "@/components/DealzBuilder/step4";
import DealzBuilderStep5 from "@/components/DealzBuilder/step5";
import { DEALZ, DEALZ_STATUS_VALUE } from "@/lib/constants";
import { api } from "@/api";
import { getDealzFormattedData } from "./utils";
import { useSubscription } from "../Subscriptions/GetSubscriptionDetails";
import SaveWarningDialog from "../SaveWarningDialog";
import useUnsavedChanges from "@/hooks/useUnsavedChanges";

const DealzBuilder = ({ dealzId = "", mode = "" }) => {
  const router = useRouter();
  const TOTAL_STEPS = 4;
  const initialState = {
    step: 1,
    title: null,
    initial_cta_text: "Acme",
    dealz_text: `Hi! 😊\n\nWe’re excited to welcome you to Bistro Delight for a memorable evening! 🎉
Get 25% Off Your Dinner 🍽️ at Bistro Delight, located at 123 Main Street, Downtown.
Valid on February 20th, 2025, from 6 PM to 10 PM.\n\nDon’t miss out on this special offer – reserve your table today! 📲\n\nLooking forward to seeing you!`,
    cta_link_text: null,
    link: null,
    dealz_image: null,
    coupon_code_type: DEALZ.COUPON_CODE_TYPE.universal,
    slot_date: null,
    slot_time: null,
    valid_date_from: null,
    valid_date_to: null,
    daily_deal: true,
    weekly_deal: false,
  };
  const [isFormDirty, setIsFormDirty] = useState(false);
  const {
    showDialog: saveWarningDialog,
    setShowDialog: setSaveWarningDialog,
    confirmLeave,
  } = useUnsavedChanges(isFormDirty);
  const [formData, setFormData] = useState(initialState);
  const { currentSubscription } = useSubscription();
  const { step } = formData;

  const fetchDealzData = async () => {
    try {
      const res = await api.dealz.viewDealById(dealzId);
      if (res.status === "ok") {
        const formattedData = getDealzFormattedData(res.data);
        if (
          mode === "edit" &&
          res.data?.dealz?.status === DEALZ_STATUS_VALUE.pending
        ) {
          router.push(`/dealz/view/${dealzId}`);
          return;
        }
        if (mode === "view") {
          formattedData.step = 4;
        }
        setFormData(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dealzId) {
      fetchDealzData();
    }
  }, [dealzId]);

  const getPreviewCTAText = () => {
    if (step === 1 && formData?.initial_cta_text) {
      return [
        {
          type: "quick_reply",
          text: formData.initial_cta_text,
        },
      ];
    }
    if (step > 1 && formData?.cta_link_text) {
      return [
        {
          type: "cta",
          text: formData.cta_link_text,
        },
      ];
    }
    return [];
  };

  return (
    <div className="flex justify-center pt-8 pb-[38px] m-auto gap-6">
      <div className="w-[579px] border border-light-gray p-6 rounded-3xl self-start">
        {step !== 5 && (
          <div className="flex gap-4">
            <div className="flex-1 bg-[url('/images/create-dealz-banner-1.svg')] bg-contain h-[160px] bg-no-repeat" />
            <div className="flex-1 bg-[url('/images/create-dealz-banner-2.svg')] bg-contain h-[160px] bg-no-repeat" />
            <div className="flex-1 bg-[url('/images/create-dealz-banner-3.svg')] bg-contain h-[160px] bg-no-repeat" />
          </div>
        )}
        <div
          className={classNames("flex items-center gap-4 mt-6", {
            "mt-0": step === 5,
          })}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((ele) => {
            return (
              <div
                className={classNames(
                  "h-[6px] bg-light-blue flex-1 rounded-[32px]",
                  {
                    "bg-gradient-primary": step >= ele,
                  }
                )}
              ></div>
            );
          })}
          <Typography variant="caption" className="text-midnight-blue">
            Step {step}/{TOTAL_STEPS}
          </Typography>
        </div>
        {step === 1 && (
          <DealzBuilderStep1
            formData={formData}
            setFormData={setFormData}
            dealzId={dealzId}
            currentSubscription={currentSubscription}
            setIsFormDirty={setIsFormDirty}
          />
        )}
        {step === 2 && (
          <DealzBuilderStep2
            formData={formData}
            setFormData={setFormData}
            setIsFormDirty={setIsFormDirty}
          />
        )}
        {/* {step === 3 && (
          <DealzBuilderStep3
            formData={formData}
            setFormData={setFormData}
            currentSubscription={currentSubscription}
            setIsFormDirty={setIsFormDirty}
          />
        )} */}
        {step === 3 && (
          <DealzBuilderStep4
            formData={formData}
            setFormData={setFormData}
            currentSubscription={currentSubscription}
            setIsFormDirty={setIsFormDirty}
          />
        )}
        {step === 4 && (
          <DealzBuilderStep5
            formData={formData}
            setFormData={setFormData}
            mode={mode}
            dealzId={dealzId}
            initialState={initialState}
            currentSubscription={currentSubscription}
            setIsFormDirty={setIsFormDirty}
          />
        )}
      </div>
      <MobilePreview
        message={
          step === 1
            ? "your order for today’s *DEALZ* is here!\n\nClick the button below to reveal"
            : formData?.dealz_text
        }
        ctaList={getPreviewCTAText()}
        image={step > 1 || mode === "view" ? formData?.dealz_image : ""}
      />
      <SaveWarningDialog
        open={saveWarningDialog}
        onClose={() => setSaveWarningDialog(false)}
        onSubmit={() => {
          confirmLeave();
        }}
      />
    </div>
  );
};

export default DealzBuilder;
