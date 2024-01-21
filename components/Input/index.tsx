import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  type: string;
  placeholder: string;
  id: string;
  value?: string;
  validation?: {};
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors | any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  name?: string;
  maxLength?: number;
  pattern?: string;
};

function Input({
  type,
  id,
  register,
  placeholder,
  value,
  validation,
  errors,
  name,
  ...props
}: Props) {
  const registerObj = register
    ? { ...register(id, { ...validation }) }
    : { name: id };
  return (
    <>
      <input
        {...props}
        type={type}
        id={id}
        autoComplete={id}
        {...registerObj}
        value={value}
        placeholder={placeholder}
        className={`font-[400] text-white ${
          errors?.[id] ? "border border-error" : "border border-input"
        } bg-input rounded-[10px] h-[45px] w-full pl-[16px] pr-[16px] py-[10px] focus:outline-none custom-input`}
      />
      {errors?.[id]?.message ? (
        <div className="mt-2 text-xs leading-3 text-rose-500 justify-items-start self-start">
          {errors?.[id].message}
        </div>
      ) : null}
    </>
  );
}

export default Input;
