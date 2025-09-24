const db = require("../database/db");

// Get all testimonials
const getAllTestimonials = (callback) => {
  const query = "SELECT * FROM testimonials ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Create testimonial
const createTestimonial = (data, callback) => {
  const query = "INSERT INTO testimonials (author, text) VALUES (?, ?)";
  db.query(query, [data.author, data.text], (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id: result.insertId, ...data });
  });
};

// Update testimonial
const updateTestimonial = (id, data, callback) => {
  const query = "UPDATE testimonials SET author = ?, text = ? WHERE id = ?";
  db.query(query, [data.author, data.text, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result); // result.affectedRows used to check if any row updated
  });
};

// Delete testimonial
const deleteTestimonial = (id, callback) => {
  const query = "DELETE FROM testimonials WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result); // result.affectedRows used to check if row deleted
  });
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
