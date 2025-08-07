import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, TextField
} from '@mui/material';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...products[index] });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/api/products/${id}`, editData);
    setEditIndex(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id}>
              <TableCell>
                {editIndex === index ? (
                  <TextField name="name" value={editData.name} onChange={handleChange} />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <TextField name="price" value={editData.price} onChange={handleChange} />
                ) : (
                  product.price
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <TextField name="category" value={editData.category} onChange={handleChange} />
                ) : (
                  product.category
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Button variant="contained" color="success" onClick={() => handleSave(product._id)}>
                    Save
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(index)} sx={{ mr: 1 }}>Edit</Button>
                    <Button color="error" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
