// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();
const upload = require("../middlewares/upload");
const vehicleHandler = require("../handlers/vehicles");
const authMiddleware = require("../middlewares/auth");
const fileValidation = require("../middlewares/uploadValidation");

// localhost:8000/vehicles
vehiclesRouter.get("/", vehicleHandler.getAllVehicles);
vehiclesRouter.get(
  "/popular",
  vehicleHandler.popularVehicles
);
vehiclesRouter.get("/:id", vehicleHandler.getVehiclesById);
vehiclesRouter.post(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.addNewVehicles
);

vehiclesRouter.delete(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  vehicleHandler.deleteVehicles
);

vehiclesRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.patchByID
);



module.exports = vehiclesRouter;
