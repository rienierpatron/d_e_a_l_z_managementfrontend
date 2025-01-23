/**
 * Converts a given date into the YYYY-MM-DD format.
 *
 * @param {Date | string | number} date - The date to be formatted. It can be a Date object,
 *                                        a string representing a date, or a timestamp.
 * @returns {string} - The formatted date string in the YYYY-MM-DD format.
 *
 * @example
 * // Using a Date object
 * const formattedDate = formatDateToYYYYMMDD(new Date());
 * console.log(formattedDate); // Output: "2025-01-16"
 *
 * @example
 * // Using a date string
 * const formattedDate = formatDateToYYYYMMDD("2025-01-16T12:00:00Z");
 * console.log(formattedDate); // Output: "2025-01-16"
 *
 * @example
 * // Using a timestamp
 * const formattedDate = formatDateToYYYYMMDD(1673827200000);
 * console.log(formattedDate); // Output: "2023-01-16"
 */
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date range into the "DD-DD MMM, YYYY" or "DD MMM - DD MMM, YYYY" format.
 * Handles different months and years.
 *
 * @param {string | Date} startDate - The start date in "YYYY-MM-DD" format or as a Date object.
 * @param {string | Date} endDate - The end date in "YYYY-MM-DD" format or as a Date object.
 * @returns {string} - The formatted date range string.
 *
 * @example
 * const result = formatDateRange("2025-01-15", "2025-01-18");
 * console.log(result); // Output: "15-18 Jan, 2025"
 */
const previewDealzDateRange = (startDate, endDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      // Same month, same year
      return `${startDay}-${endDay} ${startMonth}, ${startYear}`;
    } else {
      // Different months, same year
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${startYear}`;
    }
  } else {
    // Different years
    return `${startDay} ${startMonth}, ${startYear} - ${endDay} ${endMonth}, ${endYear}`;
  }
};

module.exports = {
  formatDateToYYYYMMDD,
  previewDealzDateRange,
};
