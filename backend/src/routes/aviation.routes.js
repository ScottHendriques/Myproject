import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const FLIGHTS_URL = "http://api.aviationstack.com/v1/flights";
const AIRPORT_URL = "http://api.aviationstack.com/v1/airports";

router.get("/flight/:flightNumber", async (req, res) => {
    let { flightNumber } = req.params;
    console.log("Received flight number:", flightNumber);

    try {
        const response = await axios.get(FLIGHTS_URL, {
            params: {
                access_key: API_KEY,
                flight_iata: flightNumber,
            },
        });

        if (!response.data || !response.data.data || response.data.data.length === 0) {
            return res.status(404).json({ error: `No flight data found for ${flightNumber}.` });
        }

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

router.get("/airports", async (req,res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(AIRPORT_URL, {
            params:{
                access_key: API_KEY,
            }
        })
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            return res.status(404).json({error:"No Airports found"});
        }

        const filteredAirports = response.data.data.filter(airport => airport.name.toLowerCase().includes(query.toLowerCase()).slice(0,10)); //limits to 10 suggestions
        res.json(filteredAirports.map(airport => ({
            name: airport.name,
            iata_code: airport.iata_code,
            country: airport.country_name
        })))
    } catch (error) {
        console.error("Error fetching airport data:", error.message );
        res.status(500).json({error: "Internal server Error"})
    }
});

router.get("/airline/:iataCode", async (req,res) => {
    const {iataCode} = req.params;

    try {
        const response = await axios.get(FLIGHTS_URL,{
            params: {
                access_key: API_KEY,
                airline_iata: iataCode,
            },
        });

        if(!response.data || !response.data.data || response.data.data.length === 0){
            return res.status(404).json({error: `No flight data found for airline IATA Code: ${iataCode}.`});
        }
        res.json(response.data.data);
    } catch (error) {
        console.error("Error fetching flight data for airline", error,message);
        res.status(500).json({error: "Internal server Error"});
    }
})

export default router;