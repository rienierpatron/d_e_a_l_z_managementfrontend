import '../styles/index.css'; // Tailwind CSS
import LoggedInLayout from '../layouts/LoggedInLayout';
import LoggedOutLayout from '../layouts/LoggedOutLayout';
// import { isAuthenticated } from '../utils/auth'; // Mock auth helper

function DealzManagement({ Component, pageProps }) {
  // const loggedIn = isAuthenticated(); // Replace with real auth logic
  const loggedIn = true;

  const Layout = loggedIn ? LoggedInLayout : LoggedOutLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default DealzManagement;