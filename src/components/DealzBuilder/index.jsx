/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import classNames from "classnames";

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
import { DEALZ } from "@/lib/constants";
import { api } from "@/api";
import { getDealzFormattedData } from "./utils";

const DealzBuilder = ({ dealzId = "", mode = "" }) => {
  const TOTAL_STEPS = 5;
  const initialState = {
    step: 1,
    title: null,
    initial_message: null,
    offer_type: null,
    amount: null,
    banner_image: null,
    coupon_code_file_url: null,
    followup_message: null,
    link: null,
    coupon_code_type: DEALZ.COUPON_CODE_TYPE.universal,
    slot_date: null,
    slot_time: null,
    valid_date_from: null,
    valid_date_to: null,
    daily_deal: true,
    weekly_deal: false,
    csv_file_name: null,
    coupon_creation_type: null,
    code: null,
  };
  const [formData, setFormData] = useState(initialState);
  const { step } = formData;

  const fetchDealzData = async () => {
    try {
      const res = await api.dealz.viewDealById(dealzId);
      if (res.status === "ok") {
        const formattedData = getDealzFormattedData(res.data);
        if (mode === "view") {
          formattedData.step = 5;
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
          <DealzBuilderStep1 formData={formData} setFormData={setFormData} />
        )}
        {step === 2 && (
          <DealzBuilderStep2 formData={formData} setFormData={setFormData} />
        )}
        {step === 3 && (
          <DealzBuilderStep3 formData={formData} setFormData={setFormData} />
        )}
        {step === 4 && (
          <DealzBuilderStep4 formData={formData} setFormData={setFormData} />
        )}
        {step === 5 && (
          <DealzBuilderStep5
            formData={formData}
            setFormData={setFormData}
            mode={mode}
            dealzId={dealzId}
          />
        )}
      </div>
      <MobilePreview
        message={formData.initial_message}
        image={formData?.banner_image}
      />
    </div>
  );
};

export default DealzBuilder;
