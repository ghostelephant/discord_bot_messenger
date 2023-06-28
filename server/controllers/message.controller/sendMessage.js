const axios = require("axios");
const {discordApiUrl} = require("../../data");
const {
  generateHeaders,
  getUserDmChannelId
} = require("../../utils");

const sendMessage = async (req, rsp) => {
  const {
    token,
    userId,
    messageId,
    messageContent
  } = req.body;

  const headers = generateHeaders(token);
  const dmChannelData = await getUserDmChannelId({
    token,
    userId
  });
  
  const {dmChannelId} = dmChannelData;
  if(!dmChannelId){
    return rsp.json({
      error: "User not found",
      debug: dmChannelData.error
    });
  }

  axios.post(
    `${discordApiUrl}/channels/${dmChannelId}/messages`,
    {content: messageContent},
    {headers}
  )
    .then(({data}) => rsp.json(data))
    .catch(e => {
      rsp.json({error: e});
      console.log(e.message)
    });

};

module.exports = sendMessage;