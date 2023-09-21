import React from "react";
import { MdSave } from "react-icons/md";

type ButtonProps = {
  full?: boolean;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: React.ReactNode | undefined;
};

const Button = ({
  onClick,
  type,
  full,
  icon,
  children,
  ...args
}: React.PropsWithChildren & ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`btn ${full ? "btn-full" : ""}`}
        {...args}
      >
        {icon}
        {children}
      </button>
    </div>
  );
};

export default Button;
