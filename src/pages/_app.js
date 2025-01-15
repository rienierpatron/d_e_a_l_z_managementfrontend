/**
 * External dependencies
 */
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import '../styles/index.css'; // Tailwind CSS
import LoggedInLayout from '../layouts/LoggedInLayout';
import LoggedOutLayout from '../layouts/LoggedOutLayout';
import DocumentHead from '@/components/Common/DocumentHead';
import HttpInterceptors from '@/layouts/HttpInterceptors';
import { helper } from '@/helpers';

function DealzManagement({ Component, pageProps }) {
  // State to manage logged-in status
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is authenticated on mount and redirect if not
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await helper.auth.isAuthenticated();
      if (!isAuthenticated && router.pathname !== '/login' && router.pathname !== '/signup') {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        if (isAuthenticated && (router.pathname === '/login' || router.pathname === '/signup')) {
          helper.cookie.deleteAccessToken();
          setLoggedIn(false);
        } else {
          setLoggedIn(isAuthenticated);
        }
      }
    };
    checkAuth();
  }, [router.pathname]);

  // Determine which layout to use based on authentication status
  const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

  return (
    <Layout>
      <DocumentHead />
      <HttpInterceptors />
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default DealzManagement;