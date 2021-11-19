// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();
const upload = require("../middlewares/upload");
const vehicleHandler = require("../handlers/vehicles");
const authMiddleware = require("../middlewares/auth");
const fileValidation = require("../middlewares/uploadValidation");

// localhost:8000/vehicles
vehiclesRouter.get("/", vehicleHandler.getAllVehicle);
vehiclesRouter.get("/popular", vehicleHandler.getPopularVehicle);
vehiclesRouter.get("/:id", vehicleHandler.getVehicleById);
vehiclesRouter.post(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.createVehicle
);
vehiclesRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.updateVehicle
);
vehiclesRouter.delete(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  vehicleHandler.deleteVehicle
);

module.exports = vehiclesRouter;
