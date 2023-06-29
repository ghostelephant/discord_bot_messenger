import {useState} from "react";
import {ReadForm, MessageDisplay} from "../components/messages";

const Home = ({serverUrl}) => {
  const spaceStyle = {
    margin: "10px"
  };

  const [messages, setMessages] = useState([]);

  return (
    <>
      <h1 style = {{textAlign: "center"}}>
        Discord Bot Messenger
      </h1>

      <ReadForm
        serverUrl = {serverUrl}
        setMessages = {setMessages}
        spaceStyle = {spaceStyle}
      />

      {messages?.length ?
        <>
          <hr style = {spaceStyle} />
          <h2 style = {{textAlign: "center"}}>
            Messages:
          </h2>

          {messages.map(message =>
            <MessageDisplay
              key = {message.messageId}
              message = {message}
              spaceStyle = {spaceStyle}
            />
          )}
        </>
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

      <hr style = {spaceStyle} />
      <p style = {{textAlign: "center"}}>
        <a
          href = "https://github.com/ghostelephant/discord_bot_messenger"
          target = "_blank"
          rell = "noreferrer"
        >
          View source code on GitHub
        </a>
      </p>
    </>
  );
};

export default Home;