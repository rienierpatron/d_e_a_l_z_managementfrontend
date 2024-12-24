import Image from "next/image";
import Typography from "../Typography";

const SidbarUpgradeCta = () => {
  return (
    <div className="bg-gradient-primary shadow-custom-purple px-[7px] py-4 rounded-2xl flex flex-col gap-2 justify-center items-center cursor-pointer">
      <Image src="/icons/crown.svg" height={18} width={18} alt="crown-icon" />
      <Typography variant="small" className="uppercase !font-bold text-white text-center">
        upgrade to premium
      </Typography>
    </div>
  );
};

export default SidbarUpgradeCta;
