const historyModel = require("../models/history");
const responseHelper = require("../helpers/response");

const postNewHistory = (req, res) => {
  const { body } = req;
  historyModel
    .postNewHistory(body)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const patchHistory = (req, res) => {
  const { body, params } = req;
  historyModel
    .patchHistory(body, params.id)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};
const getHistoryById = (req, res) => {
  const { params } = req;
  historyModel
    .getHistoryById(params.id)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};
const getHistoryByUser = (req, res) => {
  const { params } = req;
  historyModel
    .getHistoryByUser(params)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};
const deleteHistory = (req, res) => {
  const { params } = req;
  historyModel
    .deleteHistory(params.id)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

module.exports = {
  postNewHistory,
  patchHistory,
  getHistoryByUser,
  getHistoryById,
  deleteHistory,
};
