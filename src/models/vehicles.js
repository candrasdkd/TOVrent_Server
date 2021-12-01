const db = require("../database/db");

const createVehicle = (req) => {
  return new Promise((resolve, reject) => {
    const { body, files } = req;
    let picture = "";
    if (files.length > 1) {
      for (let i = 0; i < files.length; i++) {
        picture += `/images/${files[i].filename},`;
      }
    } else {
      {
        for (let i = 0; i < files.length; i++) {
          picture += `/images/${files[i].filename},`;
        }
      }
    }
    let input = {
      picture,
    };
    const inputWithoutPic = { ...body };
    const inputWithPic = { ...body, ...input };
    let newInput = {};
    if (!picture) {
      newInput = inputWithoutPic;
    } else {
      newInput = inputWithPic;
    }
    const queryString = "INSERT INTO tb_vehicles SET ?";
    db.query(queryString, newInput, (err, resultPost) => {
      console.log(resultPost);
      if (err) return reject(err);
      const id = resultPost.insertId;
      const getQuery = `SELECT v.id AS id, v.picture AS image, v.name AS name, v.price AS price, v.quantity AS quantity, v.type_id AS typeId, t.name AS type, v.city_id AS cityId, c.name AS city, v.address AS address, v.user_id AS ownerId, v.capacity AS capacity FROM tb_vehicles v JOIN tb_types t ON t.id = v.type_id JOIN tb_cities c ON c.id = v.city_id  WHERE v.id = ${id}`;
      db.query(getQuery, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  });
};

const updateVehicle = (req) => {
  const { body, params, files } = req;
  let id = params.id;
  let picture = "";
  if (files) {
    for (let i = 0; i < files.length; i++) {
      picture += `/images/${files[i].filename},`;
    }
  }
  let input = {
    picture,
  };
  const inputWithoutPic = { ...body };
  const inputWithPic = { ...body, ...input };
  let newInput = {};
  if (!picture) {
    newInput = inputWithoutPic;
  } else {
    newInput = inputWithPic;
  }
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE tb_vehicles SET ? WHERE id = ?";
    db.query(queryString, [newInput, id], (err) => {
      if (err) return reject(err);
      const getUserQuery =
        "SELECT v.id AS vehicleId, v.picture AS vehicleImage, v.name AS vehicleName, v.price AS vehiclePrice, v.quantity AS vehicleQuantity, t.name AS vehicleNameType, v.type_id AS vehicleTypeId, c.name AS vehicleCity, v.address AS vehicleAddress, v.user_id AS vehicleOwnerId,  v.city_id AS vehicleCityId, v.capacity AS vehicleCapacity FROM tb_vehicles v JOIN tb_types t ON t.id = v.type_id JOIN tb_cities c ON c.id = v.city_id WHERE v.id = ?";
      db.query(getUserQuery, id, (err, vehicleData) => {
        if (err) return reject(err);
        return resolve(vehicleData);
      });
    });
  });
};

const getVehicleById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT v.id AS id, v.picture AS image, v.name AS name, v.price AS price, v.quantity AS quantity, v.type_id AS typeId, t.name AS type, v.city_id AS cityId, c.name AS city, v.address AS address, v.user_id AS ownerId, u.full_name AS ownerName, v.capacity AS capacity FROM tb_vehicles v JOIN tb_types t ON t.id = v.type_id JOIN tb_users u ON u.id = v.user_id JOIN tb_cities c ON c.id = v.city_id  WHERE v.id = ?";
    db.query(queryString, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const getAllVehicle = (query) => {
  return new Promise((resolve, reject) => {
    const keyword = query?.keyword ? query.keyword : "";
    const filterByType = query?.type_id ? `=${query.type_id}` : "> 0";
    const location = query?.location ? query.location : "";
    const minPrice = query?.min_price ? query.min_price : 0;
    const maxPrice = query?.max_price ? query.max_price : 999999999;
    const orderBy = query.order_by ? query.order_by : "v.id";
    const sort = query.sort ? query.sort : "ASC";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 4;
    const offset = limit * (page - 1);
    const baseQuery = `SELECT v.id AS id, v.type_id AS modelId, v.picture AS picture, v.name AS name, v.price AS price, v.quantity AS quantity, t.name AS type, c.name AS city, v.capacity AS capacity FROM tb_vehicles v JOIN tb_types t ON t.id = v.type_id JOIN tb_cities c ON c.id = v.city_id WHERE v.name LIKE "%${keyword}%" AND v.type_id ${filterByType} AND c.name LIKE "%${location}%" AND v.price >= ${minPrice} AND v.price <= ${maxPrice} ORDER BY ${orderBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
    db.query(baseQuery, (err, resultGet) => {
      if (err) return reject(err);
      if (!resultGet.length) return reject(404);
      const countQs = `SELECT COUNT(v.id) AS totalData, v.picture AS picture, v.type_id AS modelId, v.name AS name, v.price AS price, v.quantity AS quantity, t.name AS type, c.name AS city, v.capacity AS capacity FROM tb_vehicles v JOIN tb_types t ON t.id = v.type_id JOIN tb_cities c ON c.id = v.city_id WHERE v.name LIKE "%${keyword}%" AND v.type_id ${filterByType} AND c.name LIKE "%${location}%" ORDER BY ${orderBy} ${sort}`;
      db.query(countQs, (err, resultCount) => {
        if (err) return reject(err);
        const totalData = resultCount[0].totalData;
        const totalPage = Math.ceil(totalData / limit);
        const baseURL = `/vehicles?`;
        let urlPrevPage = baseURL;
        let urlNextPage = baseURL;
        query.keyword &&
          ((urlPrevPage = urlPrevPage + `keyword=${keyword}&`),
          (urlNextPage = urlNextPage + `keyword=${keyword}&`));
        query.location &&
          ((urlPrevPage = urlPrevPage + `location=${location}&`),
          (urlNextPage = urlNextPage + `location=${location}&`));
        query.type_id &&
          ((urlPrevPage = urlPrevPage + `type_id${filterByType}&`),
          (urlNextPage = urlNextPage + `type_id${filterByType}&`));
        query.min_price &&
          ((urlPrevPage = urlPrevPage + `min_price=${minPrice}&`),
          (urlNextPage = urlNextPage + `min_price=${minPrice}&`));
        query.max_price &&
          ((urlPrevPage = urlPrevPage + `max_price=${maxPrice}&`),
          (urlNextPage = urlNextPage + `max_price=${maxPrice}&`));
        query.order_by &&
          ((urlPrevPage = urlPrevPage + `order_by=${orderBy}&`),
          (urlNextPage = urlNextPage + `order_by=${orderBy}&`));
        query.sort &&
          ((urlPrevPage = urlPrevPage + `sort=${sort}&`),
          (urlNextPage = urlNextPage + `sort=${sort}&`));
        const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
        const nextPage =
          page < totalPage ? urlNextPage + `page=${page + 1}` : null;
        return resolve({
          resultGet,
          totalData,
          totalPage,
          currentPage: page,
          prevPage,
          nextPage,
        });
      });
    });
  });
};

const getPopularVehicle = (query) => {
  return new Promise((resolve, reject) => {
    const orderBy = query.order_by ? query.order_by : "COUNT(h.vehicle_id)";
    const sort = query.sort ? query.sort : "DESC";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 4;
    const offset = limit * (page - 1);
    const queryString = `SELECT h.vehicle_id AS id, COUNT(h.vehicle_id) AS rating , v.type_id AS modelId, v.picture AS picture, v.name AS name, v.price AS price, v.quantity AS quantity, t.name AS type, c.name AS city, v.capacity AS capacity FROM tb_vehicles v JOIN tb_histories h ON h.vehicle_id = v.id JOIN tb_cities c ON c.id = v.city_id JOIN tb_types t ON t.id = v.type_id GROUP BY h.vehicle_id ORDER BY ${orderBy} ${sort} LIMIT ${limit} OFFSET ${offset}`;
    db.query(queryString, (err, result) => {
      if (err) return reject(err);
      const queryCountTotal = `SELECT h.vehicle_id AS id, COUNT(h.vehicle_id) AS rating, v.type_id AS modelId, v.picture AS picture, v.name AS name, v.price AS price, v.quantity AS quantity, t.name AS type, c.name AS city, v.capacity AS capacity FROM tb_vehicles v JOIN tb_histories h ON h.vehicle_id = v.id JOIN tb_cities c ON c.id = v.city_id JOIN tb_types t ON t.id = v.type_id GROUP BY h.vehicle_id ORDER BY ${orderBy} ${sort}`;
      db.query(queryCountTotal, (err, totalResult) => {
        if (err) return reject(err);
        const totalData = totalResult.length;
        const totalPage = Math.ceil(totalData / limit);
        const baseURL = `/vehicles/popular?`;
        let urlPrevPage = baseURL;
        let urlNextPage = baseURL;
        query.order_by &&
          ((urlPrevPage = urlPrevPage + `order_by=${orderBy}&`),
          (urlNextPage = urlNextPage + `order_by=${orderBy}&`));
        query.sort &&
          ((urlPrevPage = urlPrevPage + `sort=${sort}&`),
          (urlNextPage = urlNextPage + `sort=${sort}&`));
        const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
        const nextPage =
          page < totalPage ? urlNextPage + `page=${page + 1}` : null;
        return resolve({
          result,
          totalData,
          totalPage,
          currentPage: page,
          prevPage,
          nextPage,
        });
      });
    });
  });
};

const deleteVehicle = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM tb_vehicles WHERE ?";
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  getPopularVehicle,
};
