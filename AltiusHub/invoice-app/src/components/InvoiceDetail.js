import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { initialInvoice } from '../initialData';

const InvoiceDetail = ({ invoices, onSave, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(initialInvoice);
  
  useEffect(() => {
    if (id !== '0') {
      const foundInvoice = invoices.find(inv => inv.Id === id);
      if (foundInvoice) {
        setInvoice(foundInvoice);
      }
    }
  }, [id, invoices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = invoice.Items.map((item, i) => 
      i === index ? { ...item, [field]: value, amount: item.quantity * item.price } : item
    );
    setInvoice({ ...invoice, Items: updatedItems });
  };

  const handleBillSundryChange = (index, field, value) => {
    const updatedSundries = invoice.BillSundrys.map((sundry, i) =>
      i === index ? { ...sundry, [field]: value } : sundry
    );
    setInvoice({ ...invoice, BillSundrys: updatedSundries });
  };

  const calculateTotalAmount = () => {
    const itemsTotal = invoice.Items.reduce((sum, item) => sum + item.amount, 0);
    const sundriesTotal = invoice.BillSundrys.reduce((sum, sundry) => sum + Number(sundry.amount), 0);
    return itemsTotal + sundriesTotal;
  };

  const handleSave = () => {
    if (invoice.Items.length === 0 || invoice.Items.some(item => !item.itemName || item.quantity <= 0 || item.price <= 0)) {
      alert('Please fill in all item fields correctly.');
      return;
    }
    invoice.TotalAmount = calculateTotalAmount();
    onSave(invoice);
    navigate('/invoices');
  };

  const handleDelete = () => {
    onDelete(invoice.Id);
    navigate('/invoices');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">{id === '0' ? 'Create Invoice' : 'Update Invoice'}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Invoice Number"
            name="InvoiceNumber"
            value={invoice.InvoiceNumber}
            onChange={handleChange}
            fullWidth
            disabled={id !== '0'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            name="Date"
            type="date"
            value={invoice.Date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Customer Name"
            name="CustomerName"
            value={invoice.CustomerName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Billing Address"
            name="BillingAddress"
            value={invoice.BillingAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping Address"
            name="ShippingAddress"
            value={invoice.ShippingAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="GSTIN"
            name="GSTIN"
            value={invoice.GSTIN}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Items</Typography>
      {invoice.Items.map((item, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="Item Name"
              value={item.itemName}
              onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', Math.max(1, e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', Math.max(0, e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Amount"
              value={item.amount}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      ))}
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Bill Sundries</Typography>
      {invoice.BillSundrys.map((sundry, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              label="Bill Sundry Name"
              value={sundry.billSundryName}
              onChange={(e) => handleBillSundryChange(index, 'billSundryName', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Amount"
              type="number"
              value={sundry.amount}
              onChange={(e) => handleBillSundryChange(index, 'amount', e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
      <Typography variant="h6" sx={{ marginTop: '20px' }}>Total Amount: {calculateTotalAmount()}</Typography>
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {id === '0' ? 'Save' : 'Update'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => navigate('/invoices')}>
            Cancel
          </Button>
        </Grid>
        {id !== '0' && (
          <Grid item>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InvoiceDetail;
