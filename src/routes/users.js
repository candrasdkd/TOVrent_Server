// const userRouter = require("express").Router()
// const userHandler = require("../handlers/users")
// const upload = require("../middlewares/upload");

// userRouter.patch("/:id", upload.uploadImage.single("image"), userHandler.editUser);
// userRouter.patch("/password/:id", userHandler.updatePassword);
// userRouter.delete("/:id", userHandler.deleteUser)

// module.exports = userRouter

// SUB-RUTE UNTUK USER
const userRouter = require("express").Router();
const upload = require("../middlewares/upload");
const userHandler = require("../handlers/users");
const authMiddleware = require("../middlewares/auth");
const validation = require("../middlewares/uploadValidation");

userRouter.get("/:id", authMiddleware.checkToken, userHandler.getUserById);
userRouter.patch(
  "/password/:id",
  authMiddleware.checkToken,
  userHandler.updatePassword
);
userRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  upload.uploadImage.single("picture"),
  validation,
  userHandler.editUser
);
userRouter.post("/forgot_password", userHandler.forgotPassword);
userRouter.post("/forgot_password/check-code", userHandler.checkForgotPassword);
userRouter.patch(
  "/forgot_password/change_password",
  userHandler.changePassword
);
module.exports = userRouter;
