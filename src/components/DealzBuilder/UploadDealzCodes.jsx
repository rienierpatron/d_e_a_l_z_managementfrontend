import { Spinner } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
/**
 * Internal dependencies
 */
import IconCloseCircle from "@/components/Icons/IconCloseCircle";
import FilePicker from "@/components/Common/FilePicker";
import IconUploadFile from "@/components/Icons/IconUploadFile";
import { api } from "@/api";
import { DEALZ, UPLOAD_TYPES } from "@/lib/constants";
import Button from "@/components/Common/Button";
import Typography from "@/components/Common/Typography";
import { previewFileName } from "@/lib/utils";

const UploadDealzCodes = ({ formData, setFormData, dealzId = "" }) => {
  const { coupon_code_file_url, csv_file_name } = formData;
  const [uplodingDealzCodes, setUplodingDealzCodes] = useState(false);

  const onUploadFile = async (file, uploadType) => {
    try {
      setUplodingDealzCodes(true);
      let params = {
        couponCreationType: DEALZ.COUPON_CREATION_TYPE.upload,
        couponCodeType: DEALZ.COUPON_CODE_TYPE.universal,
      };
      const res = await api.file.uploadFile(uploadType, file, params);
      if (res.status === "ok") {
        setUplodingDealzCodes(false);
        setFormData({
          ...formData,
          coupon_code_file_url: res.data.file.full_file_url,
          csv_file_name: res.data.file.file_name,
        });
        return;
      }
      setUplodingDealzCodes(false);
    } catch (error) {
      setUplodingDealzCodes(false);
      console.log("Error in upload file", error);
    }
  };

  const onDeleteUploadedFile = async () => {
    try {
      setFormData({
        ...formData,
        coupon_code_file_url: "",
      });
      await api.file.deleteUploadedFile(coupon_code_file_url);
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  return (
    <>
      {uplodingDealzCodes ? (
        <Spinner className="fill-black" />
      ) : coupon_code_file_url ? (
        <div className="flex flex-col gap-[6px] w-max justify-center">
          <div className="relative p-4 rounded-2xl border border-light-gray w-max">
            <div className="absolute -right-1 -top-3 bg-white border border-light-gray rounded-full h-6 w-6 flex items-center justify-center">
              <IconCloseCircle
                height={24}
                width={24}
                className="cursor-pointer"
                onClick={onDeleteUploadedFile}
              />
            </div>
            <Image src="/icons/csv-preview.svg" width={48} height={48} />
          </div>
          <Typography variant="caption">
            {previewFileName(csv_file_name)}
          </Typography>
        </div>
      ) : (
        <FilePicker
          onFileSelect={(file) => onUploadFile(file, UPLOAD_TYPES.dealz_codes)}
          accept=".csv"
        >
          <Button
            icon={<IconUploadFile />}
            className="flex-col border-dashed rounded-2xl !bg-light-blue text-dark-gray"
          >
            Upload CSV
          </Button>
        </FilePicker>
      )}
    </>
  );
};

export default UploadDealzCodes;
