import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import { initialInvoice } from './initialData';

const App = () => {
  const [invoices, setInvoices] = useState([]);
  
  const handleSave = (invoice) => {
    if (invoice.Id === '') {
      invoice.Id = new Date().getTime().toString(); 
      setInvoices([...invoices, invoice]);
    } else {
      setInvoices(invoices.map(inv => inv.Id === invoice.Id ? invoice : inv));
    }
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter(inv => inv.Id !== id));
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Invoice Management</Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<InvoiceList invoices={invoices} onDelete={handleDelete} />} />
        <Route path="/invoices" element={<InvoiceList invoices={invoices} onDelete={handleDelete} />} />
        <Route path="/invoice/:id" element={<InvoiceDetail invoices={invoices} onSave={handleSave} onDelete={handleDelete} />} />
      </Routes>
    </Router>
  );
};

export default App;
