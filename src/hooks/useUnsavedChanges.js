import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useUnsavedChanges = (isDirty) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);
  const [allowNavigation, setAllowNavigation] = useState(false);

  useEffect(() => {
    const handleWindowClose = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ""; // Show native browser warning
      }
    };

    const handleRouteChange = (url) => {
      if (!allowNavigation && isDirty && url !== router.asPath) {
        setNextRoute(url);
        setShowDialog(true);
        throw "Navigation aborted."; // Stop Next.js navigation
      }
    };

    const handleBrowserNavigation = (event) => {
      if (!allowNavigation && isDirty) {
        const upcomingRoute = event?.url || router.asPath; // Capture correct next route
        setNextRoute(upcomingRoute);
        setShowDialog(true);
        window.history.pushState(null, "", router.asPath); // Prevent navigation
        return false;
      }
      return true;
    };

    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleRouteChange);
    router.beforePopState(handleBrowserNavigation);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleRouteChange);
      router.beforePopState(() => true); // Reset popState behavior
    };
  }, [isDirty, router, allowNavigation]);

  const confirmLeave = () => {
    setShowDialog(false);
    setAllowNavigation(true);

    if (nextRoute) {
      router.push(nextRoute); // Navigate after confirmation
    }
  };

  return { showDialog, setShowDialog, confirmLeave };
};

export default useUnsavedChanges;
