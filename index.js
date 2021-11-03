require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mainRouter = require("./src/routes/index");
const cors = require("cors");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const port = process.env.SECRET_PORT;
const io = new Server(httpServer,  {
  cors: {
    origin: ["https://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }
});
// instalasi parser
app.use(express.urlencoded({ extended: false })); // memasang middleware parsing url-encoded
app.use(express.json()); // memasang middleware parsing raw json
app.use(logger("dev"));


app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization, x-access-token");
//   next();
// });
app.use(express.static("public"));

app.use(mainRouter);

// BASE URL => http://localhost:8000
// app.listen(port, () => console.log(`App started running at ${port}`));

// SOCKET IO
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room", (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
    });
    socket.on("send message", (data) => {
      socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", ()=> {
      console.log("User Disconnected", socket.id)
    })
  });
  // httpServer.listen(3000, () => {
  //   console.log("server on");
  // });
  httpServer.listen(port, () => console.log("server running on port:" + port));