import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  kind?: "text";
  register: UseFormRegisterReturn;
  placeholder: string;
  classnames: string;
  [key: string]: any;
}

const Input = ({
  type,
  kind = "text",
  register,
  placeholder,
  classnames,
  ...rest
}: InputProps) => {
  return (
    <>
      {kind === "text" ? (
        <input
          className={classnames}
          type={type}
          placeholder={placeholder}
          {...register}
          {...rest}
        />
      ) : null}
    </>
  );
};

export default Input;
