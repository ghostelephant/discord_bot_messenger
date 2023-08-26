const createWarningMessageText = userId => {
  return `Heads up: someone just used the bot token to look up messages with the following user: <@${userId}>`;
};

module.exports = createWarningMessageText;