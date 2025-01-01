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
};

export const SUBSCRIPTIONS = {
  PLANS: [
    {
      planTitle: "Starter",
      promotionText: "Early Bird Special",
      priceCurrency: "HKD",
      priceAmount: "$1888",
      priceOldAmount: "$3888",
      pricePeriod: "Per month",
      benefits: [
        "5 Slots per month",
        "Day only selection for deal",
        "Email Support",
      ],
    },
    {
      planTitle: "Pro",
      promotionText: "Early Bird Special",
      priceCurrency: "HKD",
      priceAmount: "$3999",
      priceOldAmount: "$5888",
      pricePeriod: "Per month",
      benefits: [
        "10 Slots per month",
        "Own WABA and booking flow",
        "Time and day selection for deal",
        "Priority placement available",
        "Access to DEALZ of the week slots",
        "Premium account support",
        "Exclusive access to industry events",
      ],
    },
  ],
  ADD_ONS: [
    {
      priceText: "HKD$2499",
      dealDescription: "DEALZ of the week slot (Reaches free users)",
      availabilityNote: "*This product will be available in next month",
    },
    {
      priceText: "HKD$2499",
      dealDescription: "DEALZ of the week slot (Reaches free users)",
      availabilityNote: "*This product will be available in next month",
    },
    {
      priceText: "HKD$1499",
      dealDescription: "Daily banner image slots",
      availabilityNote: "*This product will be available in next month",
    },
    {
      priceText: "HKD$499",
      dealDescription: "Additional slots",
      availabilityNote: "*This product will be available in next month",
    },
  ],
};
