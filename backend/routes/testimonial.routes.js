const express = require("express");
const router = express.Router();
const testimonialController = require("../controller/testimonial.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Public route
router.get("/", testimonialController.getTestimonials);

// Admin-only routes
router.post("/", verifyToken, testimonialController.createTestimonial);
router.put("/:id", verifyToken, testimonialController.updateTestimonial);
router.delete("/:id", verifyToken, testimonialController.deleteTestimonial);

module.exports = router;
