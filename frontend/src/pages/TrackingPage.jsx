// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// export default function ShipmentTracking() {
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [shipmentData, setShipmentData] = useState(null);

//   const fetchShipmentData = async () => {
//     if (!trackingNumber) return;
//     try {
//       const response = await fetch(
//         `https://api.aviationstack.com/v1/flights?access_key=YOUR_API_KEY&flight_iata=${trackingNumber}`
//       );
//       const data = await response.json();
//       setShipmentData(data.data[0]);
//     } catch (error) {
//       console.error("Error fetching shipment data:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Track Your <span className="italic">Shipment</span></h1>
//       <div className="flex space-x-2">
//         <Input
//           placeholder="Airway bill"
//           value={trackingNumber}
//           onChange={(e) => setTrackingNumber(e.target.value)}
//           className="w-72"
//         />
//         <Button onClick={fetchShipmentData}>Track</Button>
//       </div>
//       <Card className="w-96 p-4">
//         <CardContent>
//           <p className="text-sm italic">Note: Please enter the airway bill allotted for the cargo.</p>
//         </CardContent>
//       </Card>
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
