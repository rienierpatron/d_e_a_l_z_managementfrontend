import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailConfirmationPopup from "@/popups/EmailConfirmationPopup";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FormInput from "@/components/Common/FormInput";
import Button from "@/components/Common/Button";
import Typography from "@/components/Common/Typography";
import FormSelect from "@/components/Common/FormSelect";
import FormFieldset from "@/components/Common/FormFieldset";
import FormLabel from "@/components/Common/FormLabel";

export default function Signup() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log("Submitted email:", email);
  };

  const handleGoogleSignInSuccess = (response) => {
    // Parse the response to get user information
    const { credential } = response;
    const user = JSON.parse(atob(credential.split(".")[1]));

    // Set user data to state
    setUserData({
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
    });
  };

  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  const businessTypeOptions = [
    { label: "Hotels", value: "hotels" },
    { label: "Service", value: "service" },
  ];

  return (
    <div className="w-full">
      <div className="flex h-full md:h-screen">
        {/* Left Section */}
        <div className="flex-1 bg-white relative hidden md:block">
          {/* Logo in Top-Left Corner */}
          <div className="absolute top-10 left-10">
            <Image
              src="/dealz-logo.svg" // Path to the logo in the public folder
              alt="DEALZ Logo"
              width={114}
              height={44}
              className="rounded-lg"
            />
          </div>

          {/* Centered Image */}
          <div className="flex items-center justify-center h-full">
            <Image
              src="/images/onboarding/signup.svg" // Path to the image in the public folder
              alt="Signup"
              width={667}
              height={570}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex py-8 items-center justify-center bg-background-blue">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md py-8 px-4 h-full flex flex-col justify-center overflow-auto scrollbar-hide md:block"
          >
            <Typography variant="title" className="mb-[8px] text-center md:text-left">
              Sign Up
            </Typography>
            <Typography variant="body" className="!text-dark-gray mb-[32px] text-center md:text-left">
              Sign up to stay connected!
            </Typography>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 flex-col md:flex-row">
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="first-name" className="uppercase">
                    First Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    id="first-name"
                    name="first-name"
                    placeholder="First name"
                    required
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    icon="/icons/user-icon.svg"
                    fullWidth
                    rounded
                  />
                </FormFieldset>
                <FormFieldset className="!mb-0">
                  <FormLabel htmlFor="last-name" className="uppercase">
                    Last Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Last name"
                    id="last-name"
                    name="last-name"
                    required
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    icon="/icons/user-icon.svg"
                    fullWidth
                    rounded
                  />
                </FormFieldset>
              </div>
              <FormFieldset className="!mb-0">
                <FormLabel htmlFor="company-name" className="uppercase">
                  Company Name
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="Enter your company name"
                  id="company-name"
                  name="company-name"
                  required
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  icon="/icons/company-icon.svg"
                  fullWidth
                  rounded
                />
              </FormFieldset>
              <FormFieldset className="!mb-0">
                <FormLabel htmlFor="business-type" className="uppercase">
                  Business Type
                </FormLabel>
                <FormSelect
                  id="business-type"
                  name="business-type"
                  placeHolder=" Select Business Type"
                  options={businessTypeOptions}
                  rounded
                  icon="/icons/company-icon.svg"
                />
              </FormFieldset>
              <FormFieldset className="!mb-0">
                <FormLabel htmlFor="email" className="uppercase">
                  Email
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  required
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  icon="/icons/email-icon.svg"
                  fullWidth
                  rounded
                />
              </FormFieldset>
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => {
                console.log("Google Sign-Up clicked");
              }}
              className="font-bold mt-10"
              variant="primary"
              fullWidth  
              isRound
              type="submit"
            >
              Sign Up
            </Button>

            {/* Already Have Account */}
            <Typography variant="caption" className="font-normal text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary uppercase underline">Log In</Link>
            </Typography>

            {/* Social Signup */}
            <Typography variant="caption" className="py-10 text-center uppercase">
              Or Sign Up using
            </Typography>
            <div className="">
              <Button
                onClick={() => {
                  console.log("Google Sign-Up clicked");
                }}
                icon="/icons/google-icon.svg"
                className="border-0 focus:outline-none text-midnight-blue"
                fullWidth
                isRound
              >
                Google
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup */}
      {/* <EmailConfirmationPopup
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
      /> */}
    </div>
  );
}