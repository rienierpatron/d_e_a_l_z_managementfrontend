// pages/userManagement.jsx
import { useState } from "react";
import CommonUserManagement from "@/components/UserManagement";
import { inviteAgencyUser } from "@/api/user";
import { helper } from "@/helpers";

const AdminUserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  // This function will handle the new user submission
  const handleNewUserSubmit = async (userData) => {
    const data = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.userRole.value,
      email: userData.email,
    };

    await inviteUser(data);
  };

  // This function will call the invite API
  const inviteUser = async (data) => {
    try {
      setIsLoading(true)
      const response = await inviteAgencyUser(data);
      if (response && helper.cmpStr(response.status, "ok")) {
        setIsPopupOpen(false);
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      helper.general.alert("error", { message: "Error inviting user." });
      setIsLoading(false)
    }
  };

  return (
    <div>
      <CommonUserManagement
        handleNewUserSubmit={handleNewUserSubmit}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminUserManagement;