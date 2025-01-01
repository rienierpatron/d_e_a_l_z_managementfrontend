/**
 * External dependencies
 */
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

/**
 * Internal dependencies
 */
import SidbarUpgradeCta from "@/components/SidbarUpgradeCta";
import Button from "@/components/Common/Button";
import IconMessageQuestion from "@/components/Icons/IconMessageQuestion";
import { NAV_ITEMS } from "@/lib/routes";

const DesktopSidebar = () => {

  return (
    <nav className="w-[115px] h-full bg-white border border-l-0 border-t-0 border-b-0 border-light-gray fixed px-3 py-6 flex flex-col justify-between z-10">
      <div className="flex flex-col gap-12 justify-center items-center">
        <Image src="/dealz-logo.svg" width={67} height={26} />
        <ul className="flex flex-col gap-8">
          {NAV_ITEMS.map((item, index) => {
            return (
              <li
                className={classNames(
                  "cursor-pointer text-dark-gray hover:text-primary"
                )}
                key={index}
              >
                <Link
                  href={item.path}
                  className="flex items-center justify-center gap-2 flex-col"
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <SidbarUpgradeCta />
        </ul>
      </div>
      <ul className="flex flex-col gap-8 justify-center items-center">
        <li className="cursor-pointer">
          <div className="flex items-center justify-center">
            <IconMessageQuestion className="hover:text-primary" />
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
