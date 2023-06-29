import dayjs from "dayjs";

const MessageDisplay = ({message, spaceStyle}) => {
  if(!message?.content) return (<></>);

  return (
    <div style = {spaceStyle}>
      <p>
        <span style = {{fontWeight: "bold"}}>
          {message.author}
        </span>
        <span style = {{fontSize: "0.9em"}}>
          &nbsp; &nbsp; at {dayjs(message.timestamp).format("h:mm:ss A [on] MMM D, YYYY")}
        </span>
      </p>
      <p>
        {message.content}
      </p>
    </div>
  );
};

export default MessageDisplay;