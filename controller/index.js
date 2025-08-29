// controller.js
const { handleMessage } = require("./lib/Telegram");

async function handler(req) {
  const body = req.body;
  if (body.message) {
    await handleMessage(body.message);
  }
  return { status: "ok" };
}

module.exports = { handler };
