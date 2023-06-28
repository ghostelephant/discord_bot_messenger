const axios = require("axios");
const {discordApiUrl} = require("../../data");

const getMessage = async (req, rsp) => {
  const {
    token,
    userId,
    messageId,
    count
  } = req.body;

  const headers = {
    Authorization: `Bot ${token}`
  };
  
  const dmChannelId = await axios.post(
    `${discordApiUrl}/users/@me/channels`,
    {recipient_id: userId},
    {headers}
  )
    .then(({data}) => data?.id);
  
  if(!dmChannelId){
    return rsp.json({error: "User not found"});
  }

  const messageUrl = `${discordApiUrl}/channels/${dmChannelId}/messages`
    + (messageId ? `/${messageId}` : "");

  axios.get(
    messageUrl,
    {headers}
  )
    .then(({data}) => rsp.json(data))
    .catch(e => console.log(e));

};

module.exports = getMessage;