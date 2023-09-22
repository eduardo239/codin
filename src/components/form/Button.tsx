import React from "react";

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
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-primary ${full ? "btn-full" : ""}`}
      {...args}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
