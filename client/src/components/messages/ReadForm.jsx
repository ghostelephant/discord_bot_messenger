import axios from "axios";
import {useState} from "react";

const ReadForm = ({serverUrl, setMessages, spaceStyle}) => {
  const blankInputs = {
    token: "",
    userId: "",
    messageId: ""
  };

  const [inputs, setInputs] = useState(blankInputs);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    axios.post(
      `${serverUrl}/api/messages/read`,
      inputs
    )
      .then(rsp => {
        setMessages(rsp?.data?.messages)
        setInputs(blankInputs);
      })
      .catch(e => console.error(e));
  };

  return (
    <form
      onSubmit = {handleSubmit}
    >
      <div style = {spaceStyle}>
        <p>
          <label htmlFor = "token">
            Discord Bot Token:
          </label>
        </p>
        <p>
          <input
            type = "text"
            name = "token"
            value = {inputs.token}
            onChange = {handleChange}
          />
        </p>
      </div>

      <div style = {spaceStyle}>
        <p>
          <label htmlFor = "userId">
            Discord User ID:
          </label>
        </p>
        <p>
          <input
            type = "text"
            name = "userId"
            value = {inputs.userId}
            onChange = {handleChange}
          />
        </p>
      </div>

      <div style = {spaceStyle}>
        <p>
          <label htmlFor = "messageId">
            Message ID<br />
            (optional -- if not included, will pull the most recent 50 messages)
          </label>
        </p>
        <p>
          <input
            type = "text"
            name = "messageId"
            value = {inputs.messageId}
            onChange = {handleChange}
          />
        </p>
      </div>

      <button
        type = "submit"
        style = {spaceStyle}
      >
        Submit
      </button>
    </form>
  );
};

export default ReadForm;