import { forwardRef, useEffect, useState } from "react";
import { helper } from "@/helpers";
import Typography from "../../Common/Typography";
import { getUserListAgencies, switchAgency } from "@/api/agency_access";
import { useUser } from "@/context/UserContext";
import classNames from "classnames";
import { AGENCY, USER } from "@/lib/constants";
import { useRouter } from "next/router";

const SwitchAgencyMenu = forwardRef((_, ref) => {
  const { user, fetchUserData } = useUser();
  const router = useRouter();

  const [agencyList, setAgencyList] = useState([]);
  const [superAdminAgency, setSuperAdminAgency] = useState(null);

  const getAgencyUserList = async () => {
    try {
      const showMessage = false;
      const response = await getUserListAgencies(showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        const list = [];
        response.data.agencies?.forEach((agency) => {
          if (agency.agency_name === AGENCY.SUPERADMIN_AGENCY_NAME) {
            setSuperAdminAgency(agency);
          } else {
            list.push(agency);
          }
        });
        setAgencyList(list);
      } else {
        setAgencyList([]);
      }
    } catch (error) {
      helper.general.alert("error", {
        message: "Something went wrong.",
      });
      setAgencyList([]);
    }
  };

  useEffect(() => {
    getAgencyUserList();
  }, []);

  const handleSwitchAgencyClick = async (agencyId) => {
    try {
      if (user.agency_id === agencyId) {
        return null;
      }
      const response = await switchAgency(agencyId);
      if (response && response.status === "ok") {
        const accessToken = response.data.access_token;
        if (accessToken) {
          helper.cookie.setAccessToken(accessToken);
          const userData = await fetchUserData();
          if (userData && userData?.data?.user) {
            userData.data.user.user_role.role_name === USER.ROLES.SUPERADMIN
              ? router.replace("/admin/dashboard")
              : router.replace("/dashboard");
          }
        }
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <div
      className="absolute w-[200px] top-7 left-[90%] transform -translate-x-3/2 bg-white shadow-lg p-4 rounded-md border border-light-grat"
      ref={ref}
    >
      <Typography variant="caption">Switch Agency</Typography>
      <ul className="pt-1 flex flex-col gap-2">
        {agencyList.length === 0 ? (
          <li className="py-2 text-center">No agencies available</li>
        ) : (
          agencyList.map((agency, index) => (
            <li
              key={index}
              className={classNames(
                "flex gap-2 py-2 px-3 items-center cursor-pointer",
                {
                  "!cursor-default bg-light-gray rounded-md":
                    user.agency_id === agency.agency_id,
                }
              )}
              onClick={() => handleSwitchAgencyClick(agency.agency_id)}
            >
              <div className="p-1 bg-black text-white w-6 h-6 flex items-center justify-center rounded flex-shrink-0">
                {agency.agency_name ? agency.agency_name[0] : "?"}
              </div>
              <Typography variant="caption" className="!text-black">
                {agency.agency_name || ""}
              </Typography>
            </li>
          ))
        )}
        <div className="w-full border-t border-light-gray"></div>
        <li
          className={classNames(
            "flex py-2 px-3 gap-2 items-center cursor-pointer",
            {
              "!cursor-default bg-light-gray rounded-md":
                user.agency_id === superAdminAgency?.agency_id,
            }
          )}
          onClick={() => handleSwitchAgencyClick(superAdminAgency?.agency_id)}
        >
          <div className="flex-shrink-0 p-1 bg-purple text-white w-6 h-6 flex items-center justify-center rounded">
            S
          </div>
          <Typography variant="caption" className="!text-black">
            Super admin
          </Typography>
        </li>
      </ul>
    </div>
  );
});

export default SwitchAgencyMenu;
