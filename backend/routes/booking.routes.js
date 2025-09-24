const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// POST - create booking
router.post("/", bookingController.createBooking);

// GET - fetch all bookings
router.get("/", bookingController.getBookings);

// PUT - update booking (admin only)
router.put("/:id", verifyToken, bookingController.updateBooking);

// DELETE - delete booking (admin only)
router.delete("/:id", verifyToken, bookingController.deleteBooking);

module.exports = router;
