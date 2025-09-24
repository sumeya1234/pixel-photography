// controller/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const JWT_SECRET = process.env.JWT_SECRET; 

exports.registerAdmin = (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });

    Admin.create(username, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Admin registered successfully" });
    });
  });
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(400).json({ message: "Invalid username or password" });

    const admin = results[0];
    bcrypt.compare(password, admin.password, (err, match) => {
      if (!match) return res.status(400).json({ message: "Invalid username or password" });

      const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: "Login successful", token });
    });
  });
};
