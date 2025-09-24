const Service = require('../models/service.model');

// Get all services
exports.getAllServices = (req, res) => {
  Service.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Get a single service by ID
exports.getServiceById = (req, res) => {
  const { id } = req.params;
  Service.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!result) return res.status(404).json({ message: 'Service not found' });
    res.json(result);
  });
};

// Create a new service
exports.createService = (req, res) => {
  const { name, description, price } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!price) return res.status(400).json({ error: 'Price is required' });

  Service.create({ name, description, price }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Service created', id: result.insertId });
  });
};

// Update a service
exports.updateService = (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!price) {
    return res.status(400).json({ error: 'Price is required' });
  }

  Service.update(id, { name, description, price }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service updated successfully' });
  });
};


// Delete a service
exports.deleteService = (req, res) => {
  const { id } = req.params;

  Service.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  });
};
