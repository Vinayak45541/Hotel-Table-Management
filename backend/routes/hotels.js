import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

export default router;
