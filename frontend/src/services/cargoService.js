import { axiosInstance } from "../lib/axios";

export const fetchCargoFlights = async () => {
    try {
        const response = await axiosInstance.get("aviation/cargo-flights");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching the flight data", error)
        return [];
    }
}