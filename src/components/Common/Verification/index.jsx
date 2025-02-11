import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "@/api";
import { helper } from "@/helpers";
import { useUser } from "@/context/UserContext";

const EmailVerification = ({ verifyApiMethod, successMessage }) => {
  const currentUser = useUser();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const router = useRouter();

  // Extract `code` from the URL query parameter
  const { query } = router;
  const code = query.code;

  // Trigger email verification once the `code` is available
  useEffect(() => {
    if (code) {
      verifyEmail(code);
    }
  }, [code]);

  // Handle email verification
  const verifyEmail = async (code) => {
    setLoading(true);
    const data = { code };

    try {
      // Making the API call using the provided `verifyApiMethod`
      const response = await api.auth[verifyApiMethod](data, false);

      if (response && helper.cmpStr(response.status, "ok")) {
        setMessage(successMessage);
        const accessToken = response.data.access_token;

        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);
          const userData = await api.user.getCurrentUser(accessToken, false);
          if (userData.status === "ok" && userData.data) {
            userData.data.user.is_super_or_staff
              ? router.push("/admin/dashboard")
              : router.push("/dashboard");
          }
        }
      }
    } catch (error) {
      helper.general.alert("error", {
        message: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle the loading state
  if (currentUser === null || !userLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading user data...</div>; // Show loading message while waiting for `currentUser`
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Verifying Your Email...</h1>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailVerification;
