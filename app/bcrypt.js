const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  encryptPass: async (password) => {
    return new Promise((resolve, reject) => {
      try {
        const data = bcrypt.hash(password, 10);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  decryptPass: async (userpass, encrypted) => {
    return new Promise((resolve, reject) => {
      try {
        const data = bcrypt.compare(userpass, encrypted);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  verifyToken: async (token) => {
    return new Promise((resolve, reject) => {
      try {
        let decoded = jwt.verify(token, process.env.MY_PASS);
        resolve(decoded);
      } catch (ex) {
        res.end(JSON.stringify(ex.message, null, 5));
      }
    });
  },
  createToken: async (data) => {
    return (token = await jwt.sign(
      data,
      process.env.MY_PASS,
      {
        expiresIn: "30m",
      }
    ));
  },
};
