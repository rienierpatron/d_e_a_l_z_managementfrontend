import React from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log("Submitted email:", email);
  };

  return (
    <div className="w-full">
      <div className="flex h-screen">
        {/* Left Box */}
        <div className="flex-1 flex items-center justify-center text-white relative">
          {/* Logo at the top-left corner */}
          <div className="absolute top-6 left-2">
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
        <div
          className="flex-1 flex items-center justify-center text-white"
          style={{ background: "#F4F6FC" }}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 rounded-lg"
          >
            <Typography variant="title" className="text-gray-700 mb-[8px]">
              Login
            </Typography>
            <Typography variant="body" className="text-gray-700 mb-[32px]">
              Enter details you used during your registration
            </Typography>
            {/* Email */}
            <div className="mb-[40px]">
              <label htmlFor="email">
                <Typography variant="caption" className="text-gray-700 uppercase mb-[12px]">
                Email
                </Typography>
              </label>
              <FormInput
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
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
              Log In
            </Button>

            <Typography variant="caption" className="text-gray-700 pt-4 text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline uppercase">
                Sign Up
              </Link>
            </Typography>

            <Typography variant="caption" className="text-gray-700 py-10 text-center uppercase">
              Or Log In using
            </Typography>

            <div className="">
              <Button
                onClick={() => {
                  console.log("Google Sign-Up clicked");
                }}
                icon="/icons/google-icon.svg"  // Path to your Google logo icon
                iconPosition="left"  // Icon on the left of the text
                className="border-0 focus:outline-none text-gray-600"
                fullWidth  
                isRound
              >
                Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};