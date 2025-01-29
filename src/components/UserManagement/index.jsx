import React, { useState, useEffect, useCallback } from "react";
import { helper } from "@/helpers";
import CommonTable from "@/components/Common/CommonTable";
import Image from "next/image";
import AddUserPopup from "@/popups/AddUserPopup";
import UserManagementStatusRenderer from "./statusRenderer";
import {
  getAllAgencyUsers,
  inviteSelectedPendingAgencyUser,
  deleteAgencyUser,
} from "@/api/user";
import { PAGINATION } from "@/lib/constants";
import Button from "../Common/Button";

export default function CommonUserManagement({
  handleNewUserSubmit,
  isPopupOpen,
  setIsPopupOpen,
  showFilter = false,
  isLoading = false
}) {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const intialPaginationStatus = {
    currentPage: 1,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    pageIndex: 0,
  };
  const [pagination, setPagination] = useState(intialPaginationStatus);

  // Fetch agency users list
  const getAgencyUserList = async () => {
    try {
      const showMessage = false;
      const response = await getAllAgencyUsers(showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        const agencyUsers = response.data.agency_users.map((userItem) => ({
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

  // Resend Invite User
  const resendActivationEmail = async () => {
    if (selectedUsers.length === 0) {
      return helper.general.alert("error", { message: "No users selected." });
    } else {
      try {
        const response = await inviteSelectedPendingAgencyUser({
          agency_user_ids: selectedUsers,
        });
        if (response && helper.cmpStr(response.status, "ok")) {
          helper.general.alert("success", {
            message: "Activation emails sent successfully!",
          });
        } else {
          helper.general.alert("error", {
            message: "Failed to resend activation emails.",
          });
        }
      } catch (error) {
        helper.general.alert("error", {
          message: "Error sending activation emails.",
        });
      }
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    getAgencyUserList();
  }, []);

  useEffect(() => {
    if (!isPopupOpen) {
      getAgencyUserList();
    }
  }, [isPopupOpen])

  // Toggle popup state
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Delete Agency User
  const deleteUser = async (user_id) => {
    try {
      const response = await deleteAgencyUser(user_id);
      if (response && helper.cmpStr(response.status, "ok")) {
        getAgencyUserList();
      } else {
        helper.general.alert("error", { message: "Failed to delete user." });
      }
    } catch (error) {
      helper.general.alert("error", {
        message: "Error sending activation emails.",
      });
    }
  };

  const handleCheckboxChange = (user_id, isChecked) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (isChecked) {
        // Add the agency user id if checked
        return [...prevSelectedUsers, user_id];
      } else {
        // Remove the agency user id if unchecked
        return prevSelectedUsers.filter((e) => e !== user_id);
      }
    });
  };

  // Data memoization
  const columns = React.useMemo(
    () => [
      {
        header: "",
        accessorKey: "Checkbox",
        headerSorting: false,
        headerWidth: "40px",
        Cell: ({ row: { original } }) => (
          <div
            style={{
              display: original.status === "pending" ? "inline-block" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={selectedUsers.includes(original.agency_user_id)}
              onChange={(e) =>
                handleCheckboxChange(original.agency_user_id, e.target.checked)
              }
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
        Cell: ({ row: { original } }) => {
          const last_seen = original.last_seen;
          if (helper.isEmpty(last_seen)) {
            return <span>None</span>;
          }
          const lastSeenFormatted =
            helper.date.timeSince(new Date(last_seen)) == "Now"
              ? "Now"
              : helper.date.timeSince(new Date(last_seen)) + " ago";
          return <span>{lastSeenFormatted}</span>;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        Cell: ({ row: { original } }) => (
          <UserManagementStatusRenderer status={original.status} />
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        headerSorting: false,
        Cell: ({ row: { original } }) => (
          <button
            onClick={() => deleteUser(original.agency_user_id)}
            className="text-red-600 hover:text-red-800"
          >
            <Image src="/icons/trash-icon.svg" width={20} height={20} />
          </button>
        ),
      },
    ],
    [selectedUsers]
  );

  return (
    <div className="w-full p-5 h-full">
      <div>
        <div className="p-5 border border-b-0 rounded-t-xl flex flex-1 justify-between items-center">
          <h2 className="text-3xl">
            {loading ? "Loading..." : `${allUsers?.length || 0} Licensed Users`}
          </h2>
          <div className="flex items-center gap-4">
            <Button
              icon="/icons/add-icon.svg"
              outlined
              isRound
              variant="primary"
              className="!px-4 !py-3 font-semibold text-sm"
              onClick={togglePopup}
            >
              Add New User
            </Button>
            <Button
              icon="/icons/envelope-icon.svg"
              isRound
              variant="primary"
              className="!px-4 !py-3 font-semibold text-sm"
              onClick={resendActivationEmail}
            >
              Resend Activation Email
            </Button>
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
            data={allUsers?.length ? allUsers : []}
            totalCount={allUsers?.length}
            pageSize={pagination.pageSize}
            paginationRequired={showFilter}
            paginationServerSide={true}
            currentPage={pagination.currentPage - 1}
            onPageChange={(newPage) =>
              setPagination({ ...pagination, currentPage: newPage })
            }
            onPageSizeChange={(pageSize) => {
              setPagination({ ...pagination, pageSize, currentPage: 1 });
            }}
            onSortChange={(orderBy, order) => {}}
          />
        )}
      </div>

      {/* Pass props to AddUserPopup */}
      <AddUserPopup
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
        onSubmit={handleNewUserSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
