const bcrypt = require("bcrypt");
const db = require("../database/db");
const nodemailer = require("nodemailer");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryGet = `SELECT id AS userId, username AS userUsernam, full_name AS userFullName, phone_number AS userPhone, email AS userEmail, gender AS userGender, address AS userAddress, picture AS userImage, dob AS userDOB, card_number AS userCardNumber, role_id AS authLevel FROM tb_users WHERE id = ?`;
    db.query(queryGet, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const editUser = (file, id, body) => {
  return new Promise((resolve, reject) => {
    const getFileQuery = "SELECT picture FROM tb_users WHERE id = ?";
    db.query(getFileQuery, id, (err, dbUrl) => {
      if (err) return reject(err);
      let input;
      if (file) {
        const imageUrl = `/images/${file.filename}`;
        input = {
          picture: imageUrl,
        };
      }
      if (!file) {
        input = {
          picture: dbUrl[0]?.picture,
        };
      }
      const newBody = { ...body, ...input };
      const updateQuery = "UPDATE tb_users SET ? WHERE id = ?";
      db.query(updateQuery, [newBody, id], (err) => {
        if (err) return reject(err);
        const getUserQuery = "SELECT * FROM tb_users WHERE id = ?";
        db.query(getUserQuery, id, (err, resultBody) => {
          if (err) return reject(err);
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
            }
          return resolve(userInfo);
        });
      });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPass, newPass } = body;
    const getPassQuery = "SELECT password FROM tb_users WHERE id = ?";
    db.query(getPassQuery, id, (err, res) => {
      if (err) return reject(err);
      bcrypt.compare(oldPass, res[0].password, (err, result) => {
        if (err) return reject("Bcrypt compare password error");
        if (!result) return reject(404);
        bcrypt.hash(newPass, 10, (err, hash) => {
          if (err) return reject("Bcrypt hash password error");
          const newPassword = {
            password: hash,
          };
          const updateQuery = "UPDATE tb_users SET ? WHERE id = ?";
          db.query(updateQuery, [newPassword, id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      });
    });
  });
};

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const getEmailQuery = "SELECT email FROM tb_users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const min = Math.ceil(111111);
      const max = Math.floor(999999);
      const code = Math.floor(Math.random() * (max - min) + min);
      const postCodeQuery =
        "INSERT INTO forgot_password (email, code) VALUES (? , ?)";
      db.query(postCodeQuery, [result[0].email, code], (err) => {
        if (err) return reject(err);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.PASSWORD_SENDER,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL_SENDER,
          to: email,
          subject: "Code Reset Password",
          text: `this code for reset your password ${code}`,
        };
        // send email
        transporter.sendMail(mailOptions, (err) => {
          if (err) return reject("node mailer error");
          return resolve("code sent to database and email");
        });
      });
    });
  });
};

const checkForgotCode = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email } = body;
    const getEmailQuery = "SELECT email FROM tb_users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const email = result[0].email;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        return resolve("Code is valid");
      });
    });
  });
};

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email, password } = body;
    const getEmailQuery = "SELECT email FROM tb_users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const email = result[0].email;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        const updatePassQuery = "UPDATE users SET ? WHERE email = ?";
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return reject("Bcrypt hash password error");
          const newPassword = {
            password: hash,
          };
          db.query(updatePassQuery, [newPassword, email], (err) => {
            if (err) return reject(err);
            return resolve("Password sudah diganti");
          });
        });
      });
    });
  });
};

module.exports = {
  getUserById,
  editUser,
  updatePassword,
  forgotPassword,
  checkForgotCode,
  changePassword,
};
