import imgLand1 from "../../assets/land/land_1.jpg";
import imgLand2 from "../../assets/land/land_2.jpg";

const Section4 = () => {
  return (
    <div className="section">
      <div className="grid-2_r_1">
        <div>
          <img className="image radius" src={imgLand1} alt="Codin" />
        </div>
        <div className="flex-center-center">
          <p>
            Ao contrário da crença popular, o Lorem Ipsum não é simplesmente
            texto aleatório. Tem raízes numa peça.
          </p>
        </div>
        <div className="flex-center-center">
          <p className="right ">
            Richard, um professor de Latim no Colégio Hampden-Sydney, na
            Virgínia, procurou uma das palavras em Latim mais obscuras.
          </p>
        </div>
        <div>
          <img className="image radius" src={imgLand2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Section4;
