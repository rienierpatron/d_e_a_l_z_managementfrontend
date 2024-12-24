import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";

export default function Confiramtion() {
  return (
    <div className="w-full">
      <div className="flex h-screen">
        {/* Left Box */}
        <div className="flex-1 flex items-center justify-center text-white relative">
          {/* Logo at the top-left corner */}
          <div className="absolute top-6 left-2">
            <Image
              src="/DEALZ_logo.svg"
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
          className="flex-1 flex items-center justify-center text-white"
          style={{ background: "#F4F6FC" }}
        >
          <div className="w-full max-w-md p-6 text-center">
            <Typography variant="title" className="text-gray-700 mb-[8px]">
              Please check your email
            </Typography>

            <Typography variant="body" className="text-gray-700 mb-[32px] text-left">
              We just emailed a confirmation link. Click the link and you will be signed in.
            </Typography>

            <Typography variant="caption" className="text-gray-700 text-left">
              Not your email?{" "}
              <Link href="/login" className="text-blue-600 hover:underline uppercase">
                Try again
              </Link>
            </Typography>

            <Typography variant="caption" className="text-gray-700 pt-[24px] text-left">
              Didn't receive an email? Wait a few more seconds or{" "}
              <Link href="mailto:support@dealz.asia" className="text-blue-600 hover:underline uppercase">
                Contact Us
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};