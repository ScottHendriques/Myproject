import React, { useState } from "react";
import axios from "axios";

const ArrivalSuggestion = ({ setArrival }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]); // Always an array

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const response = await axios.get(`/api/airports`, { params: { query: value } });

                console.log("API Response:", response.data); // Debugging

                if (Array.isArray(response.data.airports)) {
                    setSuggestions(response.data.airports);
                } else {
                    setSuggestions([]); // Ensure it's always an array
                }
            } catch (error) {
                console.error("Error fetching airport suggestions:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="relative w-1/3">
            <label className="font-semibold">Arrival</label>
            <input
                type="text"
                className="border p-2 rounded-md w-full"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter Arrival"
            />
            {Array.isArray(suggestions) && suggestions.length > 0 && (
                <ul className="absolute bg-white border mt-1 w-full rounded-md shadow-lg z-10">
                    {suggestions.map((airport, index) => (
                        <li key={index} 
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                                setQuery(airport.name);
                                setArrival(airport.name);
                                setSuggestions([]);
                            }}>
                            {airport.name} ({airport.iata})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArrivalSuggestion;
