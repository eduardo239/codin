import { MdOutlineLanguage } from "react-icons/md";
import { TLanguageList } from "../../helpers/type";

const Select = ({
  list,
  setItem,
}: {
  list: TLanguageList[];
  setItem: React.Dispatch<React.SetStateAction<string | number>>;
}) => {
  return (
    <div className="input-container">
      <label>Linguagem</label>
      <div className="input-field">
        <MdOutlineLanguage />
        <select
          id="add-challenge-language"
          onChange={(e) => setItem(e.target.value)}
        >
          {list.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
