const express = require("express");
const PORT = process.env.PORT || 4040;

const app = express();
app.use(express.json());

// Handle all POST requests
app.post("/*", async (req, res) => {
    res.send("Hello post");
});

// Handle all GET requests
app.get("/*", async (req, res) => {
    res.send("Hello get");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
