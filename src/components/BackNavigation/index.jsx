import React from "react";
import classNames from "classnames";
import Button from "../Button";
import { useRouter } from "next/router";

const BackNavigation = ({ href, baseClassName, icon, text, className }) => {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      window.history.back(-1);
    }
  };

  return (
    <Button
      className={classNames(
        "flex items-center gap-2 font-semibold min-w-max !p-0 mb-[20px] bg-transparent",
        baseClassName
      )}
      onClick={handleBack}
      icon={icon ? icon : "/arrow-left.svg"}
      borderless
    >
      <span
        className={classNames(
          "whitespace-nowrap text-ellipsis text-midnight-blue",
          className
        )}
      >
        {text}
      </span>
    </Button>
  );
};

export default BackNavigation;
