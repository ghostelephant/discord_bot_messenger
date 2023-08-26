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
    channelId,
    // messageId,
    messageContent
  } = req.body;

  const headers = generateHeaders(token);
  
  let debugError;
  if(!channelId && userId){
    const dmChannelData = await getUserDmChannelId({
      token,
      userId
    });
    channelId = dmChannelData.dmChannelId;
    debugError = dmChannelData?.error;
  }
  
  if(!channelId){
    return rsp.json({
      error: "User / channel not found",
      debug: debugError
    });
  }

  axios.post(
    `${discordApiUrl}/channels/${channelId}/messages`,
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