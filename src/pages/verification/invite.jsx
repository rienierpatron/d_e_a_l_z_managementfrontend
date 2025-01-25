// pages/verify.jsx

import EmailVerification from '@/components/Common/Verification';

const Verify = () => {
  return (
    <div>
      <EmailVerification
        verifyApiMethod="verifyInvitedEmail"
        successMessage="Verification successful! Redirecting to dashboard..."
      />
    </div>
  );
};

export default Verify;