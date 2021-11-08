require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const corsApp = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const mainRouter = require("./src/routes/");
const { http } = require("npmlog");

const app = express();
const httpServer = createServer(app);
const cors = {
  origin: "*",
  // methods: "GET,PATCH,POST,DELETE",
  // origin: ["http://localhost:3000", "http://192.168.0.101:3000"],

};
const io = new Server(httpServer, {
  cors,
});
const port = process.env.PORT || 8000;

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(corsApp());

app.use(express.static("public"));
app.use(mainRouter);

io.on("connection", (socket) => {
  console.log("Socket Connected on", socket.id);
});

// Base url => http://localhost:8000
httpServer.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
const socketIoObject = io;

module.exports.ioObject = socketIoObject;