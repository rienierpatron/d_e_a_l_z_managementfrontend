import React from "react";
import Image from "next/image";
import Dialog from "@/components/Common/Dialog";
import Button from "@/components/Common/Button";

export default function EmailConfirmationPopup({ isPopupOpen, togglePopup, email }) {
  return (
    <Dialog
      show={isPopupOpen}
      onClose={togglePopup}
      className=""
      headerClassName="text-lg font-semibold text-center"
      footer={
        <Button
          onClick={togglePopup}
          // className="bg-primary text-white border-0 focus:outline-none hover:bg-pink-500"
          variant="primary"
          fullWidth  
          isRound
        >
          Close
        </Button>    
      }
    >
      <div className="flex flex-col items-center">
        <Image
          src="/icons/email-verification-icon.svg"
          alt="Mail Confirmation Illustration"
          width={88}
          height={88}
          className="rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-6 text-center">
          We have sent you a mail at your email address: <strong>{email}</strong>
        </p>
      </div>
    </Dialog>
  );
}