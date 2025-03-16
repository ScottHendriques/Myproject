import React, { useState } from "react";

const FlightSchedule = () => {
  const [departure, setDeparture] = useState("BOM");
  const [arrival, setArrival] = useState("JFK");
  const [date, setDate] = useState("2025-03-17");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFlights = async () => {
    setLoading(true);
    setError("");
    setFlights([]);

    const accessKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
    const url = `http://api.aviationstack.com/v1/flights?dep_iata=${departure}&arr_iata=${arrival}&flight_date=${date}&access_key=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Raw API Response:", data);

      if (!data.data || data.data.length === 0) {
        throw new Error("No flights found for the selected route.");
      }

      setFlights(data.data.slice(0, 10)); 
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError(error.message || "Failed to fetch flights.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Flight Schedule</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="p-2 border rounded-md bg-black text-white"
          placeholder="Departure IATA (e.g., BOM)"
        />
        <input
          type="text"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="p-2 border rounded-md bg-black text-white"
          placeholder="Arrival IATA (e.g., JFK)"
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

      {/* Flight Table */}
      {flights.length > 0 && (
        <table className="mt-6 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left font-semibold">Airline</th>
              <th className="border p-2 text-left font-semibold">Flight Number</th>
              <th className="border p-2 text-left font-semibold">Departure</th>
              <th className="border p-2 text-left font-semibold">Arrival</th>
              <th className="border p-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index} className="text-gray-700">
                <td className="border p-2">{flight.airline?.name || "N/A"}</td>
                <td className="border p-2">{flight.flight?.iata || "N/A"}</td>
                <td className="border p-2">{flight.departure?.airport || "N/A"}</td>
                <td className="border p-2">{flight.arrival?.airport || "N/A"}</td>
                <td className="border p-2">{flight.flight_status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlightSchedule;
