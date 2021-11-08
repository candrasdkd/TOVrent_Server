const chatRouter = require("express").Router();
const chatMiddleware = require("../middlewares/auth");
const chatHandler = require("../handlers/chat");

chatRouter.get(
  "/latest/:id",
  chatMiddleware.checkToken,
  chatHandler.getLatestChat
);
chatRouter.get("/", chatMiddleware.checkToken, chatHandler.getChat);
chatRouter.post("/", chatMiddleware.checkToken, chatHandler.postChat);

module.exports = chatRouter;
