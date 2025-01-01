/**
 * External dependencies
 */
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import IconCrown from "@/components/Icons/IconCrown";

const SidbarUpgradeCta = () => {
  const router = useRouter();

  const handleRedirect = (event) => {
    // Check if Ctrl or Meta (Cmd) is pressed
    if (event.ctrlKey || event.metaKey) {
      window.open("/subscriptions", "_blank");
    } else {
      router.push("/subscriptions");
    }
  };

  return (
    <div
      className="bg-gradient-primary shadow-custom-purple px-[7px] py-4 rounded-2xl flex flex-col gap-2 justify-center items-center cursor-pointer"
      onClick={handleRedirect}
    >
      <IconCrown height={18} width={18} className="text-white" />
      <Typography
        variant="small"
        className="uppercase !font-bold text-white text-center"
      >
        upgrade to premium
      </Typography>
    </div>
  );
};

export default SidbarUpgradeCta;
