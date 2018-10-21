const { sendMessage } = require("../sender");
const { queryAndFilterDeputies } = require("../model");

const { FACEBOOK_VERIFY_TOKEN } = process.env;

async function parseMessage(item) {
  // Null protection
  if (!item.message) return;

  const sender = item.sender.id;
  const message = item.message.text;
  const message_id = item.message.mid;

  // Query data
  const resultArray = await queryAndFilterDeputies(message);
  if (resultArray.length < 1) {
    await sendMessage("No se encontraron diputados en ese circuito", sender);
  }

  // A list of names
  const names = resultArray
    .map(item => `=> ${item.nombre} - ${item.partido}`)
    .join("\n");
  const response = `Tus Diputados: \n${names}`;
  await sendMessage(response, sender, message_id);
}

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
    // If not a page, abort
    if (!(body.object === "page")) {
      console.log("Not a message");
      ctx.status = 404;
      return;
    }
    const messages = body.entry[0].messaging;

    for (const item of messages) {
      await parseMessage(item);
    }

    ctx.status = 200;
    ctx.body = "OK";
  }
};
