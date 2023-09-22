import imgLand1 from "../../assets/land/land_1.jpg";
import imgLand2 from "../../assets/land/land_2.jpg";

const Section4 = () => {
  return (
    <div className="grid-2 section">
      <div>
        <img className="land-image" src={imgLand1} alt="Codin" />
      </div>
      <div className="padding-md">
        Ao contrário da crença popular, o Lorem Ipsum não é simplesmente texto
        aleatório. Tem raízes numa peça.
      </div>
      <div className="padding-md">
        Richard, um professor de Latim no Colégio Hampden-Sydney, na Virgínia,
        procurou uma das palavras em Latim mais obscuras.
      </div>
      <div>
        <img className="land-image" src={imgLand2} alt="" />
      </div>
    </div>
  );
};

export default Section4;
