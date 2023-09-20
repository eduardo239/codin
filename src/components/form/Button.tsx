import React from "react";
import { MdSave } from "react-icons/md";

type ButtonProps = {
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({
  onClick,
  type,
  children,
}: React.PropsWithChildren & ButtonProps) => {
  return (
    <div>
      <button type={type} onClick={onClick} className="btn">
        <MdSave />
        {children}
      </button>
    </div>
  );
};

export default Button;
