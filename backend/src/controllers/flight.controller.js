import axios from "axios";
import dotenv from "dotenv";
import Cargo from "../models/cargomodel.model.js";


dotenv.config();

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = "http://api.aviationstack.com/v1";

export const assignFlight = async (req, res) => {
    try {
        const { flightNumber } = req.body;
        const response = await axios.get(`${BASE_URL}/flights`, {
            params: { 
                access_key: API_KEY,
                flight_iata: flightNumber
            }
        });

        if (response.data && response.data.data.length > 0) {
            res.status(200).json({ message: "Flight found" });
        } else {
            res.status(404).json({ message: "Flight not found" });
        }
    } catch (error) {
        console.error("Error in fetching flight data", error);
        res.status(500).json({ message: "Error in fetching flight data" }); 
    }
};

export const trackFlight = async (req, res) => {
    try {
        const { trackingNumber } = req.params;
        const trackingData = await Cargo.findOne({ trackingNumber }); 

        if (!trackingData) {
            res.status(404).json({ message: "Tracking info not found" });
        } else {
            res.status(200).json(trackingData);
        }
    } catch (error) {
        console.error("Error in tracking flight", error);
        res.status(500).json({ message: "Error in tracking flight" });
    }
};


