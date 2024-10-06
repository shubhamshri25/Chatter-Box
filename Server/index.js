require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const connectDb = require("./connection");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

//  Create HTTP server
const server = http.createServer(app);

//  Initialize Socket.IO and configure CORS
const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});
// Middleware for static files and parsing
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./routes/auth-route");
const contactRoutes = require("./routes/contact-route");

app.use("/api/auth", userRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => res.send("Hello from chat-app backend"));

connectDb().then(() => {
  server.listen(port, () => console.log(`Listening on port ${port}!`));
});

// function to disconnect the user
const disconnect = (socket) => {
  console.log(`Client disconnected: ${socket.id}`);
  for (const [userId, socketId] of userSocketMap.entries()) {
    if (socketId === socket.id) {
      userSocketMap.delete(userId);
      break;
    }
  }
};

const userSocketMap = new Map();

// Socket.IO event handling
io.on("connection ", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap.set(userId, socket.id);
    clg(`User connected: ${userId} with socketId : ${socket.id} `);
  } else {
    console.log("User Id not provided during connection");
  }

  socket.on("disconnect", () => disconnect(socket));
});
