import React from "react";
import Image from "next/image";

export default function EmailConfirmationPopup({ isPopupOpen, togglePopup }) {
  return (
    isPopupOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="bg-white px-6 pt-10 pb-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex items-center justify-center">
            <Image
              src="/icons/email-verification-icon.svg"
              alt="Mail Confirmation Illustration"
              width={88}
              height={88}
              className="rounded-lg"
            />
          </div>
          <p className="text-gray-600 mb-6 text-center py-2">We have sent you a mail, on your email davidjohnson123@gmail.com</p>
          <button
            className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}