import React, { useState, useEffect } from "react";
import { helper } from "@/helpers";
import CommonTable from "@/components/Common/CommonTable";
import Image from "next/image";
import AddUserPopup from "@/popups/AddUserPopup";
import UserManagementStatusRenderer from "@/components/UserManagementStatusRenderer";
import { getAllAgencyUsers, inviteAgencyUser, inviteSelectedPendingAgencyUser } from "@/api/user";

export default function UserManagement() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // Toggle popup state
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle form submission for new user
  const handleNewUserSubmit = (userData) => {
    const data = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email
    }
    inviteUser(data);
  };

  // Fetch agency users list
  const getAgencyUserList = async () => {
    try {
      const showMessage = false;
      const response = await getAllAgencyUsers(showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        const agencyUsers = response.data.agency_users.map(userItem => ({
          ...userItem,
          name: userItem.user.first_name,
          user_type: userItem.user_roles[0]?.role_name || "N/A",
          email: userItem.user.email,
        }));
        setAllUsers(agencyUsers);
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  // Invite User
  const inviteUser = async (data) => {
    const response = await inviteAgencyUser(data);
    if (response && helper.cmpStr(response.status, "ok")) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const resendActivationEmail = async () => {
    if (selectedUsers.length === 0) {
      return helper.general.alert("warning", { message: "No users selected." });
    }
    else {
      try {
        const response = await inviteSelectedPendingAgencyUser({ agency_user_ids: selectedUsers });
        if (response && helper.cmpStr(response.status, "ok")) {
          helper.general.alert("success", { message: "Activation emails sent successfully!" });
        } else {
          helper.general.alert("error", { message: "Failed to resend activation emails." });
        }
      } catch (error) {
        helper.general.alert("error", { message: "Error sending activation emails." });
      }
    }
  }

  // Fetch users when component mounts
  useEffect(() => {
    getAgencyUserList();
  }, []);

  const handleCheckboxChange = (email, isChecked) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (isChecked) {
        // Add the agency user id if checked
        return [...prevSelectedUsers, email];
      } else {
        // Remove the agency user id if unchecked
        return prevSelectedUsers.filter((e) => e !== email);
      }
    });
  };

  const data = React.useMemo(() => allUsers );


  // Data memoization
  const columns = React.useMemo(() => [
    {
      header: "",
      accessorKey: "Checkbox",
      headerSorting: false,
      headerWidth: "40px",
      Cell: ({ row: { original } }) => (
        <div style={{ display: original.status === "pending" ? "inline-block" : "none" }}>
          <input
            type="checkbox"
            checked={selectedUsers.includes(original.agency_user_id)}
            onChange={(e) => handleCheckboxChange(original.agency_user_id, e.target.checked)}
          />        
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "User Type",
      accessorKey: "user_type",
      headerSorting: false,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Last seen",
      accessorKey: "last_seen",
    },
    {
      header: "Status",
      accessorKey: "status",
      Cell: ({ row: { original } }) => <UserManagementStatusRenderer status={original.status} />,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      headerSorting: false,
      Cell: ({ row: { original } }) => (
        <button onClick={() => handleDeleteUser(row.original.email)} className="text-red-600 hover:text-red-800">
          <Image src="/icons/trash-icon.svg" width={20} height={20} />
        </button>
      ),
    },
  ], [selectedUsers]);

  // Placeholder for deleting user (example)
  const handleDeleteUser = (email) => {
    console.log(`Deleting user with email: ${email}`);
  };

  return (
    <div className="w-full p-5 h-full">
      <div>
        <div className="p-5 border border-b-0 rounded-t-xl flex flex-1 justify-between items-center">
          <h2 className="text-3xl">{loading ? "Loading..." : `${allUsers?.length || 0} Licensed Users`}</h2>
          <div>
            <button
              onClick={togglePopup}
              className="px-4 py-2 mr-4 bg-white text-pink-600 text-sm font-medium rounded-3xl border border-pink-600 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <Image src="/icons/add-icon.svg" alt="Add New User" width={16} height={16} className="inline-block mr-1" />
              Add New User
            </button>
            <button
              onClick={resendActivationEmail}
              className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-3xl shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <Image
                src="/icons/envelope-icon.svg"
                alt="Resend Activation Email"
                width={16}
                height={16}
                className="inline-block mr-2"
              />
              Resend Activation Email
            </button>
          </div>
        </div>

        {/* Conditional rendering: Show loading or error state */}
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <CommonTable
            columns={columns}
            data={data}
            pageSize={5}
            paginationRequired={true}
            onPageChange={(currentPage) => {}}
            onPageSizeChange={(pageSize) => {}}
            onSortChange={(orderBy, order) => {}}
            sortingServerSide={false}
          />
        )}
      </div>

      {/* Pass props to AddUserPopup */}
      <AddUserPopup
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
        onSubmit={handleNewUserSubmit}
      />
    </div>
  );
}
