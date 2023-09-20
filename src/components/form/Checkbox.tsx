import React, { SetStateAction } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

type InputProps = React.ComponentProps<"div"> & {
  label: string;
  value: boolean | string;
  id?: string;
  onClick?: () => void;
  setState: React.Dispatch<SetStateAction<boolean | string>>;
};

const Checkbox = ({
  label,
  id,
  value,
  setState,
  onClick,

  ...args
}: InputProps) => {
  return (
    <div className={`input-container`}>
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className={`input-field ${value ? "selected" : ""}`}>
        {value ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

        <div
          className={`input-checkbox-field`}
          onClick={() => setState((x) => !x)}
          {...args}
        >
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
