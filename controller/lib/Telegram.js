const axios = require("axios");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.MY_TOKEN}`;

async function handleMessage(messageObj) {
  if (!messageObj || !messageObj.text) return;

  const chatId = messageObj.chat.id;
  const userMessage = messageObj.text;

  try {
    // Send user message to OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // You can change model if needed
      messages: [{ role: "user", content: userMessage }],
    });

    const botReply = completion.choices[0].message.content;

    // Send reply back to Telegram user
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: botReply,
    });

  } catch (error) {
    console.error("Error handling message:", error.message);

    // Send fallback error message
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Sorry, something went wrong. Try again!",
    });
  }
}

module.exports = { handleMessage };
