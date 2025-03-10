import mongoose from 'mongoose';

const descriptionSchema = new mongoose.Schema({
  pieces: { type: Number, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const bookingSchema = new mongoose.Schema({
  // filename: {
  //   type: String,
  //   required: true,
  // },
  // filepath: {
  //   type: String,
  //   required: true,
  // },
  // mimetype: {
  //   type: String,
  //   required: true,
  // },
  // size: {
  //   type: Number,
  //   required: true,
  // },
  // uploadedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  shippingFrom: {
    type: String,
    required: true,
  },
  shippingTo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  //description: [descriptionSchema],
  lenght:{
    type: Number,
    required: true,
  },
  width:{
    type: Number,
    required: true,
  },  
  height:{
    type: Number,
    required: true,
  },
  weight:{
    type: Number,
    required: true,
  },
  
  grossWeight: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;