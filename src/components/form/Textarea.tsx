import React, { SetStateAction } from "react";
import { MdSave } from "react-icons/md";

type InputProps = React.ComponentProps<"textarea"> & {
  label: string;
  value: string;
  type?: string;
  rows?: number | undefined;
  setState: React.Dispatch<SetStateAction<string>>;
};

const Textarea = ({
  type = "text",
  label,
  id,
  value,
  rows,
  setState,
  ...args
}: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>

      <textarea
        rows={rows ? rows : 10}
        className="textarea"
        id={id}
        value={value}
        onChange={({ currentTarget }) => setState(currentTarget.value)}
        {...args}
      />
    </div>
  );
};

export default Textarea;
