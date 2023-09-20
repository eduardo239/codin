import React from "react";

const Progress = ({ value }: { value: number }) => {
  return (
    <>
      <h2>Respostas Corretas: 99.99%</h2>
      <div className="progress-container">
        <progress className="progress" value={value} max="1" />
      </div>
    </>
  );
};

export default Progress;
