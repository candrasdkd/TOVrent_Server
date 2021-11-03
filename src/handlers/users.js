const userModel = require("../models/users");
const responseHelper = require("../helpers/response");

const getUserById = (req, res) => {
  const { params } = req;
  userModel
    .getUserById(params.id)
    .then((result) =>
      responseHelper.success(res, "Get data success", 200, result)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const editUser = (req, res) => {
  const { file, params, body } = req;
  userModel
    .editUser(file, params.id, body)
    .then((result) =>
      responseHelper.success(res, "Update user success", 200, result)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) =>
      responseHelper.success(res, "Update password success", 200, result)
    )
    .catch((err) => {
      if (err === 404)
        responseHelper.error(res, "Not Found!", 404, "Old Password Wrong");
      else responseHelper.error(res, "Error", 500, err);
    });
};

const forgotPassword = (req, res) => {
  const { body } = req;
  userModel
    .forgotPassword(body)
    .then((result) => responseHelper.success(res, "Success", 201, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(
          res,
          "Not Found!",
          404,
          "E-mail not registered"
        );
      }
      return responseHelper.error(res, "Error", 500, err);
    });
};

const checkForgotPassword = (req, res) => {
  const { body } = req;
  userModel
    .checkForgotCode(body)
    .then((result) => responseHelper.success(res, "Success", 200, result))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, "err", 404, "Code is invalid");
      }
      return responseHelper.error(res, "Error", 500, err);
    });
};

const changePassword = (req, res) => {
  const { body } = req;
  userModel
    .changePassword(body)
    .then((result) =>
      responseHelper.success(res, "Password Has Been Changed!", 200, result)
    )
    .catch((err) => {
      responseHelper.error(res, "Error", 500, err);
    });
};

const getUser = (req, res) => {
  const { query } = req;
  userModel
    .getUser(query)
    .then(
      ({ result, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data: result,
          totalData,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, "Get data success", 200, info);
      }
    )
    .catch((err) => {
      if (err === 404)
        responseHelper.error(res, "Not Found!", 404, "Please Input Valid Data");
      else responseHelper.error(res, "Error", 500, err);
    });
};

module.exports = {
  getUserById,
  editUser,
  updatePassword,
  forgotPassword,
  checkForgotPassword,
  changePassword,
  getUser,
};
