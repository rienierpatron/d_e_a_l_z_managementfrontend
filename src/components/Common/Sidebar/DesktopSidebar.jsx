import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "@/components/Subscriptions/GetSubscriptionDetails";
import { useUser } from "@/context/UserContext";
import { helper } from "@/helpers";
import SidbarUpgradeCta from "@/components/SidbarUpgradeCta";
import IconMessageQuestion from "@/components/Icons/IconMessageQuestion";
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/lib/routes";
import UserSettingsMenu from "./UserSettingsMenu";
import SwitchAgencyMenu from "./SwitchAgencyMenu";
import IconWideArrowRight from "@/components/Icons/IconWideArrowRight";
import Typography from "../Typography";
import { SUBSCRIPTIONS } from "@/lib/constants";

const DesktopSidebar = () => {
  const currentUser = useUser();
  const isSuperAdmin = currentUser?.user?.is_super_admin;
  const isStaff = currentUser?.user?.is_staff;
  const isSuperAdminOrStaff = currentUser?.user?.is_super_or_staff;
  const { currentSubscription } = useSubscription();
  const router = useRouter();
  const navRef = useRef(null);
  const userPopupRef = useRef(null);
  const switchAgencyRef = useRef(null);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isSwitchAgencyPopupOpen, setIsSwitchAgencyPopupOpen] = useState(false);

  // Adjust the sidebar height dynamically based on hotbar presence
  useEffect(() => {
    if (typeof window !== "undefined" && navRef?.current) {
      const hotbarEle = document.getElementById("dealz-hotbar");
      navRef.current.style.height = hotbarEle ? "calc(100vh - 60px)" : "100%";
    }
  }, [router.pathname]);

  // Close the UserSettingsMenu when clicking outside
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event) => {
        if (
          userPopupRef.current &&
          !userPopupRef.current.contains(event.target)
        ) {
          setIsUserPopupOpen(false);
        }
        if (
          switchAgencyRef.current &&
          !switchAgencyRef.current.contains(event.target)
        ) {
          setIsSwitchAgencyPopupOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const openUserPopup = () => {
    setIsUserPopupOpen((prevState) => !prevState);
  };

  const openSwitchAgencyPopup = () => {
    setIsSwitchAgencyPopupOpen((prevState) => !prevState);
  };

  // Helper to map over NAV_ITEMS or ADMIN_NAV_ITEMS based on user role
  const getNavItems = () =>
    isSuperAdmin || isStaff ? ADMIN_NAV_ITEMS : NAV_ITEMS;

  return (
    <nav
      id="dealz-sidebar"
      className="w-[115px] bg-white border border-l-0 border-t-0 border-b-0 border-light-gray fixed px-3 py-6 flex flex-col justify-between z-10"
      ref={navRef}
    >
      <div className="flex flex-col gap-12 justify-center items-center">
        <div
          className="text-center cursor-pointer flex flex-col items-center"
          onClick={isSuperAdminOrStaff ? openSwitchAgencyPopup : undefined}
        >
          {isSuperAdmin || isStaff ? (
            <Image
              src="/dealz-logo.svg"
              width={67}
              height={26}
              alt="Dealz Logo"
            />
          ) : currentUser?.user?.agency_logo ? (
            <Image
              src={currentUser?.user?.agency_logo}
              width={50}
              height={50}
              alt="Agency Logo"
              className="mb-2"
            />
          ) : (
            <div className="p-1 mb-2 bg-black text-white w-6 h-6 flex items-center justify-center rounded">
              {currentUser?.user?.agency_name
                ? currentUser?.user?.agency_name[0]
                : ""}
            </div>
          )}
          <div className="flex items-center justify-center">
            <Typography variant="caption" className="!text-xs">
              {currentUser?.user?.agency_name}
            </Typography>
            {isSuperAdminOrStaff && <IconWideArrowRight />}
          </div>
        </div>

        {isSwitchAgencyPopupOpen && (
          <SwitchAgencyMenu
            isSuperAdminOrStaff={isSuperAdminOrStaff}
            ref={switchAgencyRef}
          />
        )}

        <ul className="flex flex-col gap-8">
          {getNavItems().map((item, index) => (
            <li
              className={classNames(
                "cursor-pointer text-dark-gray hover:text-primary",
                {
                  "text-primary": router.pathname === item.path,
                }
              )}
              key={index}
            >
              <Link
                href={item.path}
                className="flex items-center justify-center gap-2 flex-col"
                aria-label={item.label}
                target={item?.target ?? "_self"}
              >
                {item.icon}
                <span className="text-xs font-medium text-center">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
          {/* Display SidbarUpgradeCta only for non-superadmin or staff users with specific subscription */}
          {!isSuperAdmin &&
            !isStaff &&
            currentSubscription?.subscription?.subscription_name?.toLowerCase() !==
              SUBSCRIPTIONS.SUBSCRIPTION_TYPES.Pro && <SidbarUpgradeCta />}
        </ul>
      </div>

      <ul className="flex flex-col gap-8 justify-center items-center">
        <li
          className="cursor-pointer"
          onClick={() => {
            window.location.href = "mailto:support@dealz.asia";
          }}
        >
          <div className="flex items-center justify-center" aria-label="Help">
            <IconMessageQuestion className="hover:text-primary" />
          </div>
        </li>

        <li className="cursor-pointer">
          <div
            className="rounded-full h-12 w-12 flex items-center justify-center"
            onClick={openUserPopup}
            aria-label="User Settings"
            title="Click to open user settings"
          >
            {/* Conditionally render profile image or initials */}
            {currentUser?.user?.profile_picture_url ? (
              <Image
                src={currentUser.user.profile_picture_url}
                width={40}
                height={40}
                alt="User Profile"
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-sm bg-primary text-white">
                {helper.general.getInitials(
                  currentUser?.user?.first_name,
                  currentUser?.user?.last_name
                )}
              </div>
            )}
          </div>
        </li>
      </ul>
      {/* Popup Menu */}
      {isUserPopupOpen && <UserSettingsMenu ref={userPopupRef} />}
    </nav>
  );
};

export default DesktopSidebar;
