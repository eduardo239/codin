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
        <label>
          [ {index} ]{" "}
          <input
            type="radio"
            name={name}
            value={value}
            checked={value === selectedOption}
            onChange={(e) => setState(e.currentTarget.value)}
          />{" "}
        </label>

        <span>{textValue}</span>
      </div>
    </div>
  );
};

export default AddAlternative;
