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
        "Booking Confirmation",
        `Hello ${name},\n\nYour booking for ${sessionDate} from ${startTime} to ${endTime} has been confirmed.\nService ID: ${serviceId}\n\nThank you!`
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
  console.log("=== UPDATE BOOKING FUNCTION CALLED ===");
  const { id } = req.params;
  console.log("Update booking request for ID:", id);
  console.log("Update data:", req.body);
  
  Booking.updateBooking(id, req.body, async (err, result) => {
    if (err) {
      console.error("Error updating booking:", err);
      return res.status(500).json({ message: "Error updating booking: " + err.message });
    }
    if (result.affectedRows === 0) {
      console.log("No booking found with ID:", id);
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Send update notification email
    try {
      const { name, email, sessionDate, startTime, endTime } = req.body;
      console.log("Preparing to send email to:", email);
      console.log("Email config check:", {
        EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Missing",
        EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Missing"
      });
      
      const emailResult = await sendEmail(
        email,
        "Booking Update Confirmation - Pixel Photography",
        `Dear ${name},\n\nYour photography session has been updated with the following details:\n\nDate: ${new Date(sessionDate).toLocaleDateString()}\nTime: ${startTime} - ${endTime}\n\nIf you have any questions, please contact us.\n\nBest regards,\nPixel Photography Team`
      );
      console.log("Email sent successfully:", emailResult.messageId);
    } catch (emailError) {
      console.error("Error sending update email:", emailError.message);
      console.error("Full email error:", emailError);
    }
    
    res.json({ message: "Booking updated successfully and customer notified" });
  });
};

// Delete booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  console.log("Delete booking request for ID:", id);
  
  // First get booking details for email
  Booking.getBookingById(id, async (err, booking) => {
    if (err) {
      console.error("Error getting booking:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (!booking) {
      console.log("Booking not found for ID:", id);
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Found booking:", booking);

    // Delete the booking
    Booking.deleteBooking(id, async (deleteErr, result) => {
      if (deleteErr) {
        console.error("Error deleting booking:", deleteErr);
        return res.status(500).json({ message: "Error deleting booking" });
      }
      if (result.affectedRows === 0) {
        console.log("No rows affected when deleting booking ID:", id);
        return res.status(404).json({ message: "Booking not found" });
      }

      console.log("Booking deleted successfully, sending email...");

      // Send cancellation email
      try {
        await sendEmail(
          booking.email,
          "Booking Cancellation - Pixel Photography",
          `Dear ${booking.name},\n\nWe regret to inform you that your photography session scheduled for ${booking.sessionDate} from ${booking.startTime} to ${booking.endTime} has been cancelled.\n\nIf you have any questions or would like to reschedule, please contact us.\n\nWe apologize for any inconvenience.\n\nBest regards,\nPixel Photography Team`
        );
        console.log("Cancellation email sent successfully");
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
