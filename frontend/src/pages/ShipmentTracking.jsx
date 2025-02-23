// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// export default function ShipmentTracking() {
//   const [flightNumber, setFlightNumber] = useState("");
//   const [shipmentData, setShipmentData] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchShipmentData = async () => {
//     if (!flightNumber) return;
//     setError(""); // Reset error message

//     try {
//       const response = await fetch(`/api/shipment/${flightNumber}`);
//       const data = await response.json();

//       if (data.error) {
//         setError(data.error);
//         setShipmentData(null);
//         return;
//       }

//       setShipmentData(data);
//     } catch (error) {
//       console.error("Error fetching shipment data:", error);
//       setError("Failed to fetch shipment data.");
//     }
//   };

//   const handleSearch = () => {
//     if (flightNumber) {
//       navigate(`/tracking?flight=${flightNumber}`);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Track Your <span className="italic">Flight</span></h1>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           placeholder="Flight number"
//           value={flightNumber}
//           onChange={(e) => setFlightNumber(e.target.value)}
//           className="border p-2 rounded-md w-72"
//         />
//         <button onClick={fetchShipmentData} className="bg-blue-500 text-white p-2 rounded-md">Track</button>
//       </div>
//       <button className="mt-2 bg-gray-500 text-white p-2 rounded-md" onClick={handleSearch}>Search</button>
//       <div className="w-96 p-4 border rounded-lg">
//         <p className="text-sm italic">Note: Please enter the flight number to track its status.</p>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {shipmentData && (
//         <div className="w-full max-w-3xl p-4 border rounded-lg">
//           <h2 className="text-xl font-semibold">Flight Details</h2>
//           <p><strong>Flight:</strong> {shipmentData?.flight?.iata || "N/A"}</p>
//           <p><strong>Departure:</strong> {shipmentData?.departure?.airport || "N/A"} ({shipmentData?.departure?.iata || "N/A"})</p>
//           <p><strong>Arrival:</strong> {shipmentData?.arrival?.airport || "N/A"} ({shipmentData?.arrival?.iata || "N/A"})</p>
//           <p><strong>Status:</strong> {shipmentData?.flight_status || "N/A"}</p>

//           {shipmentData?.live && shipmentData.live.latitude && shipmentData.live.longitude ? (
//             <>
//               <h2 className="text-xl font-semibold mt-4">Live Tracking</h2>
//               <MapContainer center={[shipmentData.live.latitude, shipmentData.live.longitude]} zoom={5} className="h-64 w-full">
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker position={[shipmentData.live.latitude, shipmentData.live.longitude]} />
//               </MapContainer>
//             </>
//           ) : (
//             <p className="text-red-500 mt-4">Live tracking data is not available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
