export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 20, 50], // Available page sizes
};

export const BUSINESS_TYPE_OPTIONS = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Gym", value: "gym" },
  { label: "Retail", value: "retail" },
  { label: "Beauty", value: "beauty" },
  { label: "Wellness", value: "wellness" },
  { label: "Cafe", value: "cafe" },
  { label: "Hotel", value: "hotel" },
  { label: "School", value: "school" },
  { label: "Clinic", value: "clinic" },
  { label: "Ecommerce", value: "ecommerce" },
  { label: "Others", value: "others" },
];

export const BUSINESS_LOCATION = [
  { label: "Hong Kong Island", value: "Hong Kong Island" },
  { label: "Kowloon", value: "Kowloon" },
  { label: "New Territories", value: "New Territories" },
];

export const AGE_RANGE = [
  { label: "Below 18", value: "Below 18" },
  { label: "18-24", value: "18-24" },
  { label: "25-29", value: "25-29" },
  { label: "30-35", value: "30-35" },
  { label: "36-40", value: "36-40" },
  { label: "41-50", value: "41-50" },
  { label: "51-60", value: "51-60" },
  { label: "61-70", value: "61-70" },
  { label: "Above 70", value: "Above 70" },
];

export const GENDER = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const BUSINESS_GOAL = [
  { label: "Last minute promotions", value: "Last minute promotions" },
  { label: "Generate sales", value: "Generate sales" },
  { label: "Get foot traffic", value: "Get foot traffic" },
  { label: "Promote our brand", value: "Promote our brand" },
];

export const DEALZ_STATUS = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Approved and Scheduled",
  revision: "Needs Revision",
  closed: "Closed",
};

export const DEALZ_STATUS_VALUE = {
  draft: "draft",
  pending: "pending",
  approved: "approved",
  revision: "revision",
  closed: "closed",
};

export const DEALZ_STATUS_COLOR_MAPPING = {
  draft: "#0E99EF",
  pending: "#9B61DC",
  approved: "#299736",
  revision: "#EF0E0E",
  closed: "#14A555",
};

export const USER_MANAGEMENT_STATUS = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};

export const USER_MANAGEMENT_STATUS_COLOR_MAPPING = {
  active: "#4177F4",
  inactive: "#646B75",
  pending: "#f47418",
};

export const SUBSCRIPTIONS = {
  PLANS: [
    {
      planTitle: "Starter",
      promotionText: "Early Bird Special",
      priceCurrency: "HKD",
      priceAmount: "$3888",
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
      priceAmount: "$5999",
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
      stripe_product_price_id: "price_1QZ1sXIz3ID7iG8qDIkIedgZ",
      priceText: "HKD$2499",
      dealDescription: "DEALZ of the week slot (Reaches free users)",
      availabilityNote: "*This product will be available in next month",
    },
    {
      stripe_product_price_id: "price_1QZ1xzIz3ID7iG8qBDaAya6v",
      priceText: "HKD$2499",
      dealDescription: "DEALZ of the Week Banner Image Slots",
      availabilityNote: "*This product will be available in next month",
    },
    {
      stripe_product_price_id: "price_1QZ1uoIz3ID7iG8qyri63ajj",
      priceText: "HKD$1499",
      dealDescription: "Daily banner image slots",
      availabilityNote: "*This product will be available in next month",
    },
    {
      stripe_product_price_id: "price_1QZ1zTIz3ID7iG8q4FqQ8dDG",
      priceText: "HKD$499",
      dealDescription: "Additional slots",
      availabilityNote: "*This product will be available in next month",
    },
  ],
  SUBSCRIPTION_TYPES: {
    Pro: "pro",
    Starter: "starter",
  },
};

export const DEALZ = {
  OFFER_TYPE: {
    Percentage: "percentage",
    Dollar: "dollar",
    Other: "other",
  },
  COUPON_CREATION_TYPE: {
    upload: "upload",
    automatic: "automatic",
  },
  COUPON_CODE_TYPE: {
    personalized: "personalized",
    universal: "universal",
  },
  SLOT_TIME: {
    MORNING: "MORNING",
    AFTERNOON: "AFTERNOON",
    EVENING: "EVENING",
  },
};

export const UPLOAD_TYPES = {
  user_profile_image: "user_profile_image",
  agency_logo_image: "agency_logo_image",
  dealz_banner: "dealz_banner",
  dealz_codes: "dealz_codes",
};

export const USER = {
  ROLES: {
    ADMIN: "admin",
    STAFF: "staff",
    SUPERADMIN: "superadmin",
  },
};

export const AGENCY = {
  SUPERADMIN_AGENCY_NAME: "Dealz Asia Management",
};
