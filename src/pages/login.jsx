import React from "react";
import Image from "next/image";

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
            <h1 className="text-3xl text-black font-bold mb-2">Login</h1>
            <p className="text-gray-600 mb-6">
              Enter details you used during your registration
            </p>
            <div className="mb-4 mt-4">
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
                placeholder="Enter your email"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-pink-500 text-white font-semibold rounded-3xl hover:bg-blue-700"
            >
              Log In
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>

            <p className="text-gray-600 text-center py-12">Or Log In using</p>

            <div className="mt-6">
              <button
                type="button"
                className="w-full py-3 bg-white text-black rounded-3xl hover:bg-gray-100 flex items-center justify-center"
              >
                <Image
                  src="/icons/google-icon.svg"
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
    </div>
  );
};