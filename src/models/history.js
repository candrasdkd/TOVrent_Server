// const mysql = require("../database/mysql");
const db = require("../database/db");

const postNewHistory = (body) => {
  return new Promise((resolve, reject) => {
    // console.log(body, query);
    const queryString = "INSERT INTO tb_histories SET ?";
    // console.log('test',err, body)
    db.query(queryString, body, (err, result) => {
      // console.log(result.insertId);
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

// const getTransactions = (query) => {
//   return new Promise((resolve, reject) => {
//     let user_id = query?.user_id ? `= ${query.user_id} ` : ">= 0";
//     let ownerId = query?.owner_id ? `= ${query.owner_id}` : ">= 0";
//     let keyword = query?.keyword ? query.keyword : "";
//     let order_by = query?.order_by ? query.order_by : "t.id";
//     let sort = query?.sort ? query.sort : "ASC";
//     let filterByModel = query?.filter_by_model
//       ? `= ${query.filter_by_model}`
//       : ">= 0";
//     let filterByDate = query?.filter_date
//       ? String(query.filter_date)
//       : "0000-00-00";
//     const page = Number(query.page) || 1;
//     const limit = Number(query.limit) || 10;
//     const offset = limit * (page - 1);

//     let queryString = `SELECT t.id, u.id AS "renter_id", u.name AS "renter", v.owner AS "owner_id", v.model AS "model", v.id AS "model_id", t.prepayment, t.id_card, t.amount_rented, t.user_paid_status, t.seller_paid_status, t.booking_code, t.rent_start_date, t.rent_finish_date, t.returned_status, t.time_posted, v.picture FROM transactions t JOIN users u ON t.user_id = u.id JOIN vehicles v ON t.model_id = v.id WHERE user_id ${user_id} AND v.owner ${ownerId} AND v.model LIKE "%${keyword}%" AND v.type_id ${filterByModel} AND t.rent_start_date >= ? ORDER BY ${order_by} ${sort} LIMIT ${limit} OFFSET ${offset}`;

//     db.query(queryString, filterByDate, (error, result) => {
//       if (error) return reject(error);
//       if (!result.length) return reject(404);
//       return resolve({
//         data: result,
//         currentPage: page,
//         limit,
//       });
//     });
//   });
// };
const deleteHistory = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM tb_histories WHERE ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  postNewHistory,
  patchHistory,
  getHistoryById,
  deleteHistory,
};
