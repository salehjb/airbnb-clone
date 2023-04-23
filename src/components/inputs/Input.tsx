"use client";

import { ChangeEvent, FC } from "react";
import { Ban, DollarSign } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  errors: any;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  onChange,
  value,
  disabled,
  formatPrice,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <DollarSign
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder=" "
        type={type}
        className={`
          peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:pointer-events-none
          ${formatPrice ? "pl-9" : "pl-4"}
          ${
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-neutral-300 focus:border-black"
          }
        `}
      />
      {errors[id] && (
        <span className="text-rose-500 flex items-center mt-2">
          <Ban size={18} className="mr-2" /> {errors[id]}
        </span>
      )}
      <label
        className={`
          absolute text-mdduration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4 
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;