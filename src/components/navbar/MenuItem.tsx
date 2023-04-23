"use client";

import { FC, ReactNode } from "react";

interface MenuItemProps {
  onClick: () => void;
  children: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {children}
    </div>
  );
};

export default MenuItem;
