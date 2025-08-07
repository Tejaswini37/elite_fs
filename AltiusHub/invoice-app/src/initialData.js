
export const initialInvoice = {
    Id: '',
    Date: new Date().toISOString().substring(0, 10),
    InvoiceNumber: 1001,
    CustomerName: '',
    BillingAddress: '',
    ShippingAddress: '',
    GSTIN: '',
    Items: [{ Id: '1', itemName: '', quantity: 1, price: 0, amount: 0 }],
    BillSundrys: [{ Id: '1', billSundryName: '', amount: 0 }],
    TotalAmount: 0,
  };
  
  export const initialInvoiceItem = {
    Id: '1',
    itemName: '',
    quantity: 1,
    price: 0,
    amount: 0,
  };
  
  export const initialInvoiceBillSundry = {
    Id: '1',
    billSundryName: '',
    amount: 0,
  };
  