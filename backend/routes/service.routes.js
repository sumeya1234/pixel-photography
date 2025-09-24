const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');
const { verifyToken } = require("../middleware/auth.middleware");

// GET all services
router.get('/', serviceController.getAllServices);

// GET single service by ID
router.get('/:id', serviceController.getServiceById);

// POST new service
router.post('/',  verifyToken,serviceController.createService);

// PUT update service
router.put('/:id',  verifyToken,serviceController.updateService);

// DELETE service
router.delete('/:id',  verifyToken,serviceController.deleteService);

module.exports = router;


