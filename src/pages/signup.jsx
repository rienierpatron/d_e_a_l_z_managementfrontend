import React, { useState }  from "react";
import Image from "next/image";
import Link from "next/link";
import EmailConfirmationPopup from "@/popups/EmailConfirmationPopup";

export default function Signup() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log("Submitted email:", email);
  };

  return (
    <div className="w-full">
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="flex-1 bg-white relative">
          {/* Logo in Top-Left Corner */}
          <div className="absolute top-6 left-2">
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
        <div
          className="flex-1 flex items-center justify-center"
          style={{ background: "#F4F6FC" }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 rounded-lg"
          >
            <h1 className="text-3xl font-bold text-black mb-4">Sign Up</h1>
            <p className="text-gray-600 mb-6">Sign up to stay connected</p>

            {/* First & Last Name */}
            <div className="flex gap-4">
              <div className="mb-4 flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-base font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  placeholder="Enter your first name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 flex-1">
                <label
                  htmlFor="last-name"
                  className="block text-base font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  placeholder="Enter your last name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="mb-4">
              <label
                htmlFor="company-name"
                className="block text-base font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company-name"
                name="company-name"
                required
                placeholder="Enter your company name"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Business Type Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="business-type"
                className="block text-base font-medium text-gray-700"
              >
                Business Type
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
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white font-semibold rounded-3xl hover:bg-pink-600"
            >
              Sign Up
            </button>

            {/* Already Have Account */}
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">Log In</Link>
            </p>

            {/* Social Signup */}
            <p className="text-gray-600 text-center py-6">Or Sign Up using</p>
            <div className="mt-6">
              <button
                type="button"
                className="w-full py-3 bg-white text-black rounded-3xl hover:bg-gray-100 flex items-center justify-center"
              >
                <Image
                  src="/icons/google-icon.svg" // Path to the Google icon in the public folder
                  alt="Google Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </button>
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