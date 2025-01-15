const { api } = require("@/api");

const loadLocationAddress = async (search, countryCodes = ["HK"]) => {
  try {
    const params = {
      searchText: search,
      countryCodes: countryCodes,
    };
    const res = await api.locationAddress.fetchLocationAddress(params, false);
    if (res && res.status === "ok" && res?.data?.locations?.length) {
      const locations = res.data.locations
      return locations.map((item) => {
        return {
          label: item.description,
          value: item.place_id,
          ...item
        }
      })
    }
    return []
  } catch (error) {
    return [];
  }
};

module.exports = {
  loadLocationAddress,
};
