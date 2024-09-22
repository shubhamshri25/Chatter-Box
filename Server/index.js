require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello from chat-app backend"));
app.listen(port, () => console.log(`Listening on port ${port}!`));
