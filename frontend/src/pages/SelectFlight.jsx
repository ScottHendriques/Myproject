import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SelectFlight = () => {
    const location = useLocation();
    const bookingData = location.state?.bookingData;
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!bookingData) return;

        const fetchFlights = async () => {
            try {
                const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
                if (!API_KEY) {
                    throw new Error("API Key is missing");
                }
                const bookingDate = bookingData.shippingDate;
                const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${bookingData.shippingFrom}&arr_iata=${bookingData.shippingTo}&limit=5`;



                console.log("Fetching from:", url);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", JSON.stringify(data, null, 2));


                if (data && data.data) {
                    

                    console.log("Booking Date:", bookingData.shippingDate);
                    console.log("Formatted Booking Date:", bookingDate);
                    console.log("API Returned Flight Dates:", data.data.map(f => f.flight_date));
                    const filteredFlights = data.data.filter((flight) => flight.flight_date === bookingDate);
                    console.log("Filtered Flights:", filteredFlights);

                    setFlights(filteredFlights);
                }
            } catch (error) {
                console.error("Error fetching flights:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [bookingData]);

    if (!bookingData) {
        return <p>No Booking Data Available.</p>;
    }

    return (
        <div className="p-4">
            <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                    <span className="font-semibold">{bookingData.shippingFrom} - {bookingData.shippingTo}</span>
                    <span className="text-sm">{bookingData.shippingDate}</span>
                    <span className="font-semibold">{bookingData.item}</span>
                    <span className="text-gray-600">Pieces: {bookingData.pieces}</span>
                    <span className="font-semibold">Gross Weight: {bookingData.grossWeight}</span>
                </div>
                <a href="/booking" className="text-blue-500">Modify</a>
            </div>

            <h2 className="text-xl font-bold mt-4">Available Flights</h2>
            {loading ? (
                <p>Loading flights...</p>
            ) : flights.length === 0 ? (
                <p>No flights found for the selected criteria.</p>
            ) : (
                flights.map((flight) => (
                    <div key={flight.flight.iata} className="bg-white border rounded-lg p-4 mt-2 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{flight.airline.name}</h3>
                            <p className="text-gray-500">{flight.flight.iata}</p>
                            <p><strong>{flight.departure.iata}</strong> ➝ <strong>{flight.arrival.iata}</strong></p>
                            <p className="text-sm text-gray-600">{flight.departure.scheduled} - {flight.arrival.scheduled}</p>
                        </div>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">Choose</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default SelectFlight;