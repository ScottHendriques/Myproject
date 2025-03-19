import axios from "axios";
import dotenv from "dotenv";
import Cargo from "../models/cargomodel.model.js";


dotenv.config();

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = "http://api.aviationstack.com/v1";

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


