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
    .then(({data}) => {
      if(!Array.isArray(data)){
        data = [data];
      }
      const messages = data.map(message => ({
        messageId: message?.id,
        content: message?.content,
        author: message?.author?.username ?
          `${message.author.username}#${message.author?.discriminator}`
          :
          null,
        timestamp: message?.timestamp
      }));
      messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
      rsp.json({messages});
    })
    .catch(e => {
      rsp.json({error: e});
      console.log(e)
    });

};

module.exports = getMessage;