import { MdInfo, MdOutline10K, MdOutlineClose } from "react-icons/md";
import { useData } from "../../context/DataContext";

const Message = () => {
  const { message, setMessage } = useData();

  if (message)
    return (
      <div
        className={`message-container ${
          message.type === "success"
            ? "message-success "
            : message.type === "info"
            ? "message-info"
            : message.type === "error"
            ? "message-error"
            : message.type === "warning"
            ? "message-warning"
            : ""
        }`}
      >
        <MdInfo />

        <div>
          <p>{message.message}</p>
        </div>

        <MdOutlineClose
          className="button-hover"
          onClick={() => setMessage(null)}
        />
      </div>
    );
  else return null;
};

export default Message;
