// const mysql = require("../database/mysql");
const db = require("../database/db");

const postNewHistory = (body) => {
  return new Promise((resolve, reject) => {
    // console.log(body, query);
    const queryString = "INSERT INTO tb_histories SET ?";
    // console.log('test',err, body)
    db.query(queryString, body, (err, result) => {
      console.log(result, body);
      if (err) return reject(err);
      return resolve(result.insertId);
    });
  });
};

const patchHistory = (body, id) => {
  return new Promise((resolve, reject) => {
    // console.log(body, query);
    const updateQuery = "UPDATE tb_histories SET ? WHERE id = ?";
    // console.log("test", body);
    db.query(updateQuery, [body, id], (err, result) => {
      // console.log("bnody", body);
      if (err) return reject(err);
      const queryString =
        "SELECT h.id AS historyId, h.price AS historyPrice, h.method_payment AS historyMethod, h.days AS historyDuration, h.location AS historyLocation ,h.status_id AS historyStatusId, h.quantity AS historyQuantity, h.from_date AS historyStartDate, h.to_date AS historyExpiredDate, u.full_name AS userName, u.phone_number AS userPhone,u.email AS userEmail, h.booking_code AS historyBookingCode, h.user_id AS historyUserId, h.owner_id AS historyOwnerId, v.picture AS vehicleImage, v.name AS vehicleName, s.user_status AS statusUser, s.owner_status AS statusOwner FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_vehicles v ON v.id = h.vehicle_id JOIN status_history s ON s.id = h.status_id WHERE h.id = ?";
      db.query(queryString, id, (err, result) => {
        // console.log("result", result);
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
};
const getHistoryById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT h.id AS historyId, h.price AS historyPrice, h.method_payment AS historyMethod, h.type AS historyVehicleType ,h.days AS historyDuration, h.location AS historyLocation ,h.status_id AS historyStatusId, h.quantity AS historyQuantity, h.from_date AS historyStartDate, h.to_date AS historyExpiredDate, u.full_name AS userName, u.phone_number AS userPhone,u.email AS userEmail, h.booking_code AS historyBookingCode, h.user_id AS historyUserId, h.owner_id AS historyOwnerId, v.picture AS vehicleImage, v.name AS vehicleName, s.user_status AS statusUser, s.owner_status AS statusOwner FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_vehicles v ON v.id = h.vehicle_id JOIN status_history s ON s.id = h.status_id WHERE h.id = ${id}`;
    db.query(queryString, (err, result) => {
      console.log("result", err);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getHistoryByUser = (params) => {
  return new Promise((resolve, reject) => {
    const userId = params.id;
    const queryString = `SELECT h.id AS historyId, h.price AS historyPrice, h.method_payment AS historyMethod, h.type AS historyVehicleType ,h.days AS historyDuration, h.location AS historyLocation ,h.status_id AS historyStatusId, h.quantity AS historyQuantity, h.from_date AS historyStartDate, h.to_date AS historyExpiredDate, u.full_name AS userName, u.phone_number AS userPhone,u.email AS userEmail, h.booking_code AS historyBookingCode, h.user_id AS historyUserId, h.owner_id AS historyOwnerId, v.picture AS vehicleImage, v.name AS vehicleName, s.user_status AS statusUser, s.owner_status AS statusOwner FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_vehicles v ON v.id = h.vehicle_id JOIN status_history s ON s.id = h.status_id WHERE h.user_id = ? OR h.owner_id = ?`;
    db.query(queryString, [userId, userId], (err, result) => {
      // console.log("result", result, queryString);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
const deleteHistory = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM tb_histories WHERE id = ?";
    db.query(queryString, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  postNewHistory,
  patchHistory,
  getHistoryByUser,
  getHistoryById,
  deleteHistory,
};
