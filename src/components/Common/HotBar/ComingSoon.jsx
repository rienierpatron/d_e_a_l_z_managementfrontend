import IconStar2 from "@/components/Icons/IconStart2";
import Typography from "../Typography";

const ComingSoon = () => {
  return (
    <div className="w-full text-center p-3 bg-gradient-to-r from-[#b3e274] to-[#5a73f2]">
      <div className="flex items-center justify-center gap-3">
        <IconStar2 className="text-white" />
        <div className="bg-white-20 rounded-lg p-2 flex items-center justify-between gap-2">
          <Typography className="text-primary text-sm font-semibold">
            HKD$2499
          </Typography>
          <Typography variant="small" className="text-midnight-blue">
            DEALZ of the week slot
          </Typography>
        </div>
        <span className="text-white text-sm font-medium italic">
          This Feature will be available in next month
        </span>
        <IconStar2 className="text-white" />
      </div>
    </div>
  );
};

export default ComingSoon;
