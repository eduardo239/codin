import React, { useEffect } from "react";

const Timer = ({
  timer,
  setTimer,
}: {
  timer?: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    const tick = () => {
      setTimer((prevSeconds) => prevSeconds - 1);
    };

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>Timer:</p>
      <p>Tempo restante: {timer} segundos</p>
    </>
  );
};

export default Timer;
