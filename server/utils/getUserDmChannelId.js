const axios = require("axios");
const {discordApiUrl} = require("../data");
const generateHeaders = require("./generateHeaders");

const getUserDmChannelId = async ({
  token,
  userId
 }) => {
  const headers = generateHeaders(token);
  
  return axios.post(
    `${discordApiUrl}/users/@me/channels`,
    {recipient_id: userId},
    {headers}
  )
    .then(({data}) => ({
      dmChannelId: data?.id
    }))
    .catch(e => {
      console.log(e.message);
      return {
        dmChannelId: null,
        error: e
      };
    });
};

module.exports = getUserDmChannelId;