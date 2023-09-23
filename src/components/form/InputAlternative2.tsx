import React, { SetStateAction } from "react";
import { TAlternative } from "../../pages/AddChallenge";

type IRadioAlternative = React.ComponentProps<"input"> & {
  name: string;
  index: number;
  value: string | number;
  textValue: string;
  selectedOption: string | number;
  setState: React.Dispatch<SetStateAction<string>>;
  setTextState: React.Dispatch<SetStateAction<TAlternative>>;
  alternatives: TAlternative[];
};

const AddAlternative2 = ({
  name,
  index,
  value,
  selectedOption,
  setState,
  textValue,
  setTextState,
  alternatives,
}: IRadioAlternative) => {
  return (
    <div className="input-container">
      <div className="input-field">
        <div>
          <label className="flex align-center">
            [ {index} ]{" "}
            <input
              type="radio"
              name={name}
              value={value}
              checked={value === selectedOption}
              onChange={(e) => setState(e.currentTarget.value)}
            />{" "}
            |
          </label>
        </div>

        <div className="flex-1">
          <input
            placeholder="As alternativas ficam aqui ..."
            type="text"
            className="input"
            value={textValue}
            onChange={(e) => setTextState((r) => e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAlternative2;
