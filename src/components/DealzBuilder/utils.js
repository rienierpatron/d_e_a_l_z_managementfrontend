import { formatDateToYYYYMMDD } from "@/lib/date";
import { isValidURL } from "@/lib/utils";

export const getDealzFormattedData = (data) => {
  const formData = data.dealz;
  const couponData = data.coupons;

  const isCsvFile = couponData?.[0]?.code && isValidURL(couponData?.[0]?.code);

  const dealzData = {
    step: 1,
    title: formData.title,
    initial_cta_text: formData.initial_cta_text,
    coupon_code_type: formData.coupon_code_type,
    link: formData.link ?? null,
    slot_date: formatDateToYYYYMMDD(formData.slot_date),
    slot_time: formData.slot_time ?? null,
    valid_date_from: formatDateToYYYYMMDD(formData.valid_date_from),
    valid_date_to: formatDateToYYYYMMDD(formData.valid_date_to),
    daily_deal: formData.daily_deal ?? false,
    weekly_deal: formData.weekly_deal ?? false,
    dealz_text: formData.dealz_text ?? null,
    cta_link_text: formData.cta_link_text ?? null,
    dealz_image: formData.dealz_image ?? null
  };
  return dealzData;
};
