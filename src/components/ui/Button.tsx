"use client";

import { FC, MouseEvent, ReactNode } from "react";

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: any;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:pointer-events-none rounded-lg hover:opacity-80 transition w-full
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-rose-500 border-none text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border"
            : "py-3 text-md font-semibold border-2"
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {children}
    </button>
  );
};

export default Button;
