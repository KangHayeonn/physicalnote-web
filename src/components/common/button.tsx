import { cls } from "@/utils";
import React from "react";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit";
  color?: "default";
  size?: "default";
  classnames?: string;
  onClick?: () => void;
  [key: string]: any;
}

const Button = ({
  text,
  type,
  color,
  size,
  classnames,
  onClick,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={cls(
          "shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] py-1 px-3",
          classnames || ""
        )}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
