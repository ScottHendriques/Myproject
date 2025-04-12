import React, { useState } from 'react';
import axios from 'axios';
import FlightMap from '../components/FlightMap';

const TrackingPage = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

    const fetchFlightDetails = async () => {
        setError(null);
        setFlightData(null);
        
        try {
            const response = await axios.get(`http://localhost:5001/api/aviation/flight/${flightNumber}`);
            console.log("API Response:", response.data);
            setFlightData(response.data);
        } catch (err) {
            setError('Flight not found or an error occurred');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 font-montserrat">
            <h1 className="text-4xl font-bold mb-8">Track your <span className="text-5xl font-bold italic">Shipment</span></h1>
            <div className="flex items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Airway bill" 
                    value={flightNumber} 
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="border p-2 rounded-l-lg w-96"
                />
                <button 
                    onClick={fetchFlightDetails} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                    Track
                </button>
            </div>
            <div className="border p-4 rounded-lg w-96">
                <p className="font-bold">Note:-</p>
                <p>Please enter the airway bill allotted for the cargo</p>
            </div>
            
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {flightData && (
                <div className="mt-4 border p-6 rounded shadow-lg w-130 bg-white">
                    <h2 className="text-xl font-bold mb-4">Flight Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Flight Name:</p>
                            <p>{flightData.flight_name}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Departure:</p>
                            <p>{flightData.departure_airport}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Arrival:</p>
                            <p>{flightData.arrival_airport}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Status:</p>
                            <p>{flightData.status}</p>
                        </div>
                    </div>
                </div>
            )}
            {flightData && (
                <FlightMap
                    departureAirport={flightData.departure_airport}
                    arrivalAirport={flightData.arrival_airport}
                    status={flightData.status.toLowerCase()} 
                />
            )}
        </div>
    );
};

export default TrackingPage;