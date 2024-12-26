import '../styles/index.css'; // Tailwind CSS
import LoggedInLayout from '../layouts/LoggedInLayout';
import LoggedOutLayout from '../layouts/LoggedOutLayout';
import DocumentHead from '@/components/Common/DocumentHead';
// import { isAuthenticated } from '../utils/auth'; // Mock auth helper

function DealzManagement({ Component, pageProps }) {
  // const loggedIn = isAuthenticated(); // Replace with real auth logic
  const loggedIn = true;

  const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

  return (
    <Layout>
      <DocumentHead />
      <Component {...pageProps} />
    </Layout>
  );
}

export default DealzManagement;