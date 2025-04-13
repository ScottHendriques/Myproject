import React, { useState } from 'react';
import axios from 'axios';
import FlightMap from '../components/FlightMap';
import { Truck, Search } from 'lucide-react';

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
      setError('Shipment not found or an error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100 font-montserrat py-20">
      <h1 className="text-4xl font-bold mb-8">
        Track your <span className="text-5xl font-bold italic text-primary">Shipment</span>
      </h1>
      <div className="flex items-center mb-4 w-full max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Airway Bill (AWB)"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="input input-bordered w-full pr-10 text-sm h-12"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50"
          />
        </div>
        <button
          onClick={fetchFlightDetails}
          className="btn btn-primary ml-2 h-12 px-6"
        >
          Track
        </button>
      </div>
      <div className="text-center text-sm text-base-content/70 max-w-md mb-6">
        <p>Please enter the Airway Bill (AWB) assigned to your cargo shipment.</p>
      </div>

      {error && <p className="text-error mt-4">{error}</p>}
      {flightData && (
        <div className="mt-6 w-full max-w-lg bg-base-100 rounded-xl border border-base-300 shadow-lg overflow-hidden">
          {/* Shipment Card Header */}
          <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content">
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-medium text-sm">AWB: {flightNumber}</h3>
                <p className="text-xs text-base-content/70">{flightData.status}</p>
              </div>
            </div>
            <span
              className={`text-xs font-medium ${
                flightData.status.toLowerCase() === 'on time'
                  ? 'text-success'
                  : 'text-warning'
              }`}
            >
              {flightData.status}
            </span>
          </div>

          {/* Shipment Card Body */}
          <div className="p-4 bg-base-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-base-content/70">Flight</p>
                <p className="text-sm font-medium">{flightData.flight_name}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/70">Status</p>
                <p className="text-sm font-medium">{flightData.status}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/70">Origin</p>
                <p className="text-sm font-medium">{flightData.departure_airport}</p>
              </div>
              <div>
                <p className="text-xs text-base-content/70">Destination</p>
                <p className="text-sm font-medium">{flightData.arrival_airport}</p>
              </div>
            </div>
          </div>

          {/* Shipment Card Footer */}
          <div className="p-4 border-t border-base-300 bg-base-100">
            <div className="flex justify-between items-center">
              <p className="text-xs text-base-content/70">Updated: Just now</p>
              <button className="btn btn-primary btn-sm">View Full Details</button>
            </div>
          </div>
        </div>
      )}
      {flightData && (
        <div className="mt-8 w-full max-w-5xl">
          <FlightMap
            departureAirport={flightData.departure_airport}
            arrivalAirport={flightData.arrival_airport}
            status={flightData.status.toLowerCase()}
          />
        </div>
      )}
    </div>
  );
};

export default TrackingPage;