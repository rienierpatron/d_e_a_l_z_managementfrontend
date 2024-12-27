import { useState } from "react";
import classNames from "classnames";
import Typography from "@/components/Common/Typography";
import DealzBuilderStep1 from "./step1";
import DealzBuilderStep2 from "./step2";
import DealzBuilderStep3 from "./step3";
import DealzBuilderStep4 from "./step4";
import DealzBuilderStep5 from "./step5";
import Image from "next/image";
import IconAdd from "@/components/Icons/IconAdd";

const DealzBuilder = () => {
  const TOTAL_STEPS = 5;
  const initialState = {
    step: 5,
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
      <div className="w-[320px] relative h-[830px]">
        <img src="/images/iphone-14-frame.png" className="w-full self-start" />

        <div className="flex items-center justify-between absolute top-[12px] left-0 px-[30px] w-full">
          <Typography className="!font-semibold ml-2">12:00</Typography>
          <Image src="/images/iphone-top-right.png" width={80} height={80} />
        </div>

        <div className="flex items-center justify-between w-full absolute top-[50px] px-[30px]">
          <div className="flex items-center gap-2">
            <Image src="/icons/phone-back-icon.svg" width={20} height={20} />
            <div className="w-[30px] h-[30px] bg-light-gray rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/camera-icon.svg" width={40} height={40} />
            <Image src="/icons/phone-icon.svg" width={30} height={30} />
          </div>
        </div>

        <img
          src="/images/wa_white.jpeg"
          className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 p-5 h-[520px]"
        />

        <div className="flex justify-between items-center gap-2 px-[30px] absolute w-full bottom-[215px]">
          <IconAdd className="text-secondary" />
          <div className="w-full h-8 border-2 border-light-gray rounded-[32px]"></div>
        </div>
      </div>
    </div>
  );
};

export default DealzBuilder;
