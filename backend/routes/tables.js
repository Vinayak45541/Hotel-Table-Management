import express from 'express';
import TableBill from '../models/TableBill.js';

const router = express.Router();

// 🔹 POST /tables/bill → Save a bill
router.post('/bill', async (req, res) => {
  try {
    const { tableNumber, status, orders, total } = req.body;

    if (!tableNumber || !orders || !Array.isArray(orders) || typeof total !== 'number') {
      return res.status(400).json({ message: 'Invalid bill data' });
    }

    const bill = new TableBill({ tableNumber, status, orders, total });
    await bill.save();

    res.status(201).json({ message: 'Bill saved successfully' });
  } catch (err) {
    console.error('❌ Failed to save bill:', err.message);
    res.status(500).json({ message: 'Server error saving bill' });
  }
});

// 🔹 GET /tables/earnings → Total earnings from bills
router.get('/earnings', async (req, res) => {
  try {
    const bills = await TableBill.find();
    const total = bills.reduce((sum, bill) => sum + bill.total, 0);
    res.json({ total });
  } catch (err) {
    console.error('❌ Failed to fetch earnings:', err.message);
    res.status(500).json({ message: 'Server error fetching earnings' });
  }
});

// 🔹 GET /tables/bills → Return all bills (for admin view)
router.get('/bills', async (req, res) => {
  try {
    const bills = await TableBill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    console.error('❌ Failed to fetch bills:', err.message);
    res.status(500).json({ message: 'Server error fetching bills' });
  }
});

export default router;
