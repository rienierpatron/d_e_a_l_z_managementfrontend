// pages/userManagement.jsx
import { useState } from "react";
import CommonUserManagement from "@/components/UserManagement";
import { inviteAgencyUser } from "@/api/user";
import { helper } from "@/helpers";

const AdminUserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // This function will handle the new user submission
  const handleNewUserSubmit = async (userData) => {
    const data = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      role: "superadmin"
    };

    await inviteUser(data);
  };

  // This function will call the invite API
  const inviteUser = async (data) => {
    try {
      const response = await inviteAgencyUser(data);
      if (response && helper.cmpStr(response.status, "ok")) {
        helper.general.alert("success", { message: "User invited successfully!" });
        setIsPopupOpen(false);
      } else {
        helper.general.alert("error", { message: "Failed to invite user." });
      }
    } catch (error) {
      helper.general.alert("error", { message: "Error inviting user." });
    }
  };

  return (
    <div>
      <CommonUserManagement
        handleNewUserSubmit={handleNewUserSubmit}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </div>
  );
};

export default AdminUserManagement;