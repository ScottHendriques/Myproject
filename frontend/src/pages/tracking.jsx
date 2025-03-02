// frontend/FlightTracker.js
import React, { useState } from 'react';
import axios from 'axios';

const FlightTracker = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

    const fetchFlightDetails = async () => {
        setError(null);
        setFlightData(null);
        
        try {
            const response = await axios.get(`http://localhost:5001/api/aviation/flight/${flightNumber}`);
            setFlightData(response.data);
        } catch (err) {
            setError('Flight not found or an error occurred');
        }
    };

    return (
        <div className="container mx-auto p-4 text-center mt-20">
            <h2 className="text-2xl font-bold mb-4 ">Flight Tracker</h2>
            <input 
                type="text" 
                placeholder="Enter Flight Number" 
                value={flightNumber} 
                onChange={(e) => setFlightNumber(e.target.value)}
                className="border p-2 rounded mr-2"
            />
            <button 
                onClick={fetchFlightDetails} 
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
            </button>
            
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {flightData && (
                <div className="mt-4 border p-4 rounded shadow">
                    <p><strong>Flight Name:</strong> {flightData.flight_name}</p>
                    <p><strong>Departure:</strong> {flightData.departure_airport}</p>
                    <p><strong>Arrival:</strong> {flightData.arrival_airport}</p>
                    <p><strong>Status:</strong> {flightData.status}</p>
                </div>
            )}
        </div>
    );
};

export default FlightTracker;
