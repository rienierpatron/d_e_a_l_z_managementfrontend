import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { helper } from "@/helpers";
import Typography from "../../Common/Typography";
import Image from "next/image";
import { forwardRef } from "react";
import IconCrown from "@/components/Icons/IconCrown";

const UserSettingsMenu = forwardRef(({ isSuperAdmin }, ref) => {
  const currentUser = useUser();

  return (
    <div
      ref={ref}
      className="absolute w-[265px] bottom-5 left-[90%] transform -translate-x-3/2 bg-white shadow-lg p-4 rounded-md border border-light-grat"
    >
      <ul className="pt-1">
        <li className="flex gap-2 pb-4 items-center border-b border-light-gray">
          {/* Profile Initials inside a Circle */}
          <div className="flex-shrink-0 p-1 bg-gradient-primary text-white w-10 h-10 flex items-center justify-center rounded-full">
            {helper.general.getInitials(
              currentUser?.user?.first_name,
              currentUser?.user?.last_name
            )}
          </div>

          {/* User Info */}
          <div className="flex flex-wrap overflow-hidden">
            <Typography variant="caption" className="!text-black truncate">
              {currentUser?.user?.first_name} {currentUser?.user?.last_name}
            </Typography>
            <Typography variant="caption" className="!text-black truncate">
              {currentUser?.user?.email}
            </Typography>
          </div>
        </li>
        <li className="pt-3">
          <Link
            href={isSuperAdmin ? "/admin/userManagement" : "/userManagement"}
            className="flex items-center gap-2"
            aria-label="User Management"
          >
            <Image src="/icons/people-icon.svg" width={18} height={18} />
            <Typography variant="caption" className="!text-black">
              User Management
            </Typography>
          </Link>
        </li>
        {!isSuperAdmin && (
          <li className="pt-3">
            <Link
              href="/subscriptions"
              className="flex items-center gap-2"
              aria-label="Subscriptions"
            >
              <IconCrown />
              <Typography variant="caption" className="!text-black">
                Subscriptions
              </Typography>
            </Link>
          </li>
        )}
        <li className="pt-3">
          <Link
            href="/logout"
            className="flex items-center gap-2"
            aria-label="Logout"
          >
            <Image src="/icons/logout-icon.svg" width={18} height={18} />
            <Typography variant="caption" className="!text-black">
              Logout
            </Typography>
          </Link>
        </li>
      </ul>
    </div>
  );
});

export default UserSettingsMenu;
