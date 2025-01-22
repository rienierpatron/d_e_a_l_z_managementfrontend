import { formatDateToYYYYMMDD } from "@/lib/date";

export const getDealzFormattedData = (formData) => {
  const dealzData = {
    step: 1,
    title: formData.title,
    initial_message: formData.initial_message,
    offer_type: formData.offer_type,
    amount: formData.amount ?? null,
    coupon_code_type: formData.coupon_code_type,
    banner_image: formData.banner_image ?? null,
    coupon_code_file_url: formData.coupon_code_file_url ?? null,
    followup_message: formData.followup_message,
    link: formData.link ?? null,
    slot_date: formatDateToYYYYMMDD(formData.slot_date),
    slot_time: formData.slot_time ?? null,
    valid_date_from: formatDateToYYYYMMDD(formData.valid_date_from),
    valid_date_to: formatDateToYYYYMMDD(formData.valid_date_to),
    daily_deal: formData.daily_deal ?? false,
    weekly_deal: formData.weekly_deal ?? false,
    csv_file_name: null,
  };
  return dealzData
};
