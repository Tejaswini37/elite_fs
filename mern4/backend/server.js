const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// API Endpoints

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product
app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Update an existing product
app.put('/api/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedProduct);
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
