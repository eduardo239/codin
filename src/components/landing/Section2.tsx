import SectionNode from "./SectionNode";

const Section2 = () => {
  return (
    <div className="section">
      <p className="font-xl center">
        <b>Codin</b> is email marketing re-invented for the 2020s. It's
        multiplayer, lightweight and setup for best practices by default.
      </p>

      <div className="node-container">
        <SectionNode />
        <SectionNode />
      </div>
    </div>
  );
};

export default Section2;
