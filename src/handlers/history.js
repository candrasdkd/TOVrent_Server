const historyModel = require("../models/history");
const responseHelper = require("../helpers/response");

const createHistory = (req, res) => {
  const { body } = req;
  historyModel
    .createHistory(body)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const updateHistory = (req, res) => {
  const { body, params } = req;
  historyModel
    .updateHistory(body, params.id)
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
  createHistory,
  updateHistory,
  getHistoryByUser,
  getHistoryById,
  deleteHistory,
};
