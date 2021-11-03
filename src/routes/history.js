// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const historyHandler = require("../handlers/history");

historyRouter.get("/:id", authMiddleware.checkToken, historyHandler.getHistoryById); 
historyRouter.post(
  "/",
  authMiddleware.checkToken,
  historyHandler.postNewHistory
);
historyRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  historyHandler.patchHistory
);
historyRouter.delete("/", historyHandler.deleteHistory);

module.exports = historyRouter;