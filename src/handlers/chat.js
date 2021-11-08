const chatModel = require("../models/chat");
const responseHelper = require("../helpers/response");

const getChat = (req, res) => {
  const { query } = req;
  chatModel
    .getChatById(query)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, "Error", 404, "No chat");
      }
      responseHelper.error(res, "Error", 500, err);
    });
};

const postChat = (req, res) => {
  const { body } = req;
  chatModel
    .postChat(body, req)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

const getLatestChat = (req, res) => {
  const { params } = req;
  chatModel
    .getLatestChat(params)
    .then((data) => responseHelper.success(res, "Success", 200, data))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};

module.exports = { getChat, postChat, getLatestChat };
