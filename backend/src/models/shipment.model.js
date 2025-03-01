import mongoose, { Mongoose } from "mongoose"

const shipmentSchema = new mongoose.Schema({
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    weight: {type: Number, required: true},
    date: {type: Date, required: true},
    flight: {type: mongoose.Schema.Types.ObjectId, ref: 'flight'},
    status: {type: String, num:['Pending','In-Transit','Delivered'], default: 'Pending', required: true},
},{timestamps: true});

export default mongoose.model('shipment', shipmentSchema);