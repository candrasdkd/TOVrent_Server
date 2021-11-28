const bcrypt = require("bcrypt");
const db = require("../database/db");
const nodemailer = require("nodemailer");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryGet = "SELECT * FROM tb_users WHERE id = ?";
    db.query(queryGet, id, (err, resultBody) => {
      if (err) return reject(err);
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
      return resolve(userInfo);
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
          const finalResult = {
            email: result[0].email,
          };
          return resolve(finalResult);
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
        "SELECT email, code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        const finalResult = {
          email: res[0].email,
          code: res[0].code,
        };
        return resolve(finalResult);
      });
    });
  });
};

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const checkCodeQuery = "SELECT email FROM tb_users WHERE email = ?";
    db.query(checkCodeQuery, email, (err, res) => {
      if (err) return reject(err);
      if (!res.length) return reject(404);
      const updatePassQuery = "UPDATE tb_users SET ? WHERE email = ?";
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject("Bcrypt hash password error");
        const newPassword = {
          password: hash,
        };
        db.query(updatePassQuery, [newPassword, email], (err) => {
          if (err) return reject(err);
          return resolve("Password has changed");
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
