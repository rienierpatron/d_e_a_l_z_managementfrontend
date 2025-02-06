import React, { useEffect, useState } from "react";
import Image from "next/image";
import Typography from "@/components/Common/Typography";
import FormInput from "@/components/Common/FormInput";
import { api } from "@/api";
import { helper } from "@/helpers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CustomGoogleLogin from "@/components/GoogleSignIn";
import Button from "@/components/Common/Button";
import Link from "next/link";
import FormLabel from "@/components/Common/FormLabel";
import { useUser } from "@/context/UserContext";

export default function Login({ googleClientId }) {
  const currentUser = useUser();
  const isSuperAdminOrStaff = currentUser?.user?.is_super_or_staff;
  const [userData, setUserData] = useState({
      email: "",
    });
  const [isLoading, setIsLoading] = useState(false)
  
  const [errors, setErrors] = useState({
    email: false,
  });

  useEffect(() => {
    // Get CSRF TOKEN
    (async () => {
      await api.auth.getCsrfToken();
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = userData;
    const newErrors = { email: !userData.email || !helper.validateEmail(userData.email)};

    setErrors(newErrors);

    // Check if any field is empty
    if (!email) {
      return;
    }
    
    // console.log("Submitted email:", email);

    const auth_type = 'email'
    const data = { email: email };

    try {
      setIsLoading(true)
      const response = await api.auth.loginEmail(data, auth_type);
      if (response && helper.cmpStr(response.status, 'ok')) {
        window.location.href = '/confirmation'
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  const onGoogleSignInSuccess = async (payload) => {
    const auth_type = "google";
    
    // Send the data to the backend for authentication
      const response = await api.auth.loginEmail(payload, auth_type);
      if (response && helper.cmpStr(response.status, 'ok')) {
        const accessToken = response.data.access_token;
        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);
          window.location.href = isSuperAdminOrStaff ? '/admin/dashboard' : '/dashboard';
        }
      } else {
        return helper.general.alert("error", {
          message: "Something went wrong.",
        });
      }
  }

  return (
    <div className="w-full h-screen">
      <div className="flex h-full md:h-screen">
        {/* Left Box */}
        <div className="flex-1 items-center justify-center text-white relative hidden md:flex">
          {/* Logo at the top-left corner */}
          <div className="absolute top-10 left-10">
            <Image
              src="/dealz-logo.svg"
              alt="DEALZ Logo"
              width={114}
              height={44}
              className="rounded-lg"
            />
          </div>
          <Image
            src="/images/onboarding/login.svg"
            alt="Login Illustration"
            width={667}
            height={570}
            className="rounded-lg"
          />
        </div>

        {/* Right Box */}
        <div className="flex-1 flex items-center justify-center text-white bg-background-blue">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 rounded-lg"
          >
            <Typography
              variant="title"
              className="mb-[8px] text-center md:text-left"
            >
              Login
            </Typography>
            <Typography
              variant="body"
              className="!text-dark-gray mb-[32px] text-center md:text-left"
            >
              Enter details you used during your registration
            </Typography>
            <div className="mb-[40px]">
              <FormLabel htmlFor="email">
                Email
              </FormLabel>
              <FormInput
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
                icon="/icons/email-icon.svg"
                fullWidth
                rounded
                isError={errors.email}
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="font-bold"
              fullWidth
              isRound
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Log In
            </Button>

            <Typography
              variant="caption"
              className="font-normal pt-4 text-center"
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-secondary underline"
              >
                Sign Up
              </Link>
            </Typography>
            <Typography
              variant="caption"
              className="py-10 text-center"
            >
              Or Log In using
            </Typography>

            <GoogleOAuthProvider clientId={googleClientId}>
              <CustomGoogleLogin onLoginSuccess={onGoogleSignInSuccess} />
            </GoogleOAuthProvider>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || "", // Ensure runtime retrieval
    },
  };
}
