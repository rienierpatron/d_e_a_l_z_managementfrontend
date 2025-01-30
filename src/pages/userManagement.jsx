import React, { useEffect, useState } from "react";
import CommonUserManagement from "@/components/UserManagement";
import { inviteAgencyUser } from "@/api/user"; // Assuming this is the function to invite a user
import { helper } from "@/helpers"; // Assuming helper is used for alerts

export default function UserManagement() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // This function will handle the new user submission
  const handleNewUserSubmit = async (userData) => {
    const data = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
    };

    await inviteUser(data);
  };

  // This function will call the invite API
  const inviteUser = async (data) => {
    try {
      setIsLoading(true);
      const response = await inviteAgencyUser(data); // API call to invite user
      if (response && helper.cmpStr(response.status, "ok")) {
        setIsLoading(false);
        setIsPopupOpen(false); // Close the popup after successful invite
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      helper.general.alert("error", { message: "Error inviting user." });
      setIsLoading(false);
    }
  };

  return (
    <CommonUserManagement
      handleNewUserSubmit={handleNewUserSubmit}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      isLoading={isLoading}
    />
  );
}
