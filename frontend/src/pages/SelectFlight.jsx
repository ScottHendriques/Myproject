import React from "react";
import { useLocation } from "react-router-dom";

const SelectFlight = () => {
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    if(!bookingData){
        return <p>No Booking Data Available.</p>
    }

    return(
        <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
                <span className="font-semibold">{bookingData.shippingFrom}-{bookingData.shippingTo}</span>
                <span className="text-sm">{bookingData.shippingDate}</span>
                <span className="font-semibold">{bookingData.item}</span>
                <span className="text-gray-600">Pieces: {bookingData.pieces}</span>
                <span className="font-semibold">Gross Weight: {bookingData.grossWeight}</span>
            </div>
            <a href="/booking" className="text-blue-500">Modify</a>
        </div>
    )
}
export default SelectFlight;