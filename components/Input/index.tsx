import React from "react";

type Props = {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minLength?: number;
  min?: number;
  max?: number;
  error?: boolean;
};

function Input({
  type,
  placeholder,
  value,
  onChange,
  minLength,
  min,
  max,
  error,
}: Props) {
  return (
    <input
      type={type}
      name=""
      id=""
      minLength={minLength}
      value={value}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={onChange}
      className={`font-[400] text-white ${
        error ? "border border-error" : "border border-input"
      } bg-input rounded-[10px] h-[45px] w-full pl-[16px] pr-[16px] py-[10px] focus:outline-none custom-input`}
    />
  );
}

export default Input;
