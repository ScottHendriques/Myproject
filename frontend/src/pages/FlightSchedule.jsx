import React, { useState } from "react";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

const FlightSchedule = () => {
  const [departure, setDeparture] = useState("");
  const [airline, setAirline] = useState("");
  const [date, setDate] = useState("2025-03-17");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFlights = async () => {
    setLoading(true);
    setError("");
    setFlights([]);

    const accessKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
    const url = `http://api.aviationstack.com/v1/flightsFuture?iataCode=${departure}&type=departure&date=${date}&airline_iata=${airline}&access_key=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Raw API Response:", data);

      if (!data.data || data.data.length === 0) {
        throw new Error("No flights found for the selected route.");
      }

      setFlights(data.data.slice(0, 10)); // Display 10 flights
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError(error.message || "Failed to fetch flights.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-md rounded-lg">
      <h2 className="text-2xl font-bold  mb-4">Flight Schedule</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="p-2 border rounded-md bg-black text-white"
          placeholder="Departure IATA (e.g., AUH)"
        />
        <input
          type="text"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
          className="p-2 border rounded-md bg-black text-white"
          placeholder="Airline IATA (e.g., EY)"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-md bg-black text-white"
        />
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchFlights}
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Get Flight Schedule
      </button>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="mt-4 text-gray-600">Loading flights...</p>}

      {/* Flight Display */}
      {flights.length > 0 && flights.map((flight, index) => (
        <div key={index} className="mt-6 p-4 border rounded-lg shadow-md flex justify-between items-center">
          <div className="text-center w-1/3">
            <PlaneTakeoff className="text-2xl mx-auto text-gray-700" />
            <p className="text-lg font-semibold">{flight.departure?.iataCode?.toUpperCase() || "Unknown"}</p>
            <p className="text-sm ">{flight.departure?.iataCode || "---"}</p>
            <p className="text-yellow-600 font-medium">{date}</p>
            <p className="text-lg font-bold ">{flight.departure?.scheduledTime || "--:--"}</p>
          </div>
          <div className="text-center w-1/3">
            <p className="text-gray-600">Direct Flight</p>
            <p className="text-sm font-medium">Journey Time: 03 hr 10 min</p>
          </div>
          <div className="text-center w-1/3">
            <PlaneLanding className="text-2xl mx-auto text-gray-700" />
            <p className="text-lg font-semibold">{flight.arrival?.iataCode?.toUpperCase() || "Unknown"}</p>
            <p className="text-sm ">{flight.arrival?.iataCode || "---"}</p>
            <p className="text-yellow-600 font-medium">{date}</p>
            <p className="text-lg font-bold ">{flight.arrival?.scheduledTime || "--:--"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightSchedule;