import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/api';
import { helper } from '@/helpers';
import { useUser } from '@/context/UserContext';

const EmailVerification = ({ verifyApiMethod, successMessage }) => {
  const currentUser = useUser();
  const isSuperAdminOrStaff = currentUser?.user?.is_super_or_staff;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Extract `code` from the URL query parameter
  const { query } = router;
  const code = query.code;

  useEffect(() => {
    if (code) {
      verifyEmail(code);
    }
  }, [code]);

  const verifyEmail = async (code) => {
    setLoading(true);
    const data = { code };

    try {
      // Making the API call using the provided `verifyApiMethod`
      const response = await api.auth[verifyApiMethod](data, false);
      if (response && helper.cmpStr(response.status, 'ok')) {
        setMessage(successMessage);
        const accessToken = response.data.access_token;
        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);

          // Wait until the token is set before redirecting
          setTimeout(() => {
            window.location.href = isSuperAdminOrStaff ? '/admin/dashboard' : '/dashboard';
          }, 100);
        }
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Verifying Your Email...</h1>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerification;
