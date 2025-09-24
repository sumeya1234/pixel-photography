const db = require("../database/db");

// Create a new booking
const createBooking = (bookingData, callback) => {
  const { name, email, sessionDate, startTime, endTime } = bookingData;
  const customerNumber = 'CUST' + Date.now() + Math.floor(Math.random() * 1000);

  // Check for conflicting booking
  const conflictQuery = `
    SELECT * FROM bookings 
    WHERE sessionDate = ? 
    AND ((startTime < ? AND endTime > ?) OR (startTime < ? AND endTime > ?))
  `;

  db.query(
    conflictQuery,
    [sessionDate, endTime, startTime, endTime, startTime],
    (err, results) => {
      if (err) return callback(err, null);

      if (results.length > 0) {
        return callback(new Error("Time slot already reserved"), null);
      }

      // Insert new booking
      const query = `
        INSERT INTO bookings (customerNumber, name, email, sessionDate, startTime, endTime)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [customerNumber, name, email, sessionDate, startTime, endTime],
        (err, result) => {
          if (err) return callback(err, null);
          callback(null, { id: result.insertId, customerNumber, ...bookingData });
        }
      );
    }
  );
};

// Update booking
const updateBooking = (id, bookingData, callback) => {
  const { name, email, sessionDate, startTime, endTime } = bookingData;
  const query = `
    UPDATE bookings 
    SET name = ?, email = ?, sessionDate = ?, startTime = ?, endTime = ?
    WHERE id = ?
  `;
  db.query(query, [name, email, sessionDate, startTime, endTime, id], callback);
};

// Delete booking
const deleteBooking = (id, callback) => {
  const query = "DELETE FROM bookings WHERE id = ?";
  db.query(query, [id], callback);
};

// Get all bookings
const getBookings = (callback) => {
  db.query("SELECT * FROM bookings ORDER BY sessionDate DESC", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Get booking by ID
const getBookingById = (id, callback) => {
  db.query("SELECT * FROM bookings WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
