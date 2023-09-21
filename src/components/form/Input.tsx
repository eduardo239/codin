import React, { SetStateAction } from "react";
import { IconType } from "react-icons";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  type?: string;
  value: string | number;
  setState: React.Dispatch<SetStateAction<string | number>>;
  icon?: React.ReactNode | undefined;
};

const Input = ({
  type = "text",
  label,
  id,
  value,
  setState,
  icon,
  ...args
}: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field">
        {icon}
        <input
          className="input"
          id={id}
          type={type}
          value={value}
          onChange={({ currentTarget }) => setState(currentTarget.value)}
          {...args}
        />
      </div>
    </div>
  );
};

export default Input;
