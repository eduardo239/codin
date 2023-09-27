import { languageList } from "../../helpers/constants";
import Button from "../form/Button";

const LanguageList = ({
  setLanguage,
}: {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-1">
      {languageList.map((item) => (
        <Button key={item.id} small onClick={() => setLanguage(item.name)}>
          {item.name ? item.name : "Todos"}
        </Button>
      ))}
    </div>
  );
};

export default LanguageList;
