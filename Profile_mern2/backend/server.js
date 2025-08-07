// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection String (replace with your actual connection string)
const MONGO_URI = 'mongodb://localhost:27017/profileDB';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Profile Schema & Model
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  degree: String,
  institution: String,
  year: String,
  interests: [String],
  achievements: [String]
});

const Profile = mongoose.model('Profile', profileSchema);

// Routes

// Create new profile
app.post('/api/profiles', async (req, res) => {
  try {
    const { name, email, phone, degree, institution, year, interests, achievements } = req.body;
    const newProfile = new Profile({
      name,
      email,
      phone,
      degree,
      institution,
      year,
      interests: interests.split(',').map(item => item.trim()),
      achievements: achievements.split(',').map(item => item.trim())
    });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get profile by ID
app.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
