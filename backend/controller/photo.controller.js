const Photo = require('../models/photo.model');

// Get all photos
exports.getAllPhotos = (req, res) => {
  Photo.getAllPhotos((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Get albums
exports.getAllAlbums = (req, res) => {
  Photo.getAllAlbums((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Create photo
exports.createPhoto = (req, res) => {
  const { album_id, image_url, alt_text } = req.body;
  if (!image_url) return res.status(400).json({ error: 'Image URL is required' });

  Photo.create({ album_id, image_url, alt_text }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Photo added', id: result.insertId });
  });
};

// Delete photo
exports.deletePhoto = (req, res) => {
  const { id } = req.params;
  Photo.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Photo not found' });
    res.json({ message: 'Photo deleted' });
  });
};