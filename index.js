//to run the .env
require("dotenv").config();
const MY_TOKEN = process.env.MY_TOKEN;
const method = process.env.method;

//main working code
const express = require("express");
const PORT = process.env.PORT || 4040;

const app = express();
app.use(express.json());

app.post("*", async (req, res) => {
    console.log(req.body);
    res.send("Hello post");
});

app.get("*", async (req, res) => {
    res.send("Hello get");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


`https://api.telegram.org/bot${MY_TOKEN}/${method}`;