import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
    flightNumber: {type: String, required: true, unique: true},
    airline: String,
    from: String,
    to: String,
    departureDate: Date,
    arrivalDate: Date,
    aircraft: String,
    cargoCapacity: Number, //in kg
    cargoLoaded: {type:Number, default: 0},
    status: {type: String, enum: ['Scheduled', 'Departed', 'Arrived', 'Cancelled'], default: 'Scheduled'},
});

export default mongoose.model('flight', flightSchema);