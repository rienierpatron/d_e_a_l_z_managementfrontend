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
      helper.cookie.deleteAccessToken
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


// import React, { useState, useEffect } from 'react';
// import { Header, Body, Footer } from '../components/Layouts/Layout';
// import { h } from '../helpers';
// import { api } from '../api';
// import { routes } from '../configs/routes';

// export default function Logout() {
//   const [isLoading, setLoading] = useState();

  

//   return (
//     <div>
//       <Header showHeaderContent={false} />
//       <Body isLoading={isLoading}>
//         <h1>Signing out ...</h1>
//       </Body>
//       <Footer />
//     </div>
//   );
// }
