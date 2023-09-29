import { MdOutlineAccountBox } from "react-icons/md";

const SectionNode = ({
  text,
  username,
  occupation,
}: {
  text: string;
  username: string;
  occupation: string;
}) => {
  return (
    <div className="node">
      <p>{text}</p>
      <div className="node-card">
        <MdOutlineAccountBox />
        <div className="">
          <b>{username}</b>
          <p>{occupation}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionNode;
