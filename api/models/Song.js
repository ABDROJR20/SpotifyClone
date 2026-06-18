const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    default: 'Various Artists'
  },
  filePath: {
    type: String,
    required: true
  },
  coverPath: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Song', SongSchema);
