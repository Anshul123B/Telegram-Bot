// lib/Telegram.js
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/../.env" });

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.MY_TOKEN}`;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// function to call OpenAI
async function callOpenAI(userText) {
  try {
    const url = "https://api.openai.com/v1/chat/completions";
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }],
      max_tokens: 500
    };

    const resp = await axios.post(url, payload, {
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return resp.data.choices?.[0]?.message?.content ?? null;
  } catch (err) {
    console.error("callOpenAI error:", err?.response?.data || err.message || err);
    return null;
  }
}

// handles messages from Telegram
async function handleMessage(messageObj) {
  try {
    if (!messageObj || !messageObj.text) return;

    const chatId = messageObj.chat.id;
    const userText = messageObj.text;

    // call OpenAI
    const aiReply = await callOpenAI(userText);

    // send reply to Telegram
    if (aiReply) {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: aiReply
      });
    } else {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "Sorry, I couldn't generate a reply."
      });
    }
  } catch (err) {
    console.error("handleMessage error:", err?.response?.data || err.message || err);
    try {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: messageObj.chat.id,
        text: "Sorry, something went wrong."
      });
    } catch (_) {}
  }
}

module.exports = { handleMessage };
