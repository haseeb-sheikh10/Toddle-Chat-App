"use client";
import {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="flex items-center relative leading-7 w-full">
      {icon}
      <input
        className="w-full h-11 leading-7 pl-12 pr-4 border-2 border-transparent rounded-xl outline-none bg-body text-[#0d0c22] duration-500 ease-in-out placeholder:text-black hover:outline-none hover:border-primary focus:outline-none focus:border-primary"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

export default Input;
