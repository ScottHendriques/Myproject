import { useState } from "react";

const FlightSchedule = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [error, setError] = useState("");
  const [schedule, setSchedule] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departure || !arrival || !flightDate) {
      setError("Please fill in all fields before searching.");
      return;
    }
    setError("");
    setSchedule({ departure, arrival, flightDate });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Flight Schedule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Enter Arrival"
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Get Schedule
          </button>
        </form>

        {schedule && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <p><strong>Departure:</strong> {schedule.departure}</p>
            <p><strong>Arrival:</strong> {schedule.arrival}</p>
            <p><strong>Flight Date:</strong> {schedule.flightDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSchedule;
