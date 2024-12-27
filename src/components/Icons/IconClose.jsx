import React from "react";

export default function IconClose({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M3 9L9 3M3 3L9 9"
        fill="#02021E"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="fill-current"
      />
    </svg>
  );
}
