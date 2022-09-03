import globalStyles from "../../globalStyles/globalCss.module.css";

interface MessageI {
  setTheMessage: () => void;
  messageText: String;
}

const Message = ({ setTheMessage, messageText }: MessageI) => {
  return (
    <div>
      <h4
        onClick={setTheMessage}
        className={`${
          messageText === "Proizvod uspješno uređen!"
            ? `${globalStyles.success}`
            : `${globalStyles.error}`
        }   `}
      >
        {messageText}
      </h4>
    </div>
  );
};

export default Message;
