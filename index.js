// index.js
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const { handler } = require("./controller");

const PORT = process.env.PORT || 4040;
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    console.log("Incoming update:", JSON.stringify(req.body).slice(0,1000));
    await handler(req);
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => res.send("Bot server running"));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
