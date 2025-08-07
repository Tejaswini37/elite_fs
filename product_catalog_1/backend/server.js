// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (local)
const MONGO_URI = 'mongodb://localhost:27017/productCatalogDB';
const PORT = 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  inStock: Boolean,
});

const Product = mongoose.model('Product', productSchema);

// Seed Products if Collection is Empty
const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [];
    for (let i = 1; i <= 100; i++) {
      products.push({
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1,
        category: ['Electronics', 'Books', 'Clothing'][Math.floor(Math.random() * 3)],
        inStock: Math.random() < 0.5,
      });
    }
    await Product.insertMany(products);
    console.log('Database seeded with 100 products!');
  } else {
    console.log('Products already exist. Skipping seeding.');
  }
};

// API Route to Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedProducts(); // Seed when server starts
});
