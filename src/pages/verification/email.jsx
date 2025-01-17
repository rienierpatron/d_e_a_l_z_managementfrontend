// pages/login.jsx

import EmailVerification from '@/components/Common/Verification';

const Verify = () => {
  return (
    <div>
      <EmailVerification
        verifyApiMethod="verifyUserEmail"
        successMessage="Verification successful! Redirecting to dashboard..."
      />
    </div>
  );
};

export default Verify;