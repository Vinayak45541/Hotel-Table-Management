import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  item: String,
  price: Number,
});

const TableSchema = new mongoose.Schema({
  tableNumber: Number,
  status: {
    type: String,
    enum: ['not booked', 'booked', 'in use', 'not in use'],
    default: 'not booked'
  },
  orders: [OrderItemSchema],
  total: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Table = mongoose.model('Table', TableSchema);
export default Table;
