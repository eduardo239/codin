import React, { SetStateAction } from "react";

type IRadioAlternative = React.ComponentProps<"input"> & {
  name: string;
  index: number;
  value: string;
  textValue: string;
  selectedOption: string;
  setState: React.Dispatch<SetStateAction<string>>;
};

const AddAlternative = ({
  id,
  name,
  index,
  value,
  selectedOption,
  setState,
  textValue,
}: IRadioAlternative) => {
  return (
    <div className="input-container">
      <div className="input-field">
        [ {index} ]{" "}
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={value === selectedOption}
          onChange={(e) => setState(e.currentTarget.value)}
        />{" "}
        <label className="input-field-radio-label" htmlFor={id}>
          {textValue}
        </label>
      </div>
    </div>
  );
};

export default AddAlternative;
