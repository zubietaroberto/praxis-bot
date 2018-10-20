const { sendMessage } = require("../sender");

const { FACEBOOK_VERIFY_TOKEN } = process.env;

module.exports = async ctx => {
  // Parse the query params
  const mode = ctx.query["hub.mode"];
  const token = ctx.query["hub.verify_token"];
  const challenge = ctx.query["hub.challenge"];

  // Facebook Webhook verification
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === FACEBOOK_VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      ctx.body = challenge;
      ctx.status = 200;
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      ctx.status = 403;
    }
  } else {
    // Message Received
    const body = ctx.request.body;
    const messages = body.entry[0].messaging;

    for (const item of messages) {
      const sender = item.sender.id;
      const message = item.message.text;
      const message_id = item.message.mid;

      const response = `Your Message: ${message}`;
      await sendMessage(response, sender, message_id);
    }
  }
};

/*
{
  "object":"page",
  "entry":[
    {
      "id":"<PAGE_ID>",
      "time":1458692752478,
      "messaging":[
        {
          "sender":{
            "id":"<PSID>"
          },
          "recipient":{
            "id":"<PAGE_ID>"
          },

          ...
        }
      ]
    }
  ]
}
*/
