import { useEffect, useState } from "react";
import Image from "next/image";
/**
 * Internal dependencies
 */
import IconCloseCircle from "@/components/Icons/IconCloseCircle";
import FilePicker from "@/components/Common/FilePicker";
import IconUploadFile from "@/components/Icons/IconUploadFile";
import Button from "@/components/Common/Button";

const UploadBusinessLogo = ({ setAgencyLogo, agencyLogo }) => {
  const [logo, setLogo] = useState(null);

  const onUploadFile = async (file) => {
    if (file) {
      setLogo(URL.createObjectURL(file));
      setAgencyLogo(file);
    }
  };

  const onDeleteUploadedFile = async () => {
    setAgencyLogo(null);
    setLogo(null);
  };

  useEffect(() => {
    if (!agencyLogo) {
      setLogo(null);
    }
  }, [agencyLogo]);

  return (
    <>
      {logo ? (
        <div className="relative p-3 rounded-2xl border bg-white w-max">
          <div className="absolute -right-1 -top-3 bg-white border border-light-gray rounded-full h-6 w-6 flex items-center justify-center">
            <IconCloseCircle
              height={24}
              width={24}
              className="cursor-pointer"
              onClick={onDeleteUploadedFile}
            />
          </div>
          <Image src={logo} width={100} height={100} />
        </div>
      ) : (
        <FilePicker
          onFileSelect={(file) => onUploadFile(file)}
          accept="image/*"
        >
          <Button
            icon={<IconUploadFile />}
            className="flex-col border-dashed rounded-2xl !bg-white text-dark-gray text-sm font-normal"
          >
            Upload logo
          </Button>
        </FilePicker>
      )}
    </>
  );
};

export default UploadBusinessLogo;
