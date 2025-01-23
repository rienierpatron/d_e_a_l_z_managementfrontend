/**
 * External dependencies
 */
import React from "react";
/**
 * Internal dependencies
 */
import DealzList from "@/components/DealzList";

export default function Calendar() {
  return (
    <div className="w-full py-8 px-10">
      <DealzList showFilter={true} showNavigation={true} />
    </div>
  );
}
