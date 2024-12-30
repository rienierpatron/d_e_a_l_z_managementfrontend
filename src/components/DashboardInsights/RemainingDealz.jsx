import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import IconAdd from "@/components/Icons/IconAdd";
import IconColoredCoupon from "@/components/Icons/IconColoredCoupon";
import IconCouponWide from "@/components/Icons/IconCouponWide";
import { useRouter } from "next/router";
import Image from "next/image";

const RemainingDealz = ({ totalDealz, remainingDealz }) => {
  const router = useRouter();

  const organizeDeals = (totalDealz, remainingDealz) => {
    // Create an array for used deals
    const usedDeals = Array(totalDealz - remainingDealz).fill({ used: true });

    // Create an array for remaining deals
    const remainingDealsArray = Array(remainingDealz).fill({ used: false });

    // Combine both arrays
    const allDeals = [...usedDeals, ...remainingDealsArray];

    return allDeals;
  };

  const organizedDeals = organizeDeals(totalDealz, remainingDealz);

  return (
    <div className="border border-light-gray rounded-2xl px-6 py-8 flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <Typography className="uppercase font-medium" variant="caption">
          Deal Remaining
        </Typography>
        <Typography className="font-semibold" variant="heading">
          {remainingDealz}/
          <span className="font-normal text-sm text-midnight-blue">
            {totalDealz}
          </span>
        </Typography>
      </div>
      <div className="grid grid-cols-5 gap-x-6 gap-y-3 w-max">
        {organizedDeals.map((ele) => {
          return ele.used ? <IconColoredCoupon /> : <IconCouponWide />;
        })}
      </div>
      <Button
        variant="primary"
        className="px-4 py-[10px] w-max"
        outlined
        icon={<IconAdd />}
        isRound
        onClick={() => router.push("/dealz/create")}
      >
        Create Deal
      </Button>
      <Image src="/images/coupon.svg" width={100} height={100} objectFit="contain"/>
    </div>
  );
};

export default RemainingDealz;
