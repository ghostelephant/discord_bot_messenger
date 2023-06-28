const axios = require("axios");
const {discordApiUrl} = require("../../data");
const {
  generateHeaders,
  getUserDmChannelId
} = require("../../utils");

const getMessage = async (req, rsp) => {
  const {
    token,
    userId,
    messageId,
    count
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

  const messageUrl = `${discordApiUrl}/channels/${dmChannelId}/messages`
    + (messageId ? `/${messageId}` : "");

  axios.get(
    messageUrl,
    {headers}
  )
    .then(({data}) => rsp.json(data))
    .catch(e => {
      rsp.json({error: e});
      console.log(e)
    });

};

module.exports = getMessage;