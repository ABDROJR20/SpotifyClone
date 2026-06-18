const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Post a new song (optional, for admin or seeding)
router.post('/', async (req, res) => {
  try {
    const { title, artist, filePath, coverPath, timestamp } = req.body;

    const newSong = new Song({
      title,
      artist,
      filePath,
      coverPath,
      timestamp
    });

    const song = await newSong.save();
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
