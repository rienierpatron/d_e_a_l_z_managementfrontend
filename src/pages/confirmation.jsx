import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Common/Typography";

export default function Confiramtion() {
  return (
    <div className="w-full">
      <div className="flex h-screen">
        {/* Left Box */}
        <div className="flex-1 hidden md:flex items-center justify-center text-white relative">
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
            src="/images/onboarding/mail_confirmation.svg"
            alt="Mail Confirmation Illustration"
            width={667}
            height={570}
            className="rounded-lg"
          />
        </div>

        {/* Right Box */}
        <div
          className="flex-1 flex items-center justify-center text-white bg-background-blue"
        >
          <div className="w-full max-w-md p-6">
            <Typography variant="title" className="mb-[8px]">
              Please check your email
            </Typography>

            <Typography variant="body" className="!text-dark-gray mb-[32px] text-left">
              We just emailed a confirmation link. Click the link and you will be signed in.
            </Typography>

            <Typography variant="caption" className="text-left">
              Not your email?{" "}
              <Link href="/login" className="text-secondary underline uppercase">
                Try again
              </Link>
            </Typography>

            <Typography variant="caption" className="mt-[24px] text-left">
              Didn't receive an email? Wait a few more seconds or{" "}
              <Link href="mailto:support@dealz.asia" className="text-secondary underline uppercase">
                Contact Us
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};