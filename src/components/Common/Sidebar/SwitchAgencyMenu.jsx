import { useEffect, useState } from "react";
import { helper } from "@/helpers";
import Typography from "../../Common/Typography";
import { getUserListAgencies, switchAgency } from "@/api/agency_access";

export default function SwitchAgencyMenu(isSuperAdminOrStaff) {
  console.log(isSuperAdminOrStaff);
  const [agencyList, setAgencyList] = useState([]);

  const getAgencyUserList = async () => {
    try {
      const showMessage = false;
      const response = await getUserListAgencies(showMessage);
      if (response && helper.cmpStr(response.status, "ok")) {
        setAgencyList(response.data);
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
      const response = await switchAgency(agencyId);
      if (response && response.status === "ok") {
        const accessToken = response.data.access_token;
        helper.cookie.setAccessToken(accessToken);
        window.location.href = "/dashboard"
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  return (
    <div className="absolute w-[160px] top-7 left-[90%] transform -translate-x-3/2 bg-white shadow-lg p-4 rounded-md border border-light-grat">
      <Typography variant="caption">Switch Agency</Typography>
      <ul className="pt-1">
        {agencyList.length === 0 ? (
          <li className="py-2 text-center">No agencies available</li>
        ) : (
          agencyList.agencies.map((agency, index) => (
            <li key={index} className="flex gap-2 py-4" onClick={() => handleSwitchAgencyClick(agency.agency_id)}>
              <div className="p-1 bg-black text-white w-6 h-6 flex items-center justify-center rounded">
                {agency.agency_name ? agency.agency_name[0] : "?"}
              </div>
              <Typography variant="caption" className="!text-black">
                {agency.agency_name || ""}
              </Typography>
            </li>
          ))
        )} 
        <li className="pt-3 flex gap-2 border-t border-light-gray">
          <div className="p-1 bg-purple text-white w-6 h-6 flex items-center justify-center rounded">
            S
          </div>
          <Typography variant="caption" className="!text-black">Super admin</Typography>
        </li>
      </ul>
    </div>
  );
}