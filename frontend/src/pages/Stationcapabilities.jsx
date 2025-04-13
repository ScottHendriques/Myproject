import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { MapPin, Phone, Mail, Globe, Clock, User } from "lucide-react";

const StationCapabilities = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [station, setStation] = useState(null);
  const [error, setError] = useState("");

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/stations/countries");
        setCountries(response.data.countries || []);
      } catch (err) {
        setError("Failed to fetch countries");
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await axiosInstance.get("/stations/states", {
            params: { country: selectedCountry },
          });
          setStates(response.data.states || []);
          setSelectedState(""); // Reset state when country changes
          setStation(null); // Clear station data
        } catch (err) {
          setError("Failed to fetch states");
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch station data when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchStation = async () => {
        try {
          const response = await axiosInstance.get("/stations", {
            params: { country: selectedCountry, state: selectedState },
          });
          setStation(response.data.station || null);
          setError("");
        } catch (err) {
          setError("Station not found");
          setStation(null);
        }
      };
      fetchStation();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className="flex flex-col items-center mt-10 p-10 min-h-screen  ">
      <h2 className="text-3xl font-light">Global</h2>
      <h1 className="text-5xl italic font-semibold">station capabilities</h1>
      <h3 className="text-xl font-bold mt-6">Find a cargo office</h3>
      <p className="mt-2 ">
        Find a cargo office. Learn more about the capabilities of our airports and stations around the world.
      </p>

      <div className="mt-6 w-full max-w-2xl space-y-4">
        <div className="form-control">
          <label className="label">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="select select-bordered rounded-2xl w-full bg-gray-800 "
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="select select-bordered rounded-2xl w-full bg-gray-800 "
            disabled={!selectedCountry}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {station && (
          <div className="mt-6 p-6  rounded-2xl border ">
            <h2 className="text-2xl font-semibold ">
              {selectedState}
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Ground Handling Agent:</strong> {station.agent}
              </p>
              <p>
                <MapPin className="inline mr-2" /> {station.location}
              </p>
              <p>
                <Phone className="inline mr-2" /> {station.phone}
              </p>
              <p>
                <Mail className="inline mr-2" /> {station.email}
              </p>
              <p>
                <Globe className="inline mr-2" />{" "}
                <a href={station.website} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                  {station.website}
                </a>
              </p>
              <p>
                <Clock className="inline mr-2" /> {station.hours}
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-6">Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {station.contacts.map((contact, index) => (
                <div key={index} className="p-4  border rounded-lg">
                  <p>
                    <User className="inline mr-2" /> {contact.name}
                  </p>
                  <p>
                    <strong>Title:</strong> {contact.title}
                  </p>
                  <p>
                    <Phone className="inline mr-2" /> {contact.phone}
                  </p>
                  <p>
                    <Mail className="inline mr-2" /> {contact.email}
                  </p>
                  <p>
                    <MapPin className="inline mr-2" /> {contact.address}
                  </p>
                  <p>
                    <Globe className="inline mr-2" />{" "}
                    <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                      {contact.website}
                    </a>
                  </p>
                  <p>
                    <Clock className="inline mr-2" /> {contact.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationCapabilities;