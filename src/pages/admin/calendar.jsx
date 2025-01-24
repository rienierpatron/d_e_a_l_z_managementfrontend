/**
 * External dependencies
 */
import React, { useState } from "react";

/**
 * Internal dependencies
 */
import DealzList from "@/components/Admin/DealzList";

export default function Calendar() {
  return (
    <div className="w-full px-10 py-8">
      <DealzList title="Calendar" backNav={true} />
    </div>
  );
}
