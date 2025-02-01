import express from ' express'
import axios from 'axios'

const router = express.Router();

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const BASE_URL = "http://api.aviationstack.com/v1"; //Aviationstack base url

router.get("/cargo-flights", async (req,res) => {
    try {
        const response = await axios.get(`${BASE_URL}/flights`, {
            params: {
                access_key: API_KEY,
                flight_status: "active",
                cargo_only: "true",
            }
        });
        res.json(response.data);
    } catch (error) {
        console.log("Error in fetching flight data", error);
        res.status(500).json({error:"Failed to fetch flight data"})
    }
})

export default router;