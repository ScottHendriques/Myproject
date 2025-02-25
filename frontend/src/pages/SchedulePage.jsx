import React, { useState } from "react";
import DepartureSuggestion from "../components/departureSuggestion";
import ArrivalSuggestion from "../components/ArrivalSuggestion";

const FlightSchedule = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [flightData, setFlightData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Departure:", departure);
    console.log("Arrival:", arrival);
    console.log("Flight Date:", flightDate);

    if (!departure || !arrival || !flightDate) {
        console.error("Please fill in all fields before searching.");
        return;
    }
    console.log({departure, arrival, flightDate})
  };

  return (
    <div className="min-h-screen bg-[#f5ebcd] flex flex-col items-center pt-20">
      <div className="text-center mt-6">
        <h1 className="text-4xl italic text-black">Flight</h1>
        <h2 className="text-5xl font-bold italic text-black">schedule</h2>
      </div>
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg mt-16">
        <h2 className="text-center text-2xl font-bold mb-4">Looking for a particular flight or route?</h2>
        <p className="text-center text-gray-600 mb-6">
          Use the search tool to track a particular flight or view the schedule.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <DepartureSuggestion setDeparture={setDeparture}/>
            <ArrivalSuggestion setArrival={setArrival}/>
            <div className="flex flex-col w-1/3">
              <label className="font-semibold">Flight Date</label>
              <input
                type="date"
                className="border p-2 rounded-md"
                value={flightDate}
                onChange={(e) => setFlightDate(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#b68d4c] text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            GET SCHEDULE
          </button>
        </form>
        {flightData && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold">Flight Details</h3>
            <p><strong>Flight:</strong> {flightData.flight_name}</p>
            <p><strong>From:</strong> {flightData.departure_airport}</p>
            <p><strong>To:</strong> {flightData.arrival_airport}</p>
            <p><strong>Status:</strong> {flightData.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSchedule;

