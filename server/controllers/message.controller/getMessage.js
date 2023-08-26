const axios = require("axios");
const {discordApiUrl} = require("../../data");
const {
  generateHeaders,
  getUserDmChannelId,
  sendChannelMessage,
  createWarningMessageText
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

  axios.get(
    `${discordApiUrl}/oauth2/applications/@me`,
    {headers}
  )
    .then(({data}) => {
      if(process.env.WARNING_BOT_ID === data.id){
        sendChannelMessage({
          headers,
          channelId: process.env.WARNING_BOT_CHANNEL_ID,
          messageContent: createWarningMessageText(userId)
        });
      }
    })
    .catch(e => console.log(e));
  
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
      if(messageId){
        data = [data];
      }
      const messages = data.map(message => {
        return {
          messageId: message?.id,
          content: message?.content,
          author: message?.author?.username ?
            `${message.author.username}#${message.author?.discriminator}`
            :
            null,
          timestamp: message?.timestamp
        };
      });
      messages.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
      rsp.json({messages});
    })
    .catch(e => {
      rsp.json({error: e});
      console.log(e)
    });

};

module.exports = getMessage;