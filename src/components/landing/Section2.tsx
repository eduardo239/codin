import SectionNode from "./SectionNode";

const Section2 = () => {
  return (
    <div className="section">
      <p className="font-x center">
        <b>Codin</b> is email marketing re-invented for the 2020s. It's
        multiplayer, lightweight and setup for best practices by default.
      </p>

      <div className="node-container">
        <SectionNode
          text="A vida e uma caixa preta nunca saberemos o seu real significado.⁠"
          username="Matthew (@Whale)"
          occupation="Ceo"
        />
        <SectionNode
          text="Faça a pessoa que você gosta se sentir especial ao invés de só mais uma."
          username="Louis (@L_cat)"
          occupation="Designer"
        />
      </div>
    </div>
  );
};

export default Section2;
