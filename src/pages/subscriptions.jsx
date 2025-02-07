/**
 * External dependencies
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
import { getSubscriptionPlans } from "@/api/subscriptions";
import { useSubscription } from "@/components/Subscriptions/GetSubscriptionDetails";
import { api } from "@/api";

export default function Subscriptions() {
  const router = useRouter();
  const [planList, setPlanList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  const { currentSubscription } = useSubscription();
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getSubscriptionPlanList();
  }, []);

  const handleUpdateBillingDetails = async () => {
    try {
      setLoading(true);
      const res = await api.subscription.getCustomerPortalLink();
      if (res && helper.cmpStr(res.status, "ok")) {
        setLoading(false);
        router.push(res.data.stripe_customer_portal_link);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return helper.general.alert("error", {
        message: "Something went wrong.",
      });
    }
  };

  const handleClickContactUs = () => {
    window.location.href = "mailto:support@dealz.asia";
  };

  return (
    <div className="w-full p-10">
      <div className="flex flex-1 justify-between border border-light-gray p-6 rounded-2xl items-center">
        {currentSubscription &&
        !helper.isEmpty(currentSubscription?.subscription) ? (
          <div>
            <Typography className="pb-2 text-[18px] font-medium text-midnight-blue">
              Your current plan is until{" "}
              {new Date(
                currentSubscription.subscription.period_end
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
            <Button
              outlined
              borderless
              variant="primary"
              className="!p-0 underline"
              onClick={handleUpdateBillingDetails}
              isLoading={loading}
              disabled={loading}
            >
              Click to update your billing details
            </Button>
          </div>
        ) : (
          <Typography variant="caption" className="!font-semibold">
            You are not currently subscribed to any plan.
          </Typography>
        )}
        <div className="flex gap-2 ml-auto">
          <CancelSubscriptionCta currentSubscription={currentSubscription} />
          <Button
            icon="/icons/call-icon.svg"
            variant="primary"
            isRound
            outlined
            className="!py-[10px]"
            onClick={handleClickContactUs}
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 4xl:grid-cols-[2fr_1fr] gap-10">
        <div className="flex-1 justify-between gap-5 mt-[64px] grid grid-cols-1 lg:grid-cols-3">
          {SUBSCRIPTIONS.PLANS.map((plan, index) => {
            return (
              <PlanCard
                key={index}
                icon={plan.icon}
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
                currentSubscription={currentSubscription}
              />
            );
          })}
        </div>
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
                  stripeProductPriceId={item.stripe_product_price_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
