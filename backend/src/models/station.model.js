import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  agent: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  website: {
    type: String,
    trim: true,
  },
  hours: {
    type: String,
    required: true,
    trim: true,
  },
  contacts: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      address: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      hours: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const Station = mongoose.model("Station", stationSchema);

export default Station;