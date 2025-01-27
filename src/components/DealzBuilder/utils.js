import { formatDateToYYYYMMDD } from "@/lib/date";
import { isValidURL } from "@/lib/utils";

export const getDealzFormattedData = (data) => {
  const formData = data.dealz;
  const couponData = data.coupons;

  const isCsvFile = couponData?.[0]?.code && isValidURL(couponData?.[0]?.code);

  const dealzData = {
    step: 1,
    title: formData.title,
    initial_message: formData.initial_message,
    offer_type: formData.offer_type,
    amount: formData.amount ?? null,
    coupon_code_type: formData.coupon_code_type,
    banner_image: formData.banner_image ?? null,
    coupon_code_file_url:
      couponData?.[0]?.code && isCsvFile ? couponData?.[0]?.code : null,
    followup_message: formData.followup_message,
    link: formData.link ?? null,
    slot_date: formatDateToYYYYMMDD(formData.slot_date),
    slot_time: formData.slot_time ?? null,
    valid_date_from: formatDateToYYYYMMDD(formData.valid_date_from),
    valid_date_to: formatDateToYYYYMMDD(formData.valid_date_to),
    daily_deal: formData.daily_deal ?? false,
    weekly_deal: formData.weekly_deal ?? false,
    csv_file_name: null,
    coupon_creation_type: formData.coupon_creation_type,
    code: couponData?.[0]?.code && !isCsvFile ? couponData?.[0]?.code : null,
  };
  return dealzData;
};
