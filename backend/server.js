require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const multer = require('multer')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:  "*",
    methods: ["GET", "POST"],
  },
});
const corsOptions = {
  origin: "*",
  //origin: process.env.REACT_APP_CLIENT_URL || "*",
  methods: ["GET", "POST"],
};



app.use(cors(corsOptions));
app.use(express.json());



//****************io connection ******************
io.on("connection", (socket) => {
  console.log("io connected: ", socket.id);
  socket.emit("welcome", "welcome to the socket.io chat app");
  //****************assignment of rooms is automatic ************    but how ??
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("room joined:", socket.rooms);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on("message", (data) => {
    console.log("room in message", socket.rooms);
    socket.to(data.room).emit("recieved-message", data);
  });
});

mongoose
  .connect(
    process.env.MONGODB_URI 
  )
  .then(() => {
    console.log("connection to DB established");
    console.log(process.env.REACT_APP_CLIENT_URL);
    console.log(process.env.MONGODB_URI );
  })
  .catch((e) => {
    console.error(e);
  });

app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/protected", require("./routes/userauth"));
app.use("/chat", require("./routes/chat"));
app.use("/imageUpload", require("./routes/upload"));


httpServer.listen(4000, () => {
  console.log("Server connected");
});


/* require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

// Ensure REACT_APP_CLIENT_URL is defined in your .env file
const clientURL = process.env.REACT_APP_CLIENT_URL || "http://localhost:3000";

// Log the client URL to debug any issues
console.log("Client URL:", clientURL);

const io = new Server(httpServer, {
  cors: {
    origin: clientURL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const corsOptions = {
  origin: clientURL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("io connected: ", socket.id);
  socket.emit("welcome", "Welcome to the Socket.IO chat app");

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`Room joined: ${room}`, socket.rooms);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on("message", (data) => {
    console.log("Room in message", socket.rooms);
    socket.to(data.room).emit("received-message", data);
  });
});

// Ensure MONGODB_URI is defined in your .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to MongoDB established");
    console.log("Client URL:", process.env.REACT_APP_CLIENT_URL);
    console.log("MongoDB URI:", process.env.MONGODB_URI);
  })
  .catch((e) => {
    console.error("MongoDB connection error:", e);
  });

// Define your routes
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/protected", require("./routes/userauth"));
app.use("/chat", require("./routes/chat"));

// Start the server
httpServer.listen(4000, () => {
  console.log("Server running on port 4000");
}); */
