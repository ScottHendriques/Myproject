import React, { useState } from "react";
import { Input } from "@/components/Input";
import { Card } from "@/components/Card";
import { Search } from "lucide-react";

const AirportAutoComplete = ({onSelect}) => {
    const [query, setQuery] = useState("");
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAirports = async (searchTerm) => {
        if(!searchTerm) return;
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.aviationstack.com/v1/airports?access_key=${process.env.REACT_APP_AVIATIONSTACK_API_KEY}&search=${searchTerm}`
            );
            const data = await response.json();
            setAirports(data.data || []);
        } catch (error) {
            console.error("Error fetching airports:", error);
        }
        setLoading(false);
    };

    const handleChange= (e) => {
        setQuery(e.target.value);
        setchAirports(e.target.value);
    };

    const handleSelect = (airport) => {
        setQuery(`${airport.airport_name} (${airport.iata_code})`);
        setAirports([]);
        onSelect(airport.iata_code);
    };

    return (
        <div className="relative w-full">
            <Input
                type='text'
                value={query}
                placeholder="Search for an airport"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
            />
            {loading && <p className="text-sm text-gray-500">Loading ...</p>}
            {airports.length > 0 && (
                <Card className='absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50'>
                    {airports.map((airport) => (
                        <div key={airport.iata_code} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={()=>handleSelect(airport)}>
                            {airport.airport_name} ({airport.iata_code})
                        </div>
                    ))}
                </Card> 
            )}
        </div>
    )
}  

export default AirportAutoComplete;