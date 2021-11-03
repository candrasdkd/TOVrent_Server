const vehiclesModel = require("../models/vehicles");
const responseHelper = require("../helpers/response");

const addNewVehicles = (req, res) => {
  vehiclesModel
    .addNewVehicles(req)
    .then((data) =>
      responseHelper.success(res, "Create vehicle Success", 200, data)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getAllVehicles = (req, res) => {
  const { query} = req;
  vehiclesModel
    .getAllVehicles(query)
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
        responseHelper.success(res, "Get all Success", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};
const getVehiclesById = (req, res) => {
  const { params } = req;
  vehiclesModel
    .getVehiclesById(params.id)
    .then((data) =>
      responseHelper.success(res, "Get vehicle by id Success", 200, data)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getVehiclesByUser = (req, res) => {
  const { params } = req;
  vehiclesModel
    .getVehiclesByUser(params.id)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const deleteVehicles = (req, res) => {
  const { body } = req;
  vehiclesModel
    .deleteVehicles(body)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const patchByID = (req, res) => {
  vehiclesModel
    .patchByID(req)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const popularVehicles = (req, res) => {
  const { query } = req;
  vehiclesModel
    .popularVehicles(query)
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
        responseHelper.success(res, "Popular Success", 200, info);
      }
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

module.exports = {
  addNewVehicles,
  getAllVehicles,
  getVehiclesById,
  getVehiclesByUser,
  deleteVehicles,
  patchByID,
  popularVehicles,
};
