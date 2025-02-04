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

const UploadHeroImage = ({ formData, setFormData }) => {
  const { banner_image } = formData;
  const [uplodingHeroImage, setUplodingHeroImage] = useState(false);

  const onUploadFile = async (file, uploadType) => {
    try {
      setUplodingHeroImage(true);
      const res = await api.file.uploadFile(uploadType, file);
      if (res.status === "ok") {
        setUplodingHeroImage(false);
        setFormData({
          ...formData,
          banner_image: res.data.file.full_file_url,
        });
        return;
      }
      setUplodingHeroImage(false);
    } catch (error) {
      setUplodingHeroImage(false);
      console.log("Error in upload file", error);
    }
  };

  const onDeleteUploadedImage = async () => {
    try {
      setFormData({
        ...formData,
        banner_image: "",
      });
      await api.file.deleteUploadedFile(banner_image);
    } catch (error) {
      console.log("Error in upload file", error);
    }
  };

  return (
    <>
      {uplodingHeroImage ? (
        <Spinner className="fill-black" />
      ) : banner_image ? (
        <div className="relative w-max">
          <IconCloseCircle
            height={24}
            width={24}
            className="bg-white rounded-full absolute right-0 -top-2 cursor-pointer"
            onClick={onDeleteUploadedImage}
          />
          <Image
            src={banner_image}
            width={120}
            height={80}
            className="rounded-2xl h-20 object-cover"
          />
        </div>
      ) : (
        <FilePicker
          onFileSelect={(file) =>
            onUploadFile(file, UPLOAD_TYPES.dealz_banner)
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
      )}
    </>
  );
};

export default UploadHeroImage
