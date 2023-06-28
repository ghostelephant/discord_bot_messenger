const generateHeaders = token => {
  return {
    Authorization: `Bot ${token}`
  };
};

module.exports = generateHeaders;