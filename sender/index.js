const axios = require("axios");
const { FACEBOOK_API_KEY } = process.env;
const ENDPOINT = `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_API_KEY}`;

async function sendMessage(message, psid) {
  return axios.post(ENDPOINT, {
    messaging_type: "RESPONSE",
    recipient: {
      id: psid
    },
    message: {
      text: message
    }
  });
}

module.exports = {
  sendMessage
};
