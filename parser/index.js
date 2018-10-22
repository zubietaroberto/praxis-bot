const { sendMessage } = require("../sender");
const { queryAndFilterDeputies } = require("../model");

const TRY_AGAIN_MESSAGE = `No se encontraron diputados en ese circuito.
  Inténtalo de vuelta.
  Por ejemplo, intenta "8-8"`;

async function parser(item) {
  // Null protection
  if (!item.message) return;

  const sender = item.sender.id;
  const message = item.message.text;
  const message_id = item.message.mid;

  // Query data
  const resultArray = await queryAndFilterDeputies(message);
  if (resultArray.length < 1) {
    await sendMessage(TRY_AGAIN_MESSAGE, sender);
    return;
  }

  // A list of names
  const names = resultArray
    .map(item => `=> ${item.nombre} - ${item.partido}`)
    .join("\n");
  const response = `Tus Diputados: \n${names}`;
  await sendMessage(response, sender, message_id);
}

module.exports = { parser }

