import React, { SetStateAction } from "react";
import { MdSave } from "react-icons/md";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  value: string;
  type: string;
  setState: React.Dispatch<SetStateAction<string>>;
};

const Input = ({ type, label, id, value, setState, ...args }: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field">
        <MdSave />
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
