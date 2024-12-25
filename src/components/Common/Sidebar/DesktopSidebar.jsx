import Image from "next/image";
import SidbarUpgradeCta from "../../SidbarUpgradeCta";
import Button from "../Button";
import classNames from "classnames";
import IconAdd from "../../Icons/IconAdd";
import IconCategory from "../../Icons/IconCategory";
import IconCalendar from "../../Icons/IconCalendar";
import IconProfileTwoUser from "../../Icons/IconProfileTwoUser";
import IconChaaatLogo from "../../Icons/IconChaaatLogo";
import IconMessageQuestion from "../../Icons/IconMessageQuestion";

const navItems = [
  {
    icon: <IconCategory width={24} height={24}/>,
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <IconAdd width={24} height={24}/>,
    path: "/dashboard",
    label: "Create DEALZ",
  },
  {
    icon: <IconCalendar width={24} height={24}/>,
    path: "/dashboard",
    label: "Calendar",
  },
  {
    icon: <IconProfileTwoUser width={24} height={24}/>,
    path: "/dashboard",
    label: "Referral",
  },
  {
    icon: <IconChaaatLogo />,
    path: "/dashboard",
    label: "Retarget",
  },
];

const DesktopSidebar = () => {
  return (
    <nav className="w-[115px] h-full bg-white border border-l-0 border-t-0 border-b-0 border-light-gray fixed px-3 py-6 flex flex-col justify-between">
      <div className="flex flex-col gap-12 justify-center items-center">
        <Image src="/dealz-logo.svg" width={67} height={26} />
        <ul className="flex flex-col gap-8">
          {navItems.map((item, index) => {
            return (
              <li
                className={classNames(
                  "cursor-pointer text-dark-gray hover:text-primary"
                )}
                key={index}
              >
                <div className="flex items-center justify-center gap-2 flex-col">
                  {/* <Image src={item.icon} width={24} height={24} /> */}
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </li>
            );
          })}
          <SidbarUpgradeCta />
        </ul>
      </div>
      <ul className="flex flex-col gap-8 justify-center items-center">
        <li className="cursor-pointer">
          <div className="flex items-center justify-center">
            <IconMessageQuestion className="hover:text-primary"/>
          </div>
        </li>
        <li className="cursor-pointer">
          <Button variant="primary" className="rounded-full p-4 h-12 w-12">
            JA
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopSidebar;
