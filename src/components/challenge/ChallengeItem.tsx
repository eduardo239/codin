import { MdDelete } from "react-icons/md";
import Button from "../form/Button";
import { Link } from "react-router-dom";

type TChallengeItemProps = {
  id: string;
  title: string;
  language: string;
  handleRemoveChallenge: (id: string) => Promise<void>;
};

const ChallengeItem = ({
  id,
  title,
  language,
  handleRemoveChallenge,
}: TChallengeItemProps) => {
  return (
    <div className="question" key={id}>
      <Link to={`/challenge?id=${id}`}>
        <p>{title}</p>
      </Link>
      <div className="flex align-center gap-2">
        <span>{language}</span>
        <Button onClick={() => handleRemoveChallenge(id)}>
          <MdDelete />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeItem;
