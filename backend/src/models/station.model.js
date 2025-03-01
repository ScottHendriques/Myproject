const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    country: {type: String, required: true},
    state: {type: String, required: true},
    category: {type: String, enum: ["Import","Export"], required: true},
    agent: {type: String, required: true},
    company: {type: String},
    location: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    hours: {type: String, required: true},
    closedDays: {type: String},
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;