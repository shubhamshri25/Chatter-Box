require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDb = require("./connection");

app.use(express.json());

app.use(cors());


const userRoutes = require("./routes/user-route");

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("Hello from chat-app backend"));

connectDb().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}!`));
});
