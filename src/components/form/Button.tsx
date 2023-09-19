import React from "react";
import { MdSave } from "react-icons/md";

type ButtonProps = {
  onClick?: () => Promise<void>;
};

const Button = ({
  onClick,
  children,
}: React.PropsWithChildren & ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className="btn">
        <MdSave />
        {children}
      </button>
    </div>
  );
};

export default Button;
