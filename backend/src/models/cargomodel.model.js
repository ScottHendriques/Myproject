import mongoose from  'mongoose'

const CargoSchema = new mongoose.Schema({
    trackingNumber: {type: String, required: true, unique: true},
    origin: String,
    destination: String,
    weight: Number,
    type: String,
    status: {type: String, enum: ['Pending','In-transit','Delivered'], default: 'Pending'},
    flightNumber: String,
    airline: String,
    departureTime: Date,
    arrivalTime: Date,
},{timestamps: true});

export default mongoose.model('Cargo', CargoSchema);