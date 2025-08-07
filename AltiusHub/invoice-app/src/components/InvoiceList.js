
import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InvoiceList = ({ invoices, onDelete }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h1>Invoices</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/invoice/0')} style={{ marginBottom: '20px' }}>
        Add Invoice
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
              <TableRow key={invoice.Id}>
                <TableCell>
                  <Button onClick={() => navigate(`/invoice/${invoice.Id}`)}>{invoice.InvoiceNumber}</Button>
                </TableCell>
                <TableCell>{invoice.CustomerName}</TableCell>
                <TableCell>{invoice.TotalAmount}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(invoice.Id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default InvoiceList;
