const { fetchLocationAddress } = require("@/api/location-address");
const { DEALZ_STATUS } = require("@/lib/constants");

/**
 * Fetch and format location addresses based on search criteria.
 *
 * @async
 * @function loadLocationAddress
 * @param {string} search - The search text used to filter location addresses.
 * @param {string[]} [countryCodes=["HK"]] - An array of country codes to filter the search results (default is ["HK"]).
 * @returns {Promise<Object[]>} - A promise that resolves to an array of formatted location objects. Each object contains:
 *   - `label` {string} - The description of the location.
 *   - `value` {string} - The unique place ID of the location.
 * @example
 * const search = "Central Park";
 * const countryCodes = ["US"];
 * const locations = await loadLocationAddress(search, countryCodes);
 */
const loadLocationAddress = async (search, countryCodes = ["HK"]) => {
  try {
    const params = {
      searchText: search,
      countryCodes: countryCodes,
    };
    const res = await fetchLocationAddress(params, false);
    if (res && res.status === "ok" && res?.data?.locations?.length) {
      const locations = res.data.locations;
      return locations.map((item) => {
        return {
          label: item.description,
          value: item.place_id,
          ...item,
        };
      });
    }
    return [];
  } catch (error) {
    return [];
  }
};

/**
 * Remove the base domain from a given URL
 * @param {string} url - The full URL
 * @returns {string} - The URL without the domain
 */
function removeDomain(url) {
  if (!url) return;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
  } catch (error) {
    console.error("Invalid URL provided:", error);
    return url; // Return the original URL if it's invalid
  }
}

/**
 * Previews a file name and truncates it if it's too long.
 *
 * @param {string} fileName - The file object to preview the name.
 * @param {number} maxLength - The maximum length allowed for the file name (default: 20).
 * @returns {string} - The preview of the file name.
 *
 * @example
 * const file = new File([""], "this-is-a-very-long-file-name.pdf");
 * const preview = previewFileName(file, 15);
 * console.log(preview); // Output: "this-is-a-very...pdf"
 */
function previewFileName(fileName, maxLength = 20) {
  if (!fileName) {
    return "";
  }

  if (fileName.length <= maxLength) {
    return fileName; // No truncation needed
  }

  const extension = fileName.slice(fileName.lastIndexOf("."));
  const truncatedName = fileName.slice(0, maxLength - extension.length - 3); // Reserve space for "..."

  return `${truncatedName}...${extension}`;
}

/**
 * Generates an array of status options from the `DEALZ_STATUS` object.
 */
function loadDelzStatusOptions() {
  const options = [];
  for (const status in DEALZ_STATUS) {
    options.push({ value: status, label: DEALZ_STATUS[status] });
  }
  return options;
}


/**
 * Checks if a given string is a valid URL.
 *
 * @param {string} string - The string to check.
 * @returns {boolean} - Returns `true` if the string is a valid URL, otherwise `false`.
 *
 * @example
 * isValidURL("https://example.com"); // true
 * isValidURL("not-a-url");          // false
 * isValidURL("ftp://example.com");  // true
 */
function isValidURL(string) {
  try {
    // Attempt to create a URL object with the string
    new URL(string);
    return true;
  } catch (_) {
    // If it throws an error, it's not a valid URL
    return false;
  }
}

module.exports = {
  loadLocationAddress,
  removeDomain,
  previewFileName,
  loadDelzStatusOptions,
  isValidURL
};
