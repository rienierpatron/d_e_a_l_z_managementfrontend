// AddUserPopup.js
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@/components/Common/Typography";
import FormInput from "@/components/Common/FormInput";
import Button from "@/components/Common/Button";
import Dialog from "@/components/Common/Dialog";

export default function AddUserPopup({ isPopupOpen, togglePopup, onSubmit }) {
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [email, setEmail] = useState(""); // State for email input

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email }); // Pass the data back to parent component
    togglePopup(); // Close the popup after submission
  };

  return (
    <Dialog
      show={isPopupOpen}
      onClose={togglePopup}
      header={
      <>
        <Typography variant="title">Add New User</Typography>
        <Typography variant="body" className="!text-dark-gray mt-[10px]">
          Add a colleague to the Chaaat platform in one simple step
        </Typography>
      </>
      }
      headerClassName="text-xl font-semibold mb-4"
      footer={
        <div className="flex flex-1 justify-between gap-4 mt-4">
          <Button
            onClick={togglePopup} // Close the popup
            icon="/icons/cross-icon.svg"
            iconPosition="left"
            variant="primary"
            outlined
            fullWidth  
            isRound
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            icon="/icons/add-w-icon.svg"
            iconPosition="left"
            fullWidth  
            isRound
          >
            Invite
          </Button> 
          
        </div>
      }
      footerClassName="border-t border-gray-200"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name Field */}
        <div>
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon="/icons/user-icon.svg"
            fullWidth
            rounded
          />
        </div>
        

        {/* Last Name Field */}
        <div>
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            icon="/icons/user-icon.svg"
            fullWidth
            rounded
          />
        </div>

        {/* Email Field */}
        <div>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="/icons/email-icon.svg"
            fullWidth
            rounded
          />
        </div>
      </form>
    </Dialog>
  );
}