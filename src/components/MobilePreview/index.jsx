import Image from "next/image";
import Typography from "@/components/Common/Typography";
import IconAdd from "@/components/Icons/IconAdd";

const MobilePreview = () => {
  return (
    <div className="w-[320px] relative h-[830px]">
      <img
        src="/images/iphone-14-frame.png"
        className="w-full self-start relative"
      />

      <div className="flex items-center justify-between absolute top-[12px] left-0 px-[30px] w-full">
        <Typography className="!font-semibold ml-2">12:00</Typography>
        <Image src="/images/iphone-top-right.png" width={80} height={80} />
      </div>

      <div className="flex items-center justify-between w-full absolute top-[50px] px-[30px]">
        <div className="flex items-center gap-2">
          <Image src="/icons/phone-back-icon.svg" width={20} height={20} />
          <div className="w-[30px] h-[30px] bg-light-gray rounded-full"></div>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/camera-icon.svg" width={40} height={40} />
          <Image src="/icons/phone-icon.svg" width={30} height={30} />
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 p-4 h-[485px] w-[88%] text-xs bg-cover bg-center bg-no-repeat overflow-y-auto scrollbar-hide"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/images/wa-white.jpeg')",
        }}
      >
        <div className="bg-white rounded-[10px] p-[10px]">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source.
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 px-[30px] absolute w-full bottom-[215px]">
        <IconAdd className="text-secondary" />
        <div className="w-full h-8 border-2 border-light-gray rounded-[32px]"></div>
      </div>
    </div>
  );
};

export default MobilePreview