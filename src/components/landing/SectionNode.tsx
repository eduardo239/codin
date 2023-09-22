import { MdAccountCircle } from "react-icons/md";

const SectionNode = () => {
  return (
    <div className="node">
      <p>
        "...Holy sh*t this is fantastic…I'm really impressed so far. You all
        have built something special here."
      </p>
      <div className="node-card">
        <MdAccountCircle />
        <div className="">
          <b>Matthew (@Whale)</b>
          <p>Founder at Really Good Emails .com</p>
        </div>
      </div>
    </div>
  );
};

export default SectionNode;
