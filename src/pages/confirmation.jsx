import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Confiramtion() {
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
            <h1 className="text-3xl text-black font-bold mb-4">
              Please check your email
            </h1>
            <p className="text-gray-600 mb-6">
              We just emailed a confirmation link. Click the link and you will
              be signed in.
            </p>
            <p className="text-gray-600 mb-6">
              Not your email?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Try again
              </Link>
            </p>
            <p className="text-gray-600">
              Didn't receive an email? Wait a few more seconds or{" "}
              <Link
                href="mailto:support@dealz.asia"
                className="text-blue-600 hover:underline"
              >
                Contact Us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};