import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/api';
import { helper } from '@/helpers';

export default function Logout() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // setLoading(true);
      await api.auth.logout(false);
      helper.cookie.deleteAccessToken();
      // setLoading(false);
      window.location.href = "/login";
    })();
  });

  return (
    <div>
      <h1>Signing out ...</h1>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};