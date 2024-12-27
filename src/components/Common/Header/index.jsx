import { useRouter } from "next/router";
import Button from "@/components/Common/Button";
import Typography from "@/components/Common/Typography";
import { ROUTES_HEADING_MAPPER } from "@/lib/routes";
import IconStar from "@/components/Icons/IconStar";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className="h-[104px] bg-background-blue py-6 px-10 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Typography variant="title">
          {ROUTES_HEADING_MAPPER[pathname]}
        </Typography>
        <Button
          className="border-none uppercase bg-gradient-primary text-base font-bold text-white shadow-custom-purple"
          isRound
          icon={<IconStar />}
        >
          starter
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button className="border-none shadow-custom-black font-medium" isRound>
          Manage Preferences
        </Button>
        <Button
          className="border-none relative shadow-custom-black !p-[14px]"
          isRound
          icon="/icons/notification-black.svg"
        >
          <span className="absolute right-0 top-0 text-[10px] font-semibold bg-primary text-white rounded-[32px] py-[2px] px-[5px]">
            13
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
