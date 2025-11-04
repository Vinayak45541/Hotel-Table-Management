import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  mapsLink: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  collection: {
    type: String
  },
  image: {
    type: String,
    default: '' // optional image URL
  },
  pricePerNight: {
    currency: {
      type: String,
      default: 'INR'
    },
    Deluxe: {
      type: Number,
      required: true
    },
    Executive: {
      type: Number,
      required: true
    },
    Suite: {
      type: Number,
      required: true
    }
  }
});

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;
