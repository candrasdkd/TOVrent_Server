const socket = require("../../index");
const db = require("../database/db");

const getChatById = (query) => {
  return new Promise((resolve, reject) => {
    const sender = query.sender_id;
    const receiver = query.receiver_id;
    const queryString =
      "SELECT * FROM tb_message WHERE user_id= ? AND owner_id = ? ORDER BY id ASC";
    db.query(queryString, [sender, receiver], (err, result) => {
      if (err) return reject(err);
      if (!result[0]) return reject(404);
      return resolve(result);
    });
  });
};

// const postChat = (body) => {
//   return new Promise((resolve, reject) => {
//     // console.log(body, query);
//     const queryString = "INSERT INTO tb_message SET ?";
//     // console.log('test',err, body)
//     db.query(queryString, body, (err, result) => {
//       console.log(result, body);
//       if (err) return reject(err);
//       const queryGetUserName = `SELECT username FROM tb_users WHERE id = ?`;
//       db.query(queryGetUserName, sender, (err, userName) => {
//         const senderName = userName[0].name;
//         socket.ioObject.emit(receiver, {
//           message: body.message,
//           senderName,
//         });
//         return resolve("Chat Sent to db");
//       });
//       return resolve(result.insertId);
//     });
//   });
// };
const postChat = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO tb_message SET ?`;
    db.query(queryString, body, (err, result) => {
      console.log(result);
      if (err) return reject(err);
      socket.ioObject.emit("message", {
        message: body.message,
      });
      return resolve("Chat Sent to db");
    });
  });
};

const getLatestChat = (params) => {
  // return new Promise((resolve, reject) => {
  //   const userId = params.id;
  //   const queryString =
  //     "SELECT c.id , c.user_id_sender, c.user_id_receiver, us.name AS sender_name , ur.name AS receiver_name, us.profile_picture AS sender_profile_picture, ur.profile_picture AS receiver_profile_picture, c.message FROM chat c JOIN users us ON c.user_id_sender = us.id JOIN users ur ON c.user_id_receiver = ur.id WHERE (c.user_id_sender = ? OR c.user_id_receiver = ?) AND c.isLatest = 1";
  //   db.query(queryString, [userId, userId], (err, result) => {
  //     if (err) return reject(err);
  //     return resolve(result);
  //   });
  // });
};

module.exports = { getChatById, postChat, getLatestChat };
