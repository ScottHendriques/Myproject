import React, { useState } from "react";
import axios from "axios";

const DepartureSuggestion = ({setDeparture}) => {
    const [departureQuery, setDepartureQuery] = useState("");
    const [DepartureSuggestions, setDepartureSuggestions] = useState([]);

    const fetchDepartureSuggestions = async (query) => {
        if (!query) {
            setDepartureSuggestions([])
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5001/api/airports`,{
                params: {query},
            });
            setDepartureSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching departure suggestions:", error);
        }
    };

    const handleChange = (e) => {
        setDepartureQuery(e.target.value);
        fetchDepartureSuggestions(e.target.value);
    };

    return(
        <div className="flex flex-col w-1/3 relative">
            <label className="font-semibold">Departing</label>
            <input 
                type="text" 
                className="border p-2 rounded-ms" 
                placeholder="Enter departure" 
                value={departureQuery}
                onChange={handleChange}
            />
            {DepartureSuggestions.length > 0 && (
                <ul className="absolute bg-white border rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg z-10">
                    {DepartureSuggestions.map((airport, index)=>(
                        <li 
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={()=>{
                                setDeparture(airport.name);
                                setDepartureQuery(airport.name);
                                setDepartureSuggestions([]);
                            }}
                        >
                            {airport.name} ({airport.iata_code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DepartureSuggestion;