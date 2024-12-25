import React from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Link from "next/link";
import FormLabel from "@/components/FormLabel";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log("Submitted email:", email);
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

            <Button
              onClick={() => {
                console.log("Google Sign-Up clicked");
              }}
              icon="/icons/google-icon.svg" // Path to your Google logo icon
              iconPosition="left" // Icon on the left of the text
              className="border-0 focus:outline-none text-midnight-blue"
              fullWidth
              isRound
            >
              Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
