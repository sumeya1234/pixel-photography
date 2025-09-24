const db = require('../database/db');

// Get all services
exports.getAll = (callback) => {
  const sql = 'SELECT * FROM services';
  db.query(sql, callback);
};

// Get service by ID
exports.getById = (id, callback) => {
  const sql = 'SELECT * FROM services WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Create a new service
exports.create = (service, callback) => {
  const sql = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
  db.query(sql, [service.name, service.description, service.price], callback);
};

// Update a service
exports.update = (id, service, callback) => {
  const sql = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(sql, [service.name, service.description, service.price, id], callback);
};

// Delete a service
exports.delete = (id, callback) => {
  const sql = 'DELETE FROM services WHERE id = ?';
  db.query(sql, [id], callback);
};
