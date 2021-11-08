// SUB-RUTE UNTUK TABEL HISTORY
const historyRouter = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const historyHandler = require("../handlers/history");

historyRouter.post(
  "/",
  authMiddleware.checkToken,
  historyHandler.postNewHistory
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
  historyHandler.patchHistory
);
historyRouter.delete("/:id", historyHandler.deleteHistory);

module.exports = historyRouter;
