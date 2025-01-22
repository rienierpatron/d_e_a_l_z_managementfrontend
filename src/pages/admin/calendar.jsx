/**
 * External dependencies
 */
import React, { useState } from "react";

/**
 * Internal dependencies
 */
import AllDealz from "@/components/Admin/AllDealz";

export default function Calendar() {
  return (
    <div className="w-full px-10 py-8">
      <AllDealz title="Calendar" backNav={true} />
    </div>
  );
}
