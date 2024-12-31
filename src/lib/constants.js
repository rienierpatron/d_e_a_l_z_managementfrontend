export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 20, 50], // Available page sizes
};

export const BUSINESS_TYPE_OPTIONS = [
  { label: "Hotels", value: "hotels" },
  { label: "Service", value: "service" },
];

export const AGE_RANGE = [
  { label: "18 - 24", value: "18-24" },
  { label: "25 - 65", value: "25-65" },
];

export const GENDER = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const BUSINESS_GOAL = [];

export const DEALZ_STATUS = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Approved and Scheduled",
  revision: "Needs Revision",
  closed: "Closed",
};

export const DEALZ_STATUS_COLOR_MAPPING = {
  draft: "#0E99EF",
  pending: "#9B61DC",
  approved: "#F47418",
  revision: "#EF0E0E",
  closed: "#14A555",
}
