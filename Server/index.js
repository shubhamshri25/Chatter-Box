require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDb = require("./connection");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: [process.env.ORIGIN || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));


app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./routes/auth-route");

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("Hello from chat-app backend"));

connectDb().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}!`));
});
