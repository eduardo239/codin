import React from "react";

type ButtonProps = {
  full?: boolean;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "dark";
  small?: boolean;
};

const Button = ({
  onClick,
  type,
  full,
  icon,
  variant,
  small,
  children,
  ...args
}: React.PropsWithChildren & ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${
        variant === "primary"
          ? "btn-primary"
          : variant === "secondary"
          ? "btn-secondary"
          : variant === "light"
          ? "btn-light"
          : variant === "dark"
          ? "btn-dark"
          : "btn-primary"
      } ${full ? "btn-full" : ""} ${small ? "btn-small" : ""}`}
      {...args}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
