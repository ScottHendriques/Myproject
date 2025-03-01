import mongoose from 'mongoose'

const flightSchema = new mongoose.Schema({
    flightNumber: {type: String, required: true, unique: true},
    airline: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    departureDate: {type: Date, required: true},
    arrivalDate: {type: Date, required: true},
    aircraft: {type: String, required: true},
    cargoCapacity: {type: Number}, //in kg
    cargoLoaded: {type:Number, default: 0},
    status: {type: String, enum: ['Scheduled', 'Departed', 'Arrived', 'Cancelled'], default: 'Scheduled'},
});

export default mongoose.model('flight', flightSchema);