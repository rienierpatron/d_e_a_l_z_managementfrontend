import React, { useState }  from "react";
import Image from "next/image";
import Link from "next/link";
import EmailConfirmationPopup from "@/popups/EmailConfirmationPopup";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import FormSelect from "@/components/FormSelect";

export default function Signup() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: ""
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
      email: user.email
    });
  };

  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

  return (
    <div className="w-full">
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="flex-1 bg-white relative">
          {/* Logo in Top-Left Corner */}
          <div className="absolute top-6 left-2">
            <Image
              src="/DEALZ_logo.svg" // Path to the logo in the public folder
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
        <div
          className="flex-1 flex py-8 items-center justify-center"
          style={{ background: "#F4F6FC" }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md py-8 px-4 rounded-lg"
          >
            <Typography variant="title" className="text-gray-700 mb-[8px]">
              Sign Up
            </Typography>
            <Typography variant="body" className="text-gray-700 mb-[32px]">
              Sign up to stay connected!
            </Typography>

            {/* First & Last Name */}
            <div className="flex gap-4 mb-[24px]">
              <div className="flex-1">
                <label htmlFor="first-name">
                  <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                    First Name
                  </Typography>
                </label>
                <FormInput
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="First name"
                  required
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  icon="/icons/user-icon.svg"
                  fullWidth
                  rounded
                />
              </div>
              <div className="flex-1">
                <label htmlFor="last-name">
                  <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                    Last Name
                  </Typography>
                </label>
                <FormInput
                  type="text"
                  placeholder="Last name"
                  id="last-name"
                  name="last-name"
                  required
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  icon="/icons/user-icon.svg"
                  fullWidth
                  rounded
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="mb-[24px]">
              <label htmlFor="company-name">
                <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                  Company Name
                </Typography>
              </label>
              <FormInput
                type="text"
                placeholder="Company name"
                id="company-name"
                name="company-name"
                required
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                icon="/icons/company-icon.svg"
                fullWidth
                rounded
              />
            </div>

            {/* Business Type Dropdown */}
            <div className="mb-[24px]">
              <label htmlFor="business-type">
                <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                Business Name
                </Typography>
              </label>
              <select
                id="business-type"
                name="business-type"
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select Business Type
                </option>
                <option value="retail">Retail</option>
                <option value="ecommerce">E-commerce</option>
                <option value="service">Service</option>
              </select>
              <FormSelect>

              </FormSelect>
            </div>

            {/* Email */}
            <div className="mb-[40px]">
              <label htmlFor="email">
                <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                Email
                </Typography>
              </label>
              <FormInput
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                required
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                icon="/icons/email-icon.svg"
                fullWidth
                rounded
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => {
                console.log("Google Sign-Up clicked");
              }}
              // className="bg-primary text-white border-0 focus:outline-none hover:bg-pink-500"
              variant="primary"
              fullWidth  
              isRound
            >
              Sign Up
            </Button>

            {/* Already Have Account */}
            <Typography className="text-gray-700 mt-3 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 uppercase hover:underline">Log In</Link>
            </Typography>

            {/* Social Signup */}
            <Typography variant="caption" className="text-gray-700 py-10 text-center uppercase">
              Or Sign Up using
            </Typography>
            <div className="">
              <Button
                onClick={() => {
                  console.log("Google Sign-Up clicked");
                }}
                icon="/icons/google-icon.svg"  // Path to your Google logo icon
                iconPosition="left"  // Icon on the left of the text
                className="border-0 focus:outline-none"
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
      <EmailConfirmationPopup
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
        email="davidjohnson123@gmail.com"
      />
    </div>
  );
}