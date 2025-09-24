// models/admin.model.js
const db = require("../database/db");

const Admin = {
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM admin WHERE username = ?", [username], callback);
  },
  create: (username, hashedPassword, callback) => {
    db.query("INSERT INTO admin (username, password) VALUES (?, ?)", [username, hashedPassword], callback);
  }
};

module.exports = Admin;
