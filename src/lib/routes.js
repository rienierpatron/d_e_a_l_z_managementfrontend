/**
 * Internal dependencies
 */
import IconAdd from "@/components/Icons/IconAdd";
import IconCalendar from "@/components/Icons/IconCalendar";
import IconCategory from "@/components/Icons/IconCategory";
import IconChaaatLogo from "@/components/Icons/IconChaaatLogo";
import IconProfileTwoUser from "@/components/Icons/IconProfileTwoUser";

export const NAV_ITEMS = [
  {
    icon: <IconCategory width={24} height={24} />,
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <IconAdd width={24} height={24} />,
    path: "/dealz/create",
    label: "Create DEALZ",
  },
  {
    icon: <IconCalendar width={24} height={24} />,
    path: "/calendar",
    label: "Calendar",
  },
  // {
  //   icon: <IconProfileTwoUser width={24} height={24} />,
  //   path: "/dashboard",
  //   label: "Referral",
  // },
  {
    icon: <IconChaaatLogo />,
    path: "/dashboard",
    label: "Retarget",
  },
];

export const ROUTES_HEADING_MAPPER = {
  "/login": "Login",
  "/signup": "Sign Up",
  "/dashboard": "Dashboard",
  "/dealz/create": "Create DEALZ",
  "/calendar": "Calendar",
  "/subscriptions": "Subscriptions",
  "/admin/dashboard": "Dashboard",
  "/admin/calendar": "Calendar",
  "/admin/userManagement": "User Management",
  "/admin/dealz/edit": "DEALZ Details",
};
