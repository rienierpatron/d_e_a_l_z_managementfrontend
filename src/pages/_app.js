// /**
//  * External dependencies
//  */
// import { ToastContainer } from "react-toastify";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// /**
//  * Internal dependencies
//  */
// import "../styles/index.css"; // Tailwind CSS
// import LoggedInLayout from "../layouts/LoggedInLayout";
// import LoggedOutLayout from "../layouts/LoggedOutLayout";
// import DocumentHead from "@/components/Common/DocumentHead";
// import HttpInterceptors from "@/layouts/HttpInterceptors";
// import { helper } from "@/helpers";
// import { UserProvider } from "@/context/UserContext";

// function DealzManagement({ Component, pageProps }) {
//   // State to manage logged-in status
//   const [loggedIn, setLoggedIn] = useState(false);
//   const router = useRouter();

//   // Check if the user is authenticated on mount and redirect if not
//   useEffect(() => {
//     const checkAuth = async () => {
//       const isAuthenticated = helper.auth.isAuthenticated();
//       if (
//         !isAuthenticated &&
//         router.pathname !== "/login" &&
//         router.pathname !== "/signup" &&
//         router.pathname !== "/confirmation"
//       ) {
//         router.push("/login"); // Redirect to login if not authenticated
//       } else {
//         if (
//           isAuthenticated &&
//           (router.pathname === "/login" || router.pathname === "/signup" || router.pathname === "/confirmation")
//         ) {
//           helper.cookie.deleteAccessToken();
//           setLoggedIn(false);
//         } else {
//           setLoggedIn(true);
//         }
//       }
//     };
//     checkAuth();
//   }, [router.pathname]);

//   // Determine which layout to use based on authentication status
//   const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

//   return (
//     <UserProvider>
//       <Layout>
//         <DocumentHead />
//         <HttpInterceptors />
//         <ToastContainer />
//         <Component {...pageProps} />
//       </Layout>
//     </UserProvider>
//   );
// }

// export default DealzManagement;


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

function DealzManagement({ Component, pageProps }) {
  // State to manage logged-in status
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const checkAuthentication = async () => {
    try {
      // Wait for the Promise to resolve
      const isAuthenticated = await helper.auth.isAuthenticated();
      setLoggedIn(isAuthenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  });

  // Determine which layout to use based on authentication status
  const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

  return (
    <UserProvider>
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
