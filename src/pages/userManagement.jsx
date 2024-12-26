import React, { useState } from "react";
import CommonTable from "@/components/Common/CommonTable";
import Image from "next/image";
import AddUserPopup from "@/popups/AddUserPopup";

export default function userManagement() {
  const [isPopupOpen, setIsPopupOpen] = useState(true); // State to control popup visibility

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup state
  };

  const handleNewUserSubmit = (userData) => {
    console.log("New User Data:", userData);
  };

  const data = React.useMemo(
    () => [
      {
        name: "Alice",
        user_type: "Admin",
        email: "alice@abc.com",
        last_seen: "John Doe",
        status: "Active",
      },
      {
        name: "Bob",
        user_type: "Admin",
        email: "bob@abc.com",
        last_seen: "John Doe",
        status: "Pending",
      },
      {
        name: "Charlie",
        user_type: "Admin",
        email: "charlie@abc.com",
        last_seen: "Will Smith",
        status: "Active",
      },
      {
        name: "David",
        user_type: "Admin",
        email: "david@abc.com",
        last_seen: "Will Smith",
        status: "Inactive",
      },
      {
        name: "David",
        user_type: "Admin",
        email: "david1@abc.com",
        last_seen: "Will Smith",
        status: "Active",
      },
      {
        name: "Bob",
        user_type: "Admin",
        email: "bob@abc.com",
        last_seen: "John Doe",
        status: "Inactive",
      },
      {
        name: "Charlie",
        user_type: "Admin",
        email: "charlie@abc.com",
        last_seen: "Will Smith",
        status: "Active",
      },
      {
        name: "David",
        user_type: "Admin",
        email: "david@abc.com",
        last_seen: "Will Smith",
        status: "Inactive",
      },
      {
        name: "David",
        user_type: "Admin",
        email: "david@abc.com",
        last_seen: "Will Smith",
        status: "Active",
      },
    ],
    []
  );

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
              display: original.status === "Pending" ? "inline-block" : "none",
            }}
          >
            <input type="checkbox" />
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
        header: "Created by",
        accessorKey: "last_seen",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Actions",
        accessorKey: "actions",
        headerSorting: false,
        // Custom render function for the "Action" column
        Cell: ({ row: { original } }) => (
          <button
            onClick={() => handleDeleteUser(row.original.email)} // Trigger delete on click
            className="text-red-600 hover:text-red-800"
          >
            <Image src="/icons/trash-icon.svg" width={20} height={20} />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full p-5 h-full">
      <div>
        <div className="p-5 border border-b-0 rounded-t-xl flex flex-1 justify-between items-center">
          <h2 className="text-3xl">{data.length} licensed Users</h2>
          <div>
            <button className="px-4 py-2 mr-4 bg-white text-pink-600 text-sm font-medium rounded-3xl border border-pink-600 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
              <Image
                src="/icons/add-icon.svg"
                alt="Add New User"
                width={16}
                height={16}
                className="inline-block mr-1"
              />
              Add New User
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-3xl shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
              <Image
                src="/icons/envelope-icon.svg"
                alt="Add New User"
                width={16}
                height={16}
                className="inline-block mr-2"
              />
              Resend Activation Email
            </button>
          </div>
        </div>
        <CommonTable
          columns={columns}
          data={data}
          pageSize={2}
          paginationRequired={true}
          onPageChange={(currentPage) => {}}
          onPageSizeChange={(pageSize) => {}}
          onSortChange={(orderBy, order) => {}}
          sortingServerSide={false}
        />
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
