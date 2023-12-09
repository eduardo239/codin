import Button from "../form/Button";

const Hero = () => {
  return (
    <div className="section">
      <p className="font-xxl">Even Better</p>
      <p className="center">
        Cansado de voar sem direção e ficar recebendo emails indesejados? 😳
        Junte-se a milhares de pessoas que mudaram suas vidas, de um jeito
        simples.
      </p>
      <div className="flex-center-center">
        {/* <Button>Cadastre-se - Grátis</Button>
        <Button variant="dark">Cadastre-se - Grátis</Button> */}
        <Button variant="secondary">Cadastre-se - Grátis</Button>
        {/* <Button variant="light">Cadastre-se - Grátis</Button>
        <Button>Cadastre-se - Grátis</Button> */}
      </div>
    </div>
  );
};

export default Hero;
