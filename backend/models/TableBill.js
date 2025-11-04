// models/TableBill.js
import mongoose from 'mongoose';

const TableBillSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  status: { type: String, required: true },
  orders: [
    {
      item: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 👇 this creates a collection named 'tablebills' by default
const TableBill = mongoose.model('TableBill', TableBillSchema);
export default TableBill;
