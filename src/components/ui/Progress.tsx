type IProgress = {
  value: number;
  title: string;
};

const Progress = ({ value, title }: IProgress) => {
  return (
    <div className="progress-container">
      <p>{title}</p>
      {value ? (
        <progress className="progress" value={value} max="1" />
      ) : (
        <div>
          <span>Nenhuma informação encontrada.</span>
        </div>
      )}
    </div>
  );
};

export default Progress;
