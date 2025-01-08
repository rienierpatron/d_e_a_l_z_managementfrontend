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
import EmailConfirmationPopup from "@/popups/EmailConfirmationPopup";

export default function Login() {
  const [userData, setUserData] = useState({
      email: "",
    });
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    // Get CSRF TOKEN
    (async () => {
      await api.auth.getCsrfToken();
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = userData;

    // Check if any field is empty
    if (!email) {
      console.log("Please fill in all fields."); 
      return;
    }
    
    console.log("Submitted email:", email);

    const auth_type = 'email'
    const data = { email: email };

    try {
      const response = await api.auth.loginEmail(data, auth_type);
      if (response && helper.cmpStr(response.status, 'ok')) {
        window.location.href = '/confirmation'
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

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
              <FormLabel htmlFor="email" className="uppercase">
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
                className="text-secondary underline uppercase"
              >
                Sign Up
              </Link>
            </Typography>
            <Typography
              variant="caption"
              className="py-10 text-center uppercase"
            >
              Or Log In using
            </Typography>

            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              <CustomGoogleLogin />
            </GoogleOAuthProvider>
          </form>
        </div>
      </div>
    </div>
  );
}
