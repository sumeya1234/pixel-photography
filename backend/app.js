const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./database/db"); // just import db to connect

const bookingRoutes = require("./routes/booking.routes");
const serviceRoutes = require('./routes/service.routes');
const testimonialRoutes = require("./routes/testimonial.routes");
const photoRoutes = require('./routes/photo.routes');
const authRoutes = require("./routes/auth.routes");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/photos', photoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(" Photography Portfolio API is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
