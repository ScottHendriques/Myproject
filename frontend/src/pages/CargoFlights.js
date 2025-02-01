import React, { useEffect, useState } from 'react';
import { fetchCargoFlights } from '../services/cargoservice';

export const CargoFlights = () => {
    const [flights , setFlights] = useState([]);

    useEffect(()=>{
        const getFlights = async () => {
            const data = await fetchCargoFlights();
            setFlights(data)
        };
        getFlights();
    },[]);

    return(
        <div>
            <h2>Cargo Flights</h2>
            <ul>
                {flights.length > 0 ? (
                    flights.map((flight, index)=>(
                        <li key={index}>
                            {flight.airline.name} - {flight.flight.iata} ({flight.departure.iata} → {flight.arrival.iata})
                        </li>
                    ))
                ) : (
                    <p>No flights available</p>
                )}
            </ul>
        </div>
    )
};

export default CargoFlights;