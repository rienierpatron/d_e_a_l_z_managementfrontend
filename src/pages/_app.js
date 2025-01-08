import '../styles/index.css'; // Tailwind CSS
import LoggedInLayout from '../layouts/LoggedInLayout';
import LoggedOutLayout from '../layouts/LoggedOutLayout';
import DocumentHead from '@/components/Common/DocumentHead';
// import { isAuthenticated } from '../utils/auth'; // Mock auth helper
import { useRouter } from 'next/router';

function DealzManagement({ Component, pageProps }) {
  // const loggedIn = isAuthenticated(); // Replace with real auth logic
  const loggedIn = false;
  const router = useRouter();

  const isAuthPage = router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/confirmation';
  
  const Layout = loggedIn || isAuthPage ? LoggedOutLayout : LoggedInLayout;

  return (
    <Layout>
      <DocumentHead />
      <Component {...pageProps} />
    </Layout>
  );
}

export default DealzManagement;