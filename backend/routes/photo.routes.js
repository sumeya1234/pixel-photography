const express = require('express');
const router = express.Router();
const photoController = require('../controller/photo.controller');
const { verifyToken } = require("../middleware/auth.middleware");

// GET all photos (public)
router.get('/', photoController.getAllPhotos);

// GET all albums (public)
router.get('/albums', photoController.getAllAlbums);

// POST new photo (admin only)
router.post('/', verifyToken, photoController.createPhoto);

// DELETE photo (admin only)
router.delete('/:id', verifyToken, photoController.deletePhoto);

module.exports = router;