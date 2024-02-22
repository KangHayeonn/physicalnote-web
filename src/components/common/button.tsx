import { cls } from "@/utils";
import React from "react";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit";
  color?: "default";
  size?: "default";
  classnames?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}

const Button = ({
  text,
  type,
  color,
  size,
  classnames,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={cls(
          "shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer rounded-[5px] py-1 px-3 hover:bg-[#C6E19B] hover:text-[#fff]",
          classnames || ""
        )}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
