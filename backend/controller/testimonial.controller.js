const Testimonial = require("../models/testimonial.model");

// Get all testimonials (public)
const getTestimonials = (req, res) => {
  Testimonial.getAllTestimonials((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching testimonials" });
    res.json(results);
  });
};

// Create a testimonial (admin only)
const createTestimonial = (req, res) => {
  const { author, text } = req.body;

  // Validation
  if (!author || author.trim() === "") 
    return res.status(400).json({ message: "Author is required" });
  if (!text || text.trim() === "") 
    return res.status(400).json({ message: "Text is required" });

  Testimonial.createTestimonial({ author, text }, (err, result) => {
    if (err) return res.status(500).json({ message: "Error creating testimonial" });
    res.status(201).json({ message: "Testimonial created successfully", testimonial: result });
  });
};

// Update a testimonial (admin only)
const updateTestimonial = (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;

  // Validation
  if (!author || author.trim() === "") 
    return res.status(400).json({ message: "Author is required" });
  if (!text || text.trim() === "") 
    return res.status(400).json({ message: "Text is required" });

  Testimonial.updateTestimonial(id, { author, text }, (err, result) => {
    if (err) return res.status(500).json({ message: "Error updating testimonial" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial updated successfully", testimonial: result });
  });
};

// Delete a testimonial (admin only)
const deleteTestimonial = (req, res) => {
  const id = req.params.id;

  Testimonial.deleteTestimonial(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting testimonial" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  });
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
