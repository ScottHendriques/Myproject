import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Plane } from "lucide-react";
import img101 from "../images/Etihadlogo.png";

const SelectFlight = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculatePrice = (basePrice, timezone, weight) => {
    let price = basePrice;

    // Adjust price based on continent
    if (timezone.includes("America")) {
      price += 100; 
    } else if (timezone.includes("Europe")) {
      price += 50; 
    } else if (timezone.includes("Asia")) {
      price += 46; 
    }

    // Adjust price based on weight
    if (weight > 25 && weight <= 50) {
      price += 30; 
    } else if (weight > 50) {
      price += 60; 
    }

    return price;
  };

  useEffect(() => {
    if (!bookingData) return;

    const fetchFlights = async () => {
      try {
        const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;
        if (!API_KEY) {
          throw new Error("API Key is missing");
        }
        const bookingDate = bookingData.shippingDate;
        const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${bookingData.shippingFrom}&arr_iata=${bookingData.shippingTo}&limit=10`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data) {
          const filteredFlights = data.data.filter(
            (flight) => flight.flight_date === bookingDate
          );
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
    <div className="p-6">
      <div className="border rounded-lg p-6 flex justify-between items-center shadow-md">
        <div>
          <h2 className="text-xl font-bold">
            {bookingData.shippingFrom} → {bookingData.shippingTo}
          </h2>
          <p className="text-sm text-gray-600">{bookingData.shippingDate}</p>
          <p className="font-semibold">
            {bookingData.item} ({bookingData.pieces} pieces,{" "}
            {bookingData.totalWeight} kg)
          </p>
        </div>
        <a href="/booking" className="text-blue-500">
          Modify
        </a>
      </div>

      <h2 className="text-xl font-bold mt-6">Available Flights</h2>
      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length === 0 ? (
        <p>No flights found for the selected criteria.</p>
      ) : (
        flights.map((flight, index) => {
          const basePrice = 90; 
          const adjustedPrice = calculatePrice(
            basePrice,
            flight.arrival.timezone,
            bookingData.totalWeight 
          );

          return (
            <div
              key={index}
              className="border rounded-lg p-4 mt-4 flex items-center justify-between shadow-md"
            >
              {/* Airline Section */}
              <div className="flex items-center space-x-4">
                <img
                  src={img101}
                  alt="Airline Logo"
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="font-bold text-lg">{flight.airline.name}</h3>
                  <p className="text-gray-500">{flight.flight.iata}</p>
                </div>
              </div>

              {/* Flight Details */}
              <div className="text-center">
                <p className="font-bold text-lg">
                  {flight.departure.scheduled.slice(11, 16)}
                </p>
                <p className="text-gray-500 text-sm">{flight.departure.iata}</p>
                <p className="text-sm text-gray-600">{flight.flight_date}</p>
              </div>

              {/* Duration Section */}
              <div className="flex flex-col items-center">
                <Plane className="text-gray-500" size={24} />
                <p className="text-sm text-gray-600">3 hrs</p>
              </div>

              {/* Arrival Section */}
              <div className="text-center">
                <p className="font-bold text-lg">
                  {flight.arrival.scheduled.slice(11, 16)}
                </p>
                <p className="text-gray-500 text-sm">{flight.arrival.iata}</p>
                <p className="text-sm text-gray-600">{flight.flight_date}</p>
              </div>

              {/* Price & Select Button */}
              <div className="text-right">
                <p className="text-lg font-bold text-yellow-600">
                  EUR {adjustedPrice.toFixed(2)}
                </p>
                <p className="text-sm text-green-500">Market Rate</p>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-2">
                  Choose
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SelectFlight;