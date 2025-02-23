import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = "http://api.aviationstack.com/v1/flights";

router.get("/flight/:flightNumber", async (req, res) => {
    let { flightNumber } = req.params;
    console.log("Received flight number:", flightNumber);

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                access_key: API_KEY,
                flight_iata: flightNumber,
            },
        });

        console.log("Full API Response:", JSON.stringify(response.data, null, 2)); // Debugging

        // Check if data exists in response
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            console.log(`No flight data found for ${flightNumber}`);
            return res.status(404).json({ error: `No flight data found for ${flightNumber}.` });
        }

        // Extract relevant flight details
        const flightInfo = response.data.data[0];

        res.json({
            flight_name: flightInfo.airline?.name || "N/A",
            departure_airport: flightInfo.departure?.airport || "N/A",
            arrival_airport: flightInfo.arrival?.airport || "N/A",
            status: flightInfo.flight_status || "N/A",
        });

    } catch (error) {
        console.error("Error fetching flight data:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;
