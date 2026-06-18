const mongoose = require('mongoose');
require('dotenv').config();
const Song = require('./models/Song');

const songs = [
  { id: 1, title: "Better Call Saul - Theme", artist: "Various Artists", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg", timestamp: "03:20" },
  { id: 2, title: "Breaking Bad Theme", artist: "Various Artists", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg", timestamp: "01:15" },
  { id: 3, title: "Eminem - Mockingbird (Slowed & Reverb)", artist: "Eminem", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg", timestamp: "04:40" },
  { id: 4, title: "Don Toliver - No Idea", artist: "Don Toliver", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg", timestamp: "03:14" },
  { id: 5, title: "La Haasil - Sunny Khan Durrani", artist: "Sunny Khan Durrani", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg", timestamp: "03:35" },
  { id: 6, title: "Nirvana - Something In The Way", artist: "Nirvana", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg", timestamp: "03:51" },
  { id: 7, title: "Oppenheimer - Theme", artist: "Various Artists", filePath: "/songs/7.mp3", coverPath: "/covers/7.jpg", timestamp: "01:20" },
  { id: 8, title: "Red Right Hand - Peaky Blinders", artist: "Various Artists", filePath: "/songs/8.mp3", coverPath: "/covers/8.jpg", timestamp: "06:10" },
  { id: 9, title: "The Weeknd - I Was Never There", artist: "The Weeknd", filePath: "/songs/9.mp3", coverPath: "/covers/9.jpg", timestamp: "04:00" },
  { id: 10, title: "Maroon 5 - Memories", artist: "Maroon 5", filePath: "/songs/10.mp3", coverPath: "/covers/10.jpg", timestamp: "03:04" },
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('MongoDB connected successfully');
  
  await Song.deleteMany();
  console.log('Existing songs cleared');

  await Song.insertMany(songs);
  console.log('Songs seeded successfully');
  
  process.exit();
})
.catch((err) => {
  console.log('MongoDB connection error: ', err);
  process.exit(1);
});
