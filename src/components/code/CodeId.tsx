const CodeId = ({ id }: { id: string }) => {
  return (
    <div>
      <small>
        <code style={{ opacity: "0.4" }}> Challenge ID: {id}</code>
      </small>
    </div>
  );
};

export default CodeId;
