import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

export default function Subscriptions() {
  return (
    <div className="w-full bg-white">
      <div className="fixed w-full text-center left-0 top-0 p-1 bg-gradient-to-r from-[#b3e274] to-[#5a73f2]">
        <Typography className="text-white">This Feature will be available in next month</Typography>
      </div>
      <div className="flex flex-1 justify-between border p-4 rounded-2xl">
        <div>
            <Typography className="pb-2">Your current plan is until March 4, 2025</Typography>
            <Typography variant="body"><Link href="/" className="text-primary">Click to update your billing details</Link></Typography>
        </div>
        <div className="flex gap-2">
            <Button
              icon="/icons/cancel-icon.svg" 
              isRound
              className="text-red border-0 bg-rose-50">
                Cancel Subscription
            </Button>
            <Button
              icon="/icons/call-icon.svg"
              variant="primary" 
              isRound 
              outlined>
                Contact Us
            </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-between gap-5 mt-[40px]">
        {/* Starter Plan */}
        <div className="border rounded-2xl p-[24px] pt-[56px] w-full text-center flex flex-col flex-wrap">
          <div className="w-full">
            <Typography variant="caption" className="px-[12px] py-[5px] border text-center rounded-3xl inline-block">Early Bird Special</Typography>
          </div>
          <div className="w-full">
            <div className="flex flex-1 justify-center items-baseline mt-[32px] w-full">
              <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
              <Typography variant="title" className="font-semibold"><span className="text-green">$1888</span></Typography>
              <Typography variant="body"><span className="text-gray-400">/Per month</span></Typography>
              <Typography className="pl-2 line-through text-[18px]">$3888</Typography>
            </div>
          </div>
          <ul className="text-dark-gray inline-block space-y-2 my-[32px]">
            <li>&#8226; 5 Slots per month</li>
            <li>&#8226; Day only selection for deal</li>
            <li>&#8226; Email Support</li>
          </ul>
          <div className="mt-auto w-full">
            <Button 
              className="w-full"
              variant="primary"
              icon="/icons/arrow-right-icon.svg"
              iconPosition="right"
              outlined
              isRound
            >
              Choose Plan
            </Button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-2xl p-[24px] pt-[56px] w-full text-center flex flex-col flex-wrap active-subscription">
          <div className="w-full">
            <Typography variant="caption" className="px-[12px] py-[5px] border text-center rounded-3xl inline-block">Early Bird Special</Typography>
          </div>
          <div className="w-full">
            <div className="flex flex-1 justify-center items-baseline mt-[32px] w-full">
              <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
              <Typography variant="title" className="font-semibold"><span className="text-green">$3999</span></Typography>
              <Typography variant="body"><span className="text-gray-400">/Per month</span></Typography>
              <Typography className="pl-2 line-through text-[18px]">$5888</Typography>
            </div>
          </div>
          <ul className="text-dark-gray inline-block space-y-2 my-[32px]">
            <li>&#8226; 10 Slots per month</li>
            <li>&#8226; Own WABA and booking flow</li>
            <li>&#8226; Time and day selection for deal</li>
            <li>&#8226; Priority placement available</li>
            <li>&#8226; Access to DEALZ of the week slots</li>
            <li>&#8226; Premium account support</li>
            <li>&#8226; Exclusive access to industry events</li>
          </ul>
          <div className="mt-auto w-full">
            <Button 
              className="w-full"
              variant="primary"
              outlined
              isRound
            >
              Choose Plan
            </Button>
          </div>
        </div>

        {/* Add-On's */}
        <div className="w-full">
          <Typography variant="heading" className="mb-[24px]">Add ons</Typography>

          <div className="flex flex-wrap gap-5 w-full">
            {/* Daily Banner Image Slots */}
            <div className="border rounded-2xl p-[24px] text-center flex flex-col lg:w-[47%]">
              <div className="w-full">
                <div className="flex flex-1 justify-center items-baseline w-full">
                  <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
                  <Typography variant="body" className="font-semibold"><span className="text-green">$1499</span></Typography>
                </div>
              </div>
              <Typography variant="text-dark-gray" className="text-[12px] text-dark-gray py-[12px]">
                Daily Banner Image Slots
              </Typography>
              <Typography variant="text-dark-gray" className="text-[10px] text-dark-gray pb-[24px]">
                *This product will be available in next month
              </Typography>
              <div className="mt-auto w-full">
                <Button 
                  className="w-full text-[12px] font-semibold uppercase"
                  variant="primary"
                  icon="/icons/arrow-right-icon.svg"
                  iconPosition="right"
                  outlined
                  isRound
                >
                  Purchase&nbsp;Now
                </Button>
              </div>
            </div>

            {/* DEALZ of the week slot */}
            <div className="border rounded-2xl p-[24px] text-center flex flex-col lg:w-[47%]">
              <div className="w-full">
                <div className="flex flex-1 justify-center items-baseline w-full">
                  <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
                  <Typography variant="body" className="font-semibold"><span className="text-green">$2499</span></Typography>
                </div>
              </div>
              <Typography variant="text-dark-gray" className="text-[12px] text-dark-gray py-[12px]">
                DEALZ of the week slot (Reaches free users)
              </Typography>
              {/* <Typography variant="text-dark-gray" className="text-[10px] text-dark-gray pb-[24px]">
                *This product will be available in next month
              </Typography> */}
              <div className="mt-auto w-full">
                <Button 
                  className="w-full text-[12px] font-semibold uppercase"
                  variant="primary"
                  icon="/icons/arrow-right-icon.svg"
                  iconPosition="right"
                  outlined
                  isRound
                >
                  Purchase&nbsp;Now
                </Button>
              </div>
            </div>

            {/* DEALZ of the Week Banner Image Slots */}
            <div className="border rounded-2xl p-[24px] text-center flex flex-col lg:w-[47%]">
              <div className="w-full">
                <div className="flex flex-1 justify-center items-baseline w-full">
                  <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
                  <Typography variant="body" className="font-semibold"><span className="text-green">$2499</span></Typography>
                </div>
              </div>
              <Typography variant="text-dark-gray" className="text-[12px] text-dark-gray py-[12px]">
                DEALZ of the Week Banner Image Slots
              </Typography>
              {/* <Typography variant="text-dark-gray" className="text-[10px] text-dark-gray pb-[24px]">
                *This product will be available in next month
              </Typography> */}
              <div className="mt-auto w-full">
                <Button 
                  className="w-full text-[12px] font-semibold uppercase"
                  variant="primary"
                  icon="/icons/arrow-right-icon.svg"
                  iconPosition="right"
                  outlined
                  isRound
                >
                  Purchase&nbsp;Now
                </Button>
              </div>
            </div>

            {/* Additional Slots */}
            <div className="border rounded-2xl p-[24px] text-center flex flex-col lg:w-[47%]">
              <div className="w-full">
                <div className="flex flex-1 justify-center items-baseline w-full">
                  <Typography variant="body" className="font-semibold"><span className="text-green">HKD</span></Typography>
                  <Typography variant="body" className="font-semibold"><span className="text-green">$499</span></Typography>
                </div>
              </div>
              <Typography variant="text-dark-gray" className="text-[12px] text-dark-gray py-[12px]">
                Additional Slots
              </Typography>
              {/* <Typography variant="text-dark-gray" className="text-[10px] text-dark-gray pb-[24px]">
                *This product will be available in next month
              </Typography> */}
              <div className="mt-auto w-full">
                <Button 
                  className="w-full text-[12px] font-semibold uppercase"
                  variant="primary"
                  icon="/icons/arrow-right-icon.svg"
                  iconPosition="right"
                  outlined
                  isRound
                >
                  Purchase&nbsp;Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};