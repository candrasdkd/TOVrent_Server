const jwt = require("jsonwebtoken");
const responseHelper = require("../helpers/response");
const db = require("../database/db");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken)
    return responseHelper.error(res, "Unauthorized", 401, "Anda belum login!");
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      const queryDelete = `DELETE FROM active_token WHERE token = "${token}"`;
      db.query(queryDelete, (err) => {
        if (err) return responseHelper.error(res, "SQL Error", 500, err);
        else
          return responseHelper.error(
            res,
            "Forbidden",
            403,
            "Token Expired, Please Sign In Again"
          );
      });
    } else {
      const query = `SELECT token FROM active_token WHERE token = "${token}"`;
      db.query(query, (err, result) => {
        if (err) return responseHelper.error(res, "SQL Error", 500, err);
        if (!result.length)
          return responseHelper.error(
            res,
            "Unauthorized",
            401,
            "Please Sign In Again"
          );
        req.token = token;
        next();
      });
    }
  });
};

const authAdmin = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return responseHelper.error(res, "Unauthorized ", 401, err);
    req.payload = payload;
    if (payload.authLevel !== 1)
      return responseHelper.error(res, 403, "Anda tidak diizinkan!");
    next();
  });
};

const authSeller = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return responseHelper.error(res, "Unauthorized ", 401, err);
    req.payload = payload;
    if (payload.authLevel !== 1)
      if (payload.authLevel !== 2)
        return responseHelper.error(
          res,
          "Forbidden",
          403,
          "You are not allowed!"
        );
    next();
  });
};

const authUser = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return responseHelper.error(res, "Unauthorized ", 401, err);
    req.payload = payload;
    if (payload.authLevel !== 1)
      if (payload.authLevel !== 3)
        return responseHelper.error(
          res,
          "Forbidden",
          403,
          "You are not allowed!"
        );
    next();
  });
};
module.exports = { checkToken, authAdmin, authSeller, authUser };
