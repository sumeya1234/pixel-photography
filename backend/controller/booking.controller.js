const Booking = require("../models/booking.model");
const sendEmail = require("../utils/mailer");

// Create new booking
const createBooking = async (req, res) => {
  const { name, email, sessionDate, startTime, endTime, serviceId } = req.body;

  if (!name || !email || !sessionDate || !startTime || !endTime || !serviceId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Booking.createBooking(req.body, async (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Send confirmation email
    try {
      await sendEmail(
        email,
        "Booking Confirmation - Pixel Photography",
        `Dear ${name},

We are pleased to confirm your photography session. Please find the details below:

📅 Date: ${new Date(sessionDate).toLocaleDateString()}
🕒 Time: ${startTime} - ${endTime}
🔖 Service ID: ${serviceId}

If you have any questions or would like to make changes, please contact us at pixelphotography63@gmail.com.

Thank you for choosing Pixel Photography. We look forward to capturing your moments.

Best regards,
Pixel Photography Team`
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        message: "Booking created but email failed to send",
        booking: result,
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking: result,
    });
  });
};

// Get all bookings
const getBookings = (req, res) => {
  Booking.getBookings((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching bookings" });
    }
    res.json(results);
  });
};

// Update booking
const updateBooking = (req, res) => {
  const { id } = req.params;

  Booking.updateBooking(id, req.body, async (err, result) => {
    if (err) {
      console.error("Error updating booking:", err);
      return res.status(500).json({ message: "Error updating booking: " + err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Send update notification email
    try {
      const { name, email, sessionDate, startTime, endTime } = req.body;

      await sendEmail(
        email,
        "Booking Update Confirmation - Pixel Photography",
        `Dear ${name},

Your booking has been successfully updated. Please find the revised details below:

📅 Date: ${new Date(sessionDate).toLocaleDateString()}
🕒 Time: ${startTime} - ${endTime}

If this update does not match your request, or if you need further assistance, please contact us at pixelphotography63@gmail.com.

Best regards,
Pixel Photography Team`
      );
    } catch (emailError) {
      console.error("Error sending update email:", emailError.message);
    }

    res.json({ message: "Booking updated successfully and customer notified" });
  });
};

// Delete booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  // Get booking details first
  Booking.getBookingById(id, async (err, booking) => {
    if (err) {
      console.error("Error getting booking:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking
    Booking.deleteBooking(id, async (deleteErr, result) => {
      if (deleteErr) {
        console.error("Error deleting booking:", deleteErr);
        return res.status(500).json({ message: "Error deleting booking" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Send cancellation email
      try {
        await sendEmail(
          booking.email,
          "Booking Cancellation - Pixel Photography",
          `Dear ${booking.name},

We regret to inform you that your photography session has been cancelled. The cancelled session details are:

📅 Date: ${new Date(booking.sessionDate).toLocaleDateString()}
🕒 Time: ${booking.startTime} - ${booking.endTime}

If this cancellation was made in error or if you would like to reschedule, please contact us at pixelphotography63@gmail.com.

We apologize for any inconvenience caused and hope to assist you soon.

Best regards,
Pixel Photography Team`
        );
      } catch (emailError) {
        console.error("Error sending cancellation email:", emailError);
      }

      res.json({ message: "Booking cancelled and customer notified" });
    });
  });
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
