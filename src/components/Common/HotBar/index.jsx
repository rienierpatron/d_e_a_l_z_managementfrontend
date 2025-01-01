/**
 * External dependencies
 */
import { useRouter } from "next/router";

/**
 * Internal dependencies
 */
import ComingSoon from "@/components/Common/HotBar/ComingSoon";

const HotBar = () => {
  const router = useRouter();

  // Logic to determine content based on the current route
  const renderContent = () => {
    switch (router.pathname) {
      case "/subscriptions":
        return <ComingSoon />;
      default:
        return null;
    }
  };

  const hotbarConent = renderContent();

  if (hotbarConent === null) {
    return null;
  }

  return <div className="sticky top-0 z-20 w-full">{hotbarConent}</div>;
};

export default HotBar;
