const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const getEmail = "SELECT email FROM tb_users WHERE email = ?";
    db.query(getEmail, email, (err, resultGetEmail) => {
      if (err) return reject(err);
      if (resultGetEmail.length) return reject("emailHandler");
      bcrypt.genSalt(10, (err, resultSalt) => {
        if (err) return reject("genSalt error");
        bcrypt.hash(password, resultSalt, (err, resultHashPassword) => {
          if (err) return reject("Hash password error");
          const userData = {
            ...body,
            password: resultHashPassword,
          };
          const postQuery = "INSERT INTO tb_users SET ?";
          db.query(postQuery, userData, (err) => {
            if (err) return reject(err);
            return resolve("User Registered");
          });
        });
      });
    });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const getQuery = `SELECT * FROM tb_users WHERE email = ?`;
    db.query(getQuery, email, (err, resultBody) => {
      if (err) return reject(err);
      if (!resultBody.length) return reject(404);
      bcrypt.compare(password, resultBody[0].password, (err, resultCompare) => {
        if (err) return reject("Compare password error");
        if (!resultCompare) return reject(404);
        const userInfo = {
          id: resultBody[0].id,
          username: resultBody[0].username,
          fullName: resultBody[0].full_name,
          phoneNumber: resultBody[0].phone_number,
          email: resultBody[0].email,
          gender: resultBody[0].gender,
          address: resultBody[0].address,
          image: resultBody[0].picture,
          DOB: resultBody[0].dob,
          cardNumber: resultBody[0].card_number,
          authLevel: Number(resultBody[0].role_id),
        };
        const payload = {
          id: resultBody[0].id,
          fullName: resultBody[0].full_name,
          authLevel: Number(resultBody[0].role_id),
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
            issuer: "TOVrent",
          },
          (err, token) => {
            if (err) return reject("JWT error");
            const postToken = `INSERT INTO active_token (token) VALUES ("${token}")`;
            db.query(postToken, (err) => {
              if (err) return reject(err);
              return resolve({ token, userInfo: userInfo });
            });
          }
        );
      });
    });
  });
};

const logout = (body) => {
  return new Promise((resolve, reject) => {
    const { token } = body;
    const queryDelete = `DELETE FROM active_token WHERE token = "?"`;
    db.query(queryDelete, token, (err, result) => {
      console.log(queryDelete);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const checkToken = (req) => {
  return new Promise((resolve, reject) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) return reject("Anda belum login!");
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        const queryDelete = `DELETE FROM active_token WHERE token = ?`;
        db.query(queryDelete, token, (err, result) => {
          if (err) return reject(err);
          else return reject("Token Expired, Silahkan Login Kembali");
        });
      } else {
        const query = `SELECT token FROM active_token WHERE token = ?`;
        db.query(query, token, (err, result) => {
          if (err) return reject(err);
          if (!result.length) return reject("Silahkan Login Kembali");
          return resolve("Token valid");
        });
      }
    });
  });
};

module.exports = { login, register, logout, checkToken };
