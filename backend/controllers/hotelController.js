import Hotel from '../models/Hotel.js';

// View all hotels
export const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.render('hotel', { hotels });
};

// Admin: Add new hotel
export const addHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  await newHotel.save();
  res.redirect('/admin');
};

// Admin: Delete hotel
export const deleteHotel = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
};
