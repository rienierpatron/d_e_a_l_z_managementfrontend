import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/api';
import { helper } from '@/helpers';

const Verify = () => {
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
      // Making the API call
      const response = await api.auth.verifyLoginEmail(data, false);

      if (response && helper.cmpStr(response.status, 'ok')) {
        setMessage('Verification successful! Redirecting to dashboard...');
        const accessToken = response.data.access_token;
        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);
        }
        window.location.href = "/dashboard"
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

export default Verify;