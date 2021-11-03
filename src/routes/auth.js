const authRouter = require("express").Router();
const authHandler = require("../handlers/auth");

authRouter.post("/login", authHandler.login);
authRouter.post("/register", authHandler.register);
authRouter.delete("/logout", authHandler.logout);

module.exports = authRouter;