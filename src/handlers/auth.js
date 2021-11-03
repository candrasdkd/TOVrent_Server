const responseHelper = require("../helpers/response");
const authModel = require("../models/auth");

const register = (req, res) => {
  const { body } = req;
  authModel
    .register(body)
    .then((result) =>
      responseHelper.success(res, "Success Registered", 201, result)
    )
    .catch((err) => {
      if (err === "emailHandler")
        return responseHelper.error(
          res,
          "E-mail already registered",
          409,
          "Indicates that the request could not be processed because of conflict in the current state of the resource"
        );
      else return responseHelper.error(res, "Error", 500, err);
    });
};

const login = (req, res) => {
  const { body } = req;
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, "Success Login", 200, result))
    .catch((err) => {
      if (err === 401)
        responseHelper.error(
          res,
          "Invalid Email or Password",
          401,
          "check your valid data"
        );
      else responseHelper.error(res, "Error", 500, err);
    });
};

const logout = (req, res) => {
  const { body } = req;
  authModel
    .logout(body)
    .then((result) =>
      responseHelper.success(res, "Success Logout", 200, result)
    )
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

module.exports = {
  login,
  register,
  logout,
};
