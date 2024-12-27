import Typography from "@/components/Common/Typography";
import IconCrown from "@/components/Icons/IconCrown";

const SidbarUpgradeCta = () => {
  return (
    <div className="bg-gradient-primary shadow-custom-purple px-[7px] py-4 rounded-2xl flex flex-col gap-2 justify-center items-center cursor-pointer">
      <IconCrown height={18} width={18} className="text-white"/>
      <Typography variant="small" className="uppercase !font-bold text-white text-center">
        upgrade to premium
      </Typography>
    </div>
  );
};

export default SidbarUpgradeCta;
