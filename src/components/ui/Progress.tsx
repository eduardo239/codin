import React from "react";

type IProgress = {
  value: number;
  title: string;
};

const Progress = ({ value, title }: IProgress) => {
  return (
    <div className="progress-container">
      <p>{title}</p>

      <progress className="progress" value={value} max="1" />
    </div>
  );
};

export default Progress;
