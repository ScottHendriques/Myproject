import { useState } from "react";

const FlightSchedule = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [airline, setAirline] = useState("");
  const [error, setError] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlightSchedule = async () => {
    setLoading(true);
    setError("");
    setSchedule(null);

    try {
      const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
      if (!API_KEY) {
        throw new Error("API Key is missing");
      }
      const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${departure}&arr_iata=${arrival}&flight_date=${flightDate}&limit=10`;

      
      console.log("Fetching data from:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.data && data.data.length > 0) {
        setSchedule(data.data);
      } else {
        setError("No flights found for the selected criteria.");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      setError("Failed to fetch flight schedules. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departure || !arrival || !flightDate || !airline) {
      setError("Please fill in all fields before searching.");
      return;
    }
    fetchFlightSchedule();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Flight Schedule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Departure (IATA Code)"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Enter Arrival (IATA Code)"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Enter Preferred Airline"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="input input-bordered w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Searching..." : "Get Schedule"}
          </button>
        </form>

        {schedule && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold">Flight Details</h3>
            {schedule.slice(0,10).map((flight, index) => (
              <div key={index} className="p-2 border-b">
                <p><strong>Flight:</strong> {flight.flight.iata || "N/A"}</p>
                <p><strong>Departure Time:</strong> {flight.departure.estimated || "N/A"}</p>
                <p><strong>Arrival Time:</strong> {flight.arrival.estimated || "N/A"}</p>
                <p><strong>Airline:</strong> {flight.airline.name || "N/A"}</p>
                <p><strong>Status:</strong> {flight.flight_status || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSchedule;