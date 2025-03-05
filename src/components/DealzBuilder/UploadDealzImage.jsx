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
import { UPLOAD_TYPES } from "@/lib/constants";
import Button from "@/components/Common/Button";
import { helper } from "@/helpers";
import FormInputValidation from "../Common/FormInputValidation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = ["image/jpeg", "image/png"];

const UploadDealzImage = ({ formData, setFormData, error }) => {
  const { dealz_image } = formData;
  const [uplodingDealzImage, setUplodingDealzImage] = useState(false);

  const onUploadFile = async (file, uploadType) => {
    try {
      if (!file) {
        return helper.general.alert("error", {
          message: "Please select file.",
        });
      }
  
      // Validate file type
      if (!ALLOWED_FORMATS.includes(file.type)) {
        return helper.general.alert("error", {
          message: "Invalid file format. Only JPEG and PNG are allowed.",
        });
      }
  
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return helper.general.alert("error", {
          message: "File size exceeds 5MB. Please upload a smaller file.",
        });
      }

      setUplodingDealzImage(true);
      const res = await api.file.uploadFile(uploadType, file);
      if (res.status === "ok") {
        setUplodingDealzImage(false);
        setFormData({
          ...formData,
          dealz_image: res.data.file.full_file_url,
        });
        return;
      }
      setUplodingDealzImage(false);
    } catch (error) {
      setUplodingDealzImage(false);
      console.log("Error in upload file", error);
    }
  };

  const onDeleteUploadedImage = async () => {
    try {
      setFormData({
        ...formData,
        dealz_image: "",
      });
      await api.file.deleteUploadedFile(dealz_image);
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  return (
    <>
      {uplodingDealzImage ? (
        <Spinner className="fill-black" />
      ) : dealz_image ? (
        <div className="relative w-max">
          <IconCloseCircle
            height={24}
            width={24}
            className="bg-white rounded-full absolute right-0 -top-2 cursor-pointer"
            onClick={onDeleteUploadedImage}
          />
          <Image
            src={dealz_image}
            width={120}
            height={80}
            className="rounded-2xl h-20 object-cover"
          />
        </div>
      ) : (
        <div>
          <FilePicker
            onFileSelect={(file) =>
              onUploadFile(file, UPLOAD_TYPES.dealz_image)
            }
            className="w-max"
            accept="image/*"
          >
            <Button
              icon={<IconUploadFile />}
              className="flex-col border-dashed rounded-2xl"
            >
              Upload image
            </Button>
          </FilePicker>
          {error && error["dealz_image"] && (
            <FormInputValidation isError text={error["dealz_image"]} />
          )}
          <div className="mt-2 text-dark-gray text-xs italic">
            Suggest uploading a specific image for the deal. - If a
            deal-specific image is unavailable, a stock image of food should be
            provided, as it is more appealing to customers.
          </div>
        </div>
      )}
    </>
  );
};

export default UploadDealzImage;
