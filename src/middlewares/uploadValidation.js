const responseHelper = require("../helpers/response");

const fileValidation = (req, res, next) => {
  if (req.fileValidationError) {
    return responseHelper.error(res, 400, req.fileValidationError);
  }
  next();
};

module.exports = fileValidation;