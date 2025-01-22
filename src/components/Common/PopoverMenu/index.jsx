/**
 * External dependencies
 */

import classNames from "classnames";
import { Popover } from "flowbite-react";
import Image from "next/image";

const MenuItem = ({
  label,
  icon,
  onClick,
  menuItemClassName,
  menuItemClassIconClassName,
  menuItemTextClassName,
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "cursor-pointer w-full px-4 py-2 flex items-center hover:bg-light-gray gap-2",
        menuItemClassName
      )}
    >
      {icon && typeof icon === "string" ? (
        <Image
          src={icon}
          alt="menu-item-icon"
          height={16}
          width={16}
          className={classNames("flex-shrink-0", menuItemClassIconClassName)}
        />
      ) : (
        <div className="flex-shrink-0">{icon}</div>
      )}
      <span
        className={classNames(
          "text-midnight-blue text-sm w-full",
          menuItemTextClassName
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default function PopoverMenu({
  children,
  placement = "auto",
  menuItems,
  customContent,
  className,
  menuItemWrapperClassName,
  menuItemClassName,
  menuItemClassIconClassName,
  menuItemTextClassName,
  show,
  onClose,
  rowData = {},
  ...props
}) {
  return (
    <Popover
      open={show}
      placement={placement}
      {...props}
      className={className}
      onOpenChange={() => {
        if (typeof onClose === "function") {
          onClose();
        }
      }}
      content={
        customContent ? (
          customContent
        ) : (
          <div
            className={classNames(
              "min-w-[100px] py-2 bg-white border border-light-gray rounded-[8px]",
              menuItemWrapperClassName
            )}
          >
            {menuItems &&
              menuItems.length &&
              menuItems.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    label={item.label}
                    icon={item?.icon}
                    menuItemClassName={menuItemClassName}
                    menuItemClassIconClassName={menuItemClassIconClassName}
                    menuItemTextClassName={menuItemTextClassName}
                    onClick={() => {
                      if (typeof onClose === "function") {
                        onClose();
                      }
                      if (typeof item?.onClick === "function") {
                        item.onClick(rowData);
                      }
                    }}
                  />
                );
              })}
          </div>
        )
      }
    >
      {children}
    </Popover>
  );
}
