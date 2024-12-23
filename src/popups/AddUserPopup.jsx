// AddUserPopup.js
import React, { useState } from "react";
import Image from "next/image";

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
    isPopupOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="bg-white px-6 py-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-xl font-semibold mb-2">Add New User</h3>
          <p className="text-sm text-gray-400 mb-4">
            Add a colleague to the Chaaat platform in one simple step
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Field */}
            <div>
              <label className="text-sm block text-gray-700">First Name</label>
              <div className="flex items-center gap-2 relative">
                <Image
                  src="/icons/user-icon.svg"
                  alt="Add New User"
                  width={16}
                  height={16}
                  className="w-5 h-5 absolute left-2"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div>
              <label className="text-sm block text-gray-700">Last Name</label>
              <div className="flex items-center gap-2 relative">
                <Image
                  src="/icons/user-icon.svg"
                  alt="Add New User"
                  width={16}
                  height={16}
                  className="w-5 h-5 absolute left-2"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-sm block text-gray-700">Email</label>
              <div className="flex items-center gap-2 relative">
                <Image
                  src="/icons/user-icon.svg"
                  alt="Add New User"
                  width={16}
                  height={16}
                  className="w-5 h-5 absolute left-2"
                />
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={togglePopup} // Close the popup
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}