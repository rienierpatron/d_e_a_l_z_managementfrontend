import { useState } from "react";
import classNames from "classnames";

import Typography from "@/components/Common/Typography";
import MobilePreview from "@/components/MobilePreview";
import DealzBuilderStep1 from "@/components/DealzBuilder/step1";
import DealzBuilderStep2 from "@/components/DealzBuilder/step2";
import DealzBuilderStep3 from "@/components/DealzBuilder/step3";
import DealzBuilderStep4 from "@/components/DealzBuilder/step4";
import DealzBuilderStep5 from "@/components/DealzBuilder/step5";

const DealzBuilder = () => {
  const TOTAL_STEPS = 5;
  const initialState = {
    step: 1,
  };
  const [formData, setFormData] = useState(initialState);
  const { step } = formData;

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
          <DealzBuilderStep5 formData={formData} setFormData={setFormData} />
        )}
      </div>
      <MobilePreview />
    </div>
  );
};

export default DealzBuilder;
