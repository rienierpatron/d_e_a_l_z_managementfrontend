/**
 * Internal dependencies
 */
import Button from "@/components/Common/Button";
import IconArrowRight from "@/components/Icons/IconArrowRight";
import Typography from "@/components/Common/Typography";
import IconStar from "@/components/Icons/IconStar";
import IconCrown from "../Icons/IconCrown";
import classNames from "classnames";

const PlanCard = ({
  planTitle,
  promotionText,
  priceCurrency,
  priceAmount,
  priceOldAmount,
  pricePeriod,
  benefits,
}) => {
  const currentPlan = "Pro";
  const isActivePlan = currentPlan === planTitle;
  const className = classNames(
    "relative max-w-[393px] border rounded-2xl p-[24px] pt-[56px] w-full text-center flex flex-col gap-8 items-center flex-wrap",
    {
      "border-2 border-transparent rounded-3xl shadow-[0px_4px_48px_0px_rgba(96,112,233,0.10)]":
        isActivePlan,
    }
  );
  const activePlanStyle = {
    background:
      "linear-gradient(to right, white, white), linear-gradient(to bottom, #4177F4 11.43%, #F945B1 82.92%)",
    backgroundClip: "padding-box, border-box",
    backgroundOrigin: "padding-box, border-box",
  };
  return (
    <div
      className={className}
      style={{
        ...activePlanStyle,
      }}
    >
      {isActivePlan && (
        <div className="w-[120px] h-[120px] absolute top-0 right-[20px] rounded-full bg-[#5074F0] blur-[125px]"></div>
      )}
      {isActivePlan && (
        <div className="w-[120px] h-[120px] absolute bottom-0 left-[20px] rounded-full bg-primary blur-[125px]"></div>
      )}
      <Button
        className={
          "!absolute -top-[30px] border-none uppercase bg-gradient-primary text-white font-bold shadow-[0px_4px_24px_0px_rgba(96,112,233,0.40)]"
        }
        isRound
        icon={
          planTitle.toLowerCase() === "starter" ? <IconStar /> : <IconCrown />
        }
      >
        {planTitle}
      </Button>
      <Typography
        variant="caption"
        className="p-3 border text-center rounded-3xl w-max"
      >
        {promotionText}
      </Typography>
      <div className="flex gap-2 items-baseline">
        <div className="flex items-baseline">
          <Typography variant="body" className="!text-green !font-semibold">
            {priceCurrency}
          </Typography>
          <Typography variant="title" className="!text-green !font-semibold">
            {priceAmount}
          </Typography>
          <Typography className="!text-dark-gray !font-medium">
            /{pricePeriod}
          </Typography>
        </div>
        <Typography className="!text-midnight-blue !font-medium !text-[18px] line-through">
          {priceOldAmount}
        </Typography>
      </div>
      <ul className="text-dark-gray flex flex-col gap-6 text-base">
        {benefits.map((item, index) => {
          return <li key={index}>&#8226; {item}</li>;
        })}
      </ul>
      <Button
        className="w-full mt-auto z-10"
        variant="primary"
        outlined={!isActivePlan}
        isRound
        icon={<IconArrowRight />}
        iconPosition="right"
      >
        Choose Plan
      </Button>
    </div>
  );
};

export default PlanCard;
