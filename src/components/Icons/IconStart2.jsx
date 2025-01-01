import React from "react";

export default function IconStar2({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M7 0.5L7.70286 7.24693L14 8L7.70286 8.75307L7 15.5L6.29714 8.75307L0 8L6.29714 7.24693L7 0.5Z"
        fill="#D9D9D9"
        className="fill-current"
      />
      <path
        d="M7 0.5L7.70286 7.24693L14 8L7.70286 8.75307L7 15.5L6.29714 8.75307L0 8L6.29714 7.24693L7 0.5Z"
        fill="#DFF441"
        className="fill-current"
      />
      <path
        d="M7 0.5L7.70286 7.24693L14 8L7.70286 8.75307L7 15.5L6.29714 8.75307L0 8L6.29714 7.24693L7 0.5Z"
        fill="white"
        className="fill-current"
      />
    </svg>
  );
}
