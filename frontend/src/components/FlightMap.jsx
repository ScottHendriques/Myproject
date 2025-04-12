import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import img1 from "../images/plane-icon-png.png";
import img2 from "../images/location-png.png";

// Icons
const airplaneIcon = L.icon({
  iconUrl: img1,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const locationIcon = L.icon({
  iconUrl: img2,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const FlightMap = ({ departureAirport, arrivalAirport, status }) => {
  const [departureCoords, setDepartureCoords] = useState(null);
  const [arrivalCoords, setArrivalCoords] = useState(null);

  const fetchCoordinates = async (airportName, setCoords) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: airportName,
          format: "json",
        },
      });

      if (response.data?.length > 0) {
        const { lat, lon } = response.data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${airportName}:`, error);
    }
  };

  useEffect(() => {
    if (departureAirport) fetchCoordinates(departureAirport, setDepartureCoords);
    if (arrivalAirport) fetchCoordinates(arrivalAirport, setArrivalCoords);
  }, [departureAirport, arrivalAirport]);

  if (!departureCoords || !arrivalCoords) return <p>Loading map...</p>;

  // Normalize status
  const flightStatus = status?.toLowerCase();

  return (
    <MapContainer
      center={flightStatus === "scheduled" ? departureCoords : arrivalCoords}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Departure Marker */}
      <Marker
        position={departureCoords}
        icon={flightStatus === "scheduled" ? airplaneIcon : locationIcon}
      >
        <Popup>
          {flightStatus === "scheduled"
            ? `Flight is scheduled to depart from ${departureAirport}`
            : departureAirport}
        </Popup>
      </Marker>

      {/* Arrival Marker */}
      <Marker
        position={arrivalCoords}
        icon={flightStatus === "landed" ? airplaneIcon : locationIcon}
      >
        <Popup>
          {flightStatus === "landed"
            ? `Flight has landed at ${arrivalAirport}`
            : arrivalAirport}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default FlightMap;
