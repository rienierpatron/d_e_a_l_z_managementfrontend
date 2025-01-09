/**
 * External dependencies
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Internal dependencies
 */
import Typography from "@/components/Common/Typography";
import Button from "@/components/Common/Button";
import CancelSubscriptionCta from "@/components/Subscriptions/CancelSubscriptionCta";
import AddOnsCard from "@/components/Subscriptions/AddOnsCard";
import PlanCard from "@/components/Subscriptions/PlanCard";
import { SUBSCRIPTIONS } from "@/lib/constants";
import { helper } from "@/helpers";
import {
  getSubscriptionDetails,
  getSubscriptionPlans,
} from "@/api/subscriptions";

export default function Subscriptions() {
  const [planList, setPlanList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  const getSubscriptionPlanList = async () => {
    try {
      setFetchingList(true);
      const response = await getSubscriptionPlans();
      if (
        response &&
        helper.cmpStr(response.status, "ok") &&
        response.data.plans.length > 0
      ) {
        setFetchingList(false);
        setPlanList(response.data.plans);
      }
    } catch (error) {
      setFetchingList(false);
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  const getCurrentSubscriptionDetails = async () => {
    try {
      const showMessage = false;
      const res = await getSubscriptionDetails(showMessage);
      if (res && helper.cmpStr(res.status, "ok")) {
      }
    } catch (error) {
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  useEffect(() => {
    getSubscriptionPlanList();
    getCurrentSubscriptionDetails();
  }, []);

  return (
    <div className="w-full p-10">
      <div className="flex flex-1 justify-between border border-light-gray p-6 rounded-2xl">
        <div>
          <Typography className="pb-2 text-[18px] font-medium text-midnight-blue">
            Your current plan is until March 4, 2025
          </Typography>
          <Typography variant="body">
            <Link href="/" className="text-primary underline">
              Click to update your billing details
            </Link>
          </Typography>
        </div>
        <div className="flex gap-2">
          <CancelSubscriptionCta />
          <Button
            icon="/icons/call-icon.svg"
            variant="primary"
            isRound
            outlined
            className="!py-[10px]"
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className="flex flex-1 justify-between gap-5 mt-[64px]">
        {SUBSCRIPTIONS.PLANS.map((plan, index) => {
          return (
            <PlanCard
              key={index}
              planTitle={plan.planTitle}
              promotionText={plan.promotionText}
              priceCurrency={plan.priceCurrency}
              priceAmount={plan.priceAmount}
              priceOldAmount={plan.priceOldAmount}
              pricePeriod={plan.pricePeriod}
              benefits={plan.benefits}
              disabled={fetchingList}
              stripeProductPriceId={
                planList?.find(
                  (ele) =>
                    ele.product_name.toLowerCase() ===
                    plan.planTitle.toLowerCase()
                )?.stripe_product_price_id
              }
            />
          );
        })}
        <div className="w-full">
          <Typography variant="heading" className="mb-[24px]">
            Add ons
          </Typography>
          <div className="grid grid-cols-2 gap-5 w-full">
            {SUBSCRIPTIONS.ADD_ONS.map((item, index) => {
              return (
                <AddOnsCard
                  key={index}
                  priceText={item.priceText}
                  dealDescription={item.dealDescription}
                  availabilityNote={item.availabilityNote}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
