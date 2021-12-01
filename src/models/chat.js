const socket = require("../../index");
const db = require("../database/db");

const getChatById = (query) => {
  return new Promise((resolve, reject) => {
    const sender = query.sender_id;
    const receiver = query.receiver_id;
    const queryString =
      "SELECT * FROM tb_message WHERE (user_id_sender = ? AND user_id_receiver = ?) OR (user_id_sender = ? AND user_id_receiver = ?) ORDER BY timestamp ASC";
    db.query(
      queryString,
      [sender, receiver, receiver, sender],
      (err, result) => {
        if (err) return reject(err);
        if (!result[0]) return reject(404);
        return resolve(result);
      }
    );
  });
};

const postChat = (body) => {
  return new Promise((resolve, reject) => {
    const senderId = body.user_id_sender;
    const receiverId = body.user_id_receiver;
    const getLatestChatId = `SELECT MAX(id) AS latest_id FROM tb_message WHERE (user_id_sender = ? or user_id_receiver = ?) AND (user_id_sender = ? or user_id_receiver = ?)`;
    db.query(
      getLatestChatId,
      [senderId, senderId, receiverId, receiverId],
      (err, result) => {
        const newBody = { ...body, ...{ isLatest: 1 } };
        if (err) return reject(err);
        const patchLatestChat = `UPDATE tb_message SET isLatest = 0 WHERE id = ?`;
        const latestId = result[0]?.latest_id;
        if (latestId) {
          db.query(patchLatestChat, result[0].latest_id, (err, result) => {
            if (err) return reject(err);
          });
        }
        const queryString = `INSERT INTO tb_message SET ?`;
        db.query(queryString, newBody, (err, result) => {
          if (err) return reject(err);
          const queryGetUserName = `SELECT full_name, uuid FROM tb_users WHERE id = ?`;
          db.query(queryGetUserName, senderId, (err, userName) => {
            const senderName = userName[0].full_name;
            socket.ioObject.emit(receiverId, {
              message: body.text,
              senderName,
            });
            return resolve("Chat Sent to db");
          });
        });
      }
    );
  });
};

const getLatestChat = (params) => {
  return new Promise((resolve, reject) => {
    const userId = params.id;
    const queryString =
      "SELECT c.id , c.user_id_sender, c.user_id_receiver, us.full_name AS sender_name , ur.full_name AS receiver_name, us.picture AS sender_profile_picture, ur.picture AS receiver_profile_picture, c.text FROM tb_message c JOIN tb_users us ON c.user_id_sender = us.id JOIN tb_users ur ON c.user_id_receiver = ur.id WHERE (c.user_id_sender = ? OR c.user_id_receiver = ?) AND c.isLatest = 1";
    db.query(queryString, [userId, userId], (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = { getChatById, postChat, getLatestChat };
