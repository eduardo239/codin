import React, { SetStateAction } from "react";

type IRadioAlternative = React.ComponentProps<"input"> & {
  name: string;
  index: number;
  value: string | number;
  textValue: string;
  selectedOption: string | number;
  setState: React.Dispatch<SetStateAction<string>>;
  setTextState: React.Dispatch<SetStateAction<string>>;
};

const AddAlternative = ({
  name,
  index,
  value,
  selectedOption,
  setState,
  textValue,
  setTextState,
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
        <input
          placeholder="Adicione as alternativas aqui ..."
          type="text"
          value={textValue}
          onChange={(e) => setTextState(() => e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddAlternative;
