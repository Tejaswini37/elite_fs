// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (replace with your actual connection string)
const MONGO_URI = 'mongodb://localhost:27017/mern3';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// Routes

// Get all products with pagination
app.get('/api/products', async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search products by name (partial match) with pagination
app.get('/api/products/search', async (req, res) => {
  try {
    const name = req.query.name || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { name: { $regex: name, $options: 'i' } };
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
