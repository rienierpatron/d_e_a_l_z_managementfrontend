/**
 * External dependencies
 */
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Internal dependencies
 */
import "../styles/index.css"; // Tailwind CSS
import LoggedInLayout from "../layouts/LoggedInLayout";
import LoggedOutLayout from "../layouts/LoggedOutLayout";
import DocumentHead from "@/components/Common/DocumentHead";
import HttpInterceptors from "@/layouts/HttpInterceptors";
import { helper } from "@/helpers";
import { UserProvider } from "@/context/UserContext";
import Favicon from "@/components/Common/Favicon";
import { PUBLIC_ROUTES } from "@/lib/routes";

function DealzManagement({ Component, pageProps }) {
  // State to manage logged-in status
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuthentication = async () => {
    try {
      const isAuthenticated = helper.auth.isAuthenticated();
      setLoggedIn(isAuthenticated)
      // Wait for the Promise to resolve
      if (!isAuthenticated && !PUBLIC_ROUTES.includes(router.pathname)) {
        router.replace("/login")
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  },[router.pathname]);

  // Determine which layout to use based on authentication status
  const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

  return (
    <UserProvider>
      <Favicon />
      <Layout>
        <DocumentHead />
        <HttpInterceptors />
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default DealzManagement;
