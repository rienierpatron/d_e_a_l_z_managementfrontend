import BackNavigation from "@/components/Common/BackNavigation";
import Button from "@/components/Common/Button";
import IconCloseOutlined from "@/components/Icons/IconCloseOutlined";
import Typography from "@/components/Common/Typography";
import Image from "next/image";
import IconCoupon from "@/components/Icons/IconCoupon";
import IconDollar from "@/components/Icons/IconDollar";
import IconSave from "@/components/Icons/IconSave";
import IconClipboardClick from "@/components/Icons/IconClipboardClick";

const DealzBuilderStep5 = ({ formData, setFormData }) => {
  const handlBack = () => {
    setFormData({
      ...formData,
      step: formData.step - 1,
    });
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      step: formData.step + 1,
    });
  };

  return (
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
        >
          Cancel
        </Button>
      </div>

      <div className="mt-4 bg-[linear-gradient(84deg,#E9F4FF_12.97%,#FFEDFF_92.92%)] p-6 rounded-3xl relative">
        <div className="absolute w-[60px] h-[60px] rounded-full bg-white top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <Typography variant="heading" className="!font-medium">
              Holiday Specials
            </Typography>
            <Typography variant="small" className="text-dark-gray">
              Your Next Favorite Deal Awaits
            </Typography>
          </div>
          <div className="flex flex-col gap-[6px] items-center w-max">
            <div className="p-2 bg-white w-max rounded-lg">
              <Image src="/icons/csv-preview.svg" width={30} height={30} />
            </div>
            <Typography variant="small" className="text-dark-gray">
              Coupon.csv
            </Typography>
          </div>
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
          <div className="flex justify-between items-center">
            <div className="flex gap-[6px]">
              <IconDollar />
              <Typography variant="caption" className="uppercase">
                Discount
              </Typography>
            </div>
            <Typography className="!font-medium" variant="body">
              $25
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[6px]">
              <Image src="/icons/global.svg" width={20} height={20} />
              <Typography variant="caption" className="uppercase">
                website or booking link
              </Typography>
            </div>
            <Typography className="!font-medium" variant="body">
              www.xyz.com
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-[6px]">
              <Image src="/icons/global.svg" width={20} height={20} />
              <Typography variant="caption" className="uppercase">
                schedule
              </Typography>
            </div>
            <Typography className="!font-medium" variant="body">
              25-29 Dec, 2024
            </Typography>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <Typography variant="caption" className="text-xs uppercase mb-4">
              wording for their deal
            </Typography>
            <Typography variant="caption" className="text-midnight-blue">
              Enjoy $25 off on your next purchase. Treat yourself to the best
              deals and make your experience even more rewarding.
            </Typography>
          </div>
          <div className="bg-white rounded-2xl p-6">
            <Typography variant="caption" className="text-xs uppercase mb-4">
              wording for the follow up message
            </Typography>
            <Typography variant="caption" className="text-midnight-blue">
              Enjoy [X]% off on your next purchase.
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          icon={<IconSave />}
          variant="primary"
          isRound
          outlined
          className="w-full shadow-custom-primary font-bold"
        >
          Save as Draft
        </Button>
        <Button
          icon={<IconClipboardClick />}
          variant="primary"
          isRound
          className="w-full shadow-custom-primary font-bold"
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default DealzBuilderStep5;
