import React, { SetStateAction } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

type InputProps = React.ComponentProps<"div"> & {
  label: string;
  value: boolean;
  onClick?: () => void;
  setState: React.Dispatch<SetStateAction<boolean>>;
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
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field">
        {value ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

        <div onClick={() => setState((x) => !x)}>CheckBox</div>
      </div>
    </div>
  );
};

export default Checkbox;
