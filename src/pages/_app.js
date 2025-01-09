/**
 * External dependencies
 */
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

/**
 * Internal dependencies
 */
import '../styles/index.css'; // Tailwind CSS
import LoggedInLayout from '../layouts/LoggedInLayout';
import LoggedOutLayout from '../layouts/LoggedOutLayout';
import DocumentHead from '@/components/Common/DocumentHead';
// import { isAuthenticated } from '../utils/auth'; // Mock auth helper
import HttpInterceptors from '@/layouts/HttpInterceptors';


function DealzManagement({ Component, pageProps }) {
  // const loggedIn = isAuthenticated(); // Replace with real auth logic
  const loggedIn = false;
  const router = useRouter();

  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/confirmation';
  
  const Layout = loggedIn || isAuthPage ? LoggedOutLayout : LoggedInLayout;

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