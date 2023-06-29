import {useState} from "react";
import {ReadForm, MessageDisplay} from "../components/messages";

const Home = ({serverUrl}) => {
  const spaceStyle = {
    margin: "10px"
  };

  const [messages, setMessages] = useState([]);

  return (
    <>
      <h1 style={{textAlign: "center"}}>
        Discord Bot Messenger
      </h1>

      <ReadForm
        serverUrl = {serverUrl}
        setMessages = {setMessages}
        spaceStyle = {spaceStyle}
      />

      <hr style = {spaceStyle} />

      {messages?.length ?
        messages.map(message =>
          <MessageDisplay
            key = {message.messageId}
            message = {message}
            spaceStyle = {spaceStyle}
          />
        )
        :
        <></>
      }

      {messages?.length ?
        <button
          onClick = {() => setMessages([])}
          style = {spaceStyle}
        >
          Clear messages
        </button>
        :
        <></>
      }
    </>
  );
};

export default Home;