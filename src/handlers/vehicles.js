const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/response");

const createVehicle = (req, res) => {
  vehiclesModel
    .createVehicle(req)
    .then((data) =>
      responseHelper.success(res, "Create success", 200, data)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const updateVehicle = (req, res) => {
  vehiclesModel
    .updateVehicle(req)
    .then((data) => responseHelper.success(res, "Update success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getVehicleById = (req, res) => {
  const { params } = req;
  vehiclesModel
    .getVehicleById(params.id)
    .then((data) =>
      responseHelper.success(res, "Success", 200, data)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getAllVehicle = (req, res) => {
  const { query} = req;
  vehiclesModel
    .getAllVehicle(query)
    .then(
      ({ resultGet, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data: resultGet,
          totalData,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, "Success", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getPopularVehicle = (req, res) => {
  const { query } = req;
  vehiclesModel
    .getPopularVehicle(query)
    .then(
      ({ result, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data:result,
          totalData,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, "Success", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const deleteVehicle = (req, res) => {
  const { body } = req;
  vehiclesModel
    .deleteVehicle(body)
    .then((data) => responseHelper.success(res, "Delete successful", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  getPopularVehicle,
};
