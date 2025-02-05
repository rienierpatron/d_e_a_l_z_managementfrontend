/**
 * External dependencies
 */
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import { useUser } from "@/context/UserContext";
import { USER } from "@/lib/constants";
import Button from "@/components/Common/Button";
import Typography from "@/components/Common/Typography";
import { ROUTES_HEADING_MAPPER } from "@/lib/routes";
import IconStar from "@/components/Icons/IconStar";
import ManagePreference from "@/components/ManagePreference";
import { useSubscription } from "@/components/Subscriptions/GetSubscriptionDetails";

const Header = () => {
  const currentUser = useUser();
  const isSuperAdminorStaffUserRole =
  currentUser?.user?.user_role?.role_name === USER.ROLES.SUPERADMIN ||
  currentUser?.user?.user_role?.role_name === USER.ROLES.STAFF;

  const router = useRouter();
  const { pathname } = router;
  const { currentSubscription } = useSubscription();

  return (
    <header className="bg-background-blue py-6 px-10 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Typography variant="title">
          {ROUTES_HEADING_MAPPER[pathname]}
        </Typography>
        {currentSubscription?.subscription?.subscription_name && (
          <Button
            className="border-none uppercase bg-gradient-primary text-base font-bold text-white shadow-custom-purple"
            isRound
            icon={<IconStar />}
          >
            {currentSubscription.subscription.subscription_name}
          </Button>
        )}
      </div>
      <div className="flex gap-4 items-center">
      {!isSuperAdminorStaffUserRole && <ManagePreference /> }
        {/* <Button
          className="border-none relative shadow-custom-black !p-[14px]"
          isRound
          icon="/icons/notification-black.svg"
        >
          <span className="absolute right-0 top-0 text-[10px] font-semibold bg-primary text-white rounded-[32px] py-[2px] px-[5px]">
            13
          </span>
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
