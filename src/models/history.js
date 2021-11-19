// const mysql = require("../database/mysql");
const db = require("../database/db");

const createHistory = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO tb_histories SET ?";
    db.query(queryString, body, (err, resultPost) => {
      if (err) return reject(err);
      const id = resultPost.insertId;
      // o.full_name AS owner
      const getQuery = `SELECT h.id AS id, h.user_id AS customerId, h.owner_id AS ownerId, v.picture AS picture, v.name AS vehicleName, v.type_id AS vehicleType, h.quantity AS totalQuantity, h.location AS vehicleLocation, h.price AS totalPrice, u.full_name AS customer, u.email AS email, u.phone_number AS phoneNumber, h.booking_code AS bookingCode, h.days AS dayDuration, h.status_id AS orderStatus, h.method_payment AS paymentMethod, h.from_date AS startDate, h.to_date AS expiredDate FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_users o ON o.id = h.owner_id JOIN tb_vehicles v ON v.id = h.vehicle_id WHERE h.id = ${id}`;
      db.query(getQuery, (err, finalResult) => {
        if (err) return reject(err);
        return resolve(finalResult);
      });
    });
  });
};

const updateHistory = (body, id) => {
  return new Promise((resolve, reject) => {
    const updateQuery = "UPDATE tb_histories SET ? WHERE id = ?";
    db.query(updateQuery, [body, id], (err) => {
      if (err) return reject(err);
      const queryString =
        "SELECT h.id AS id, h.user_id AS customerId, h.owner_id AS ownerId, v.picture AS picture, v.name AS vehicleName, v.type_id AS vehicleType, h.quantity AS totalQuantity, h.location AS vehicleLocation, h.price AS totalPrice, u.full_name AS customer, u.email AS email, u.phone_number AS phoneNumber, h.booking_code AS bookingCode, h.days AS dayDuration, h.status_id AS orderStatus, h.method_payment AS paymentMethod, h.from_date AS startDate, h.to_date AS expiredDate FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_users o ON o.id = h.owner_id JOIN tb_vehicles v ON v.id = h.vehicle_id WHERE h.id = ?";
      db.query(queryString, id, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
};
const getHistoryById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT h.id AS id, h.user_id AS customerId, h.owner_id AS ownerId, v.picture AS picture, v.name AS vehicleName, v.type_id AS vehicleType, h.quantity AS totalQuantity, h.location AS vehicleLocation, h.price AS totalPrice, u.full_name AS customer, u.email AS email, u.phone_number AS phoneNumber, h.booking_code AS bookingCode, h.days AS dayDuration, h.status_id AS orderStatus, h.method_payment AS paymentMethod, h.from_date AS startDate, h.to_date AS expiredDate FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_users o ON o.id = h.owner_id JOIN tb_vehicles v ON v.id = h.vehicle_id WHERE h.id = ${id}`;
    db.query(queryString, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getHistoryByUser = (params) => {
  return new Promise((resolve, reject) => {
    const userId = params.id;
    const queryString = `SELECT h.id AS id, h.user_id AS customerId, h.owner_id AS ownerId, v.picture AS picture, v.name AS vehicleName, v.type_id AS vehicleType, h.quantity AS totalQuantity, h.location AS vehicleLocation, h.price AS totalPrice, u.full_name AS customer, u.email AS email, u.phone_number AS phoneNumber, h.booking_code AS bookingCode, h.days AS dayDuration, h.status_id AS orderStatus, h.method_payment AS paymentMethod, h.from_date AS startDate, h.to_date AS expiredDate FROM tb_histories h JOIN tb_users u ON u.id = h.user_id JOIN tb_users o ON o.id = h.owner_id JOIN tb_vehicles v ON v.id = h.vehicle_id WHERE h.user_id = ? OR h.owner_id = ?`;
    db.query(queryString, [userId, userId], (err, result) => {
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
  createHistory,
  updateHistory,
  getHistoryByUser,
  getHistoryById,
  deleteHistory,
};
