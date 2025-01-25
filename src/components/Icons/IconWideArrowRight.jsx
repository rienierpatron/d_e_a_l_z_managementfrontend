import React from "react";

export default function IconWideArrowRight({ className, ...props }) {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path 
        d="M5.24998 12.0575C5.36082 12.0575 5.47165 12.0167 5.55915 11.9292L9.36248 8.12584C9.98082 7.50751 9.98082 6.49251 9.36248 5.87418L5.55915 2.07084C5.38998 1.90168 5.10998 1.90168 4.94082 2.07084C4.77165 2.24001 4.77165 2.52001 4.94082 2.68918L8.74415 6.49251C9.02415 6.77251 9.02415 7.22751 8.74415 7.50751L4.94082 11.3108C4.77165 11.48 4.77165 11.76 4.94082 11.9292C5.02832 12.0108 5.13915 12.0575 5.24998 12.0575Z" 
        fill="#02021E"
        className="fill-current"
      />
    </svg>
  );
}
