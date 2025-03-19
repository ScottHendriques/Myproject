import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const FlightMap = ({ departureAirport, arrivalAirport, status }) => {
  const [departureCoords, setDepartureCoords] = useState(null);
  const [arrivalCoords, setArrivalCoords] = useState(null);

  const airplaneIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/206/206798.png",
    iconSize: [50, 50],
  });

  const fetchCoordinates = async (airportName, setCoords) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: airportName,
            format: "json",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${airportName}:`, error);
    }
  };

  useEffect(() => {
    if (departureAirport) {
      fetchCoordinates(departureAirport, setDepartureCoords);
    }
    if (arrivalAirport) {
      fetchCoordinates(arrivalAirport, setArrivalCoords);
    }
  }, [departureAirport, arrivalAirport]);

  if (!departureCoords || !arrivalCoords) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={status === "scheduled" ? departureCoords : arrivalCoords}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={departureCoords} icon={airplaneIcon}>
        <Popup>{departureAirport}</Popup>
      </Marker>
      <Marker position={arrivalCoords} icon={airplaneIcon}>
        <Popup>{arrivalAirport}</Popup>
      </Marker>
      {status === "scheduled" && (
        <Marker position={departureCoords} icon={airplaneIcon}>
          <Popup>Flight is scheduled to depart from {departureAirport}</Popup>
        </Marker>
      )}
      {status === "landed" && (
        <Marker position={arrivalCoords} icon={airplaneIcon}>
          <Popup>Flight has landed at {arrivalAirport}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default FlightMap;