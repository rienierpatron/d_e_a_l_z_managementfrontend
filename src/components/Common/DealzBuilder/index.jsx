import { useState } from "react";
import DealzBuilderStep1 from "./step1";
import Image from "next/image";
import classNames from "classnames";
import Typography from "../Typography";
import DealzBuilderStep2 from "./step2";

const DealzBuilder = () => {
  const TOTAL_STEPS = 5;
  const initialState = {
    step: 1,
  };
  const [formData, setFormData] = useState(initialState);
  const { step } = formData;

  return (
    <div className="max-w-[850px] flex justify-center pt-8 pb-[38px]">
      <div className="border border-light-gray p-6 rounded-3xl">
        <div className="flex gap-4">
          <Image
            src="/images/create-dealz-banner-1.svg"
            height={160}
            width={171}
          />
          <Image
            src="/images/create-dealz-banner-2.svg"
            height={160}
            width={171}
          />
          <Image
            src="/images/create-dealz-banner-3.svg"
            height={160}
            width={171}
          />
        </div>
        <div className="flex items-center gap-4 mt-6">
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
          />
        )}
        {step === 2 && (
          <DealzBuilderStep2 formData={formData} setFormData={setFormData} />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default DealzBuilder;
