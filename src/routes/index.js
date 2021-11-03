// ROUTER FILE UTAMA
const mainRouter = require("express").Router()
// atau bisa menggunakan => const router = express.Router();

// SUB-ROUTER

const pingRouter = require("./ping")
const vehicleRouter = require("./vehicles")
const historyRouter = require("./history")
const userRouter = require("./users")
const authRouter = require("./auth")

mainRouter.use("/", pingRouter)
mainRouter.use("/vehicles", vehicleRouter)
mainRouter.use("/history", historyRouter)
mainRouter.use("/users", userRouter)
mainRouter.use("/auth", authRouter)

module.exports = mainRouter