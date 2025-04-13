import Station from "../models/station.model.js";

// Get all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Station.distinct("country");
    console.log("Fetched countries:", countries); // Debug log
    res.json({ countries: countries || [] });
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

// Get states for a country
export const getStates = async (req, res) => {
  const { country } = req.query;
  if (!country) {
    return res.status(400).json({ error: "Country is required" });
  }
  try {
    const states = await Station.distinct("state", { country });
    res.json({ states: states || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch states" });
    console.error(err);
  }
};

// Get station details for a country and state
export const getStation = async (req, res) => {
  const { country, state } = req.query;
  if (!country || !state) {
    return res.status(400).json({ error: "Country and state are required" });
  }
  try {
    const station = await Station.findOne({
      country: { $regex: `^${country.trim()}$`, $options: "i" }, // Case-insensitive match
      state: { $regex: `^${state.trim()}$`, $options: "i" }, // Case-insensitive match
    });
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    console.log("Station data sent to frontend:", station);
    res.json({ station });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch station" });
    console.error(err);
  }
};

// Create a new station
export const createStation = async (req, res) => {
  console.log("Received POST request with data:", req.body);
  try {
    const station = new Station(req.body);
    await station.save();
    console.log("Station saved:", station);
    res.status(201).json({ message: "Station saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Failed to save station" });
  }
};

// Get all stations
// export const getAllStations = async (req, res) => {
//   try {
//     const stations = await Station.find();
//     res.json({ stations });
//   } catch (err) {
//     console.error("Failed to fetch stations:", err);
//     res.status(500).json({ error: "Failed to fetch stations" });
//   }
// };
