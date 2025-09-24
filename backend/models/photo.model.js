const db = require("../database/db");

// Get all photos with album names
exports.getAllPhotos = (callback) => {
  const sql = `
    SELECT p.*, a.name as album_name 
    FROM photos p 
    LEFT JOIN albums a ON p.album_id = a.id 
    ORDER BY p.created_at DESC
  `;
  db.query(sql, callback);
};

// Get photos by album
exports.getPhotosByAlbum = (albumId, callback) => {
  const sql = "SELECT * FROM photos WHERE album_id = ? ORDER BY created_at DESC";
  db.query(sql, [albumId], callback);
};

// Create photo
exports.create = (photo, callback) => {
  const sql = "INSERT INTO photos (album_id, image_url, alt_text) VALUES (?, ?, ?)";
  db.query(sql, [photo.album_id, photo.image_url, photo.alt_text], callback);
};

// Delete photo
exports.delete = (id, callback) => {
  const sql = "DELETE FROM photos WHERE id = ?";
  db.query(sql, [id], callback);
};

// Get all albums
exports.getAllAlbums = (callback) => {
  const sql = "SELECT * FROM albums ORDER BY name";
  db.query(sql, callback);
};