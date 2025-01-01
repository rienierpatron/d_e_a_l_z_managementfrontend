import React from "react";

export default function IconWideArrowUp({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M6.99989 4.20012C6.59156 4.20012 6.18322 4.35762 5.87406 4.66679L2.07072 8.47012C1.90156 8.63929 1.90156 8.91929 2.07072 9.08846C2.23989 9.25762 2.51989 9.25762 2.68906 9.08846L6.49239 5.28512C6.77239 5.00512 7.22739 5.00512 7.50739 5.28512L11.3107 9.08846C11.4799 9.25762 11.7599 9.25762 11.9291 9.08846C12.0982 8.91929 12.0982 8.63929 11.9291 8.47012L8.12572 4.66679C7.81656 4.35762 7.40822 4.20012 6.99989 4.20012Z"
        fill="#646B75"
        className="fill-current"
      />
    </svg>
  );
}
