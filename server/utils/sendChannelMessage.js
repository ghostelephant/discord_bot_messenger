const axios = require("axios");
const {discordApiUrl} = require("../data");

const sendChannelMessage = async ({
  headers,
  channelId,
  messageContent
}) => {
  await axios.post(
    `${discordApiUrl}/channels/${channelId}/messages`,
    {content: messageContent},
    {headers}
  )
    .catch(e => console.log(e));
};

module.exports = sendChannelMessage;