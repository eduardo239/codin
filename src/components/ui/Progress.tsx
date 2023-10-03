type IProgress = {
  value: number;
  title: string;
  icon?: React.ReactNode;
};

const Progress = ({ value, title, icon }: IProgress) => {
  return (
    <section className="progress-container">
      <div className="flex align-center gap-1 mb-2">
        {icon}
        <span>{title}</span>
      </div>
      {value ? (
        <progress className="progress" value={value} max="1" />
      ) : (
        <div>
          <span>Nenhuma informação encontrada.</span>
        </div>
      )}
    </section>
  );
};

export default Progress;
