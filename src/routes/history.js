// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const historyHandler = require("../handlers/history");

historyRouter.post(
  "/",
  authMiddleware.checkToken,
  historyHandler.createHistory
);
historyRouter.get(
  "/user/:id",
  authMiddleware.checkToken,
  historyHandler.getHistoryByUser
);
historyRouter.get(
  "/:id",
  authMiddleware.checkToken,
  historyHandler.getHistoryById
);

historyRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  historyHandler.updateHistory
);
historyRouter.delete("/:id", historyHandler.deleteHistory);

module.exports = historyRouter;
