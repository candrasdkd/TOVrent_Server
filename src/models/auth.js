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
        // console.log("salt", resultSalt);
        if (err) return reject("genSalt error");
        bcrypt.hash(password, resultSalt, (err, resultHashPassword) => {
          // console.log("pw", resultHashPassword);
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
        // console.log(resultBody[0].dob)
        const userInfo = {
          userId: resultBody[0].id,
          userUsername: resultBody[0].username,
          userFullName: resultBody[0].full_name,
          userPhone: resultBody[0].phone_number,
          userEmail: resultBody[0].email,
          userGender: resultBody[0].gender,
          userAddress: resultBody[0].address,
          userImage: resultBody[0].picture,
          userDOB: resultBody[0].dob,
          userCardNumber: resultBody[0].card_number,
          authLevel: Number(resultBody[0].role_id),
        };
        const payload = {
          userFullName: resultBody[0].full_name,
          userId: resultBody[0].id,
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

module.exports = { login, register, logout };
