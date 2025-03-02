import React, { useState } from "react";
import "../style/stationCapabilities.css";

const StationCapabilities = () => {
  const data = {
    "UAE": {
      states: {
        "Abu Dhabi": {
          agent: "Etihad Airport Services (EAS)",
          location: "Cargo Terminal, Abu Dhabi International Airport",
          phone: "+971 2 505 4721",
          email: "cargosd@eas.co.ae",
          hours: "Open 12:00 AM - 11:59 PM"
        },
        "Dubai": {
          agent: "Dubai Cargo Services",
          location: "Dubai International Airport, Cargo Village",
          phone: "+971 4 224 5555",
          email: "cargo@dubaicargo.ae",
          hours: "Open 6:00 AM - 10:00 PM"
        }
      }
    },
    "India": {
      states: {
        "Mumbai": {
          agent: "Mumbai Cargo Handlers",
          location: "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
          phone: "+91 22 6685 5555",
          email: "cargo@mumbaicargo.in",
          hours: "Open 9:00 AM - 9:00 PM"
        }
      }
    }
  };

  const [country, setCountry] = useState("UAE");
  const [state, setState] = useState("Abu Dhabi");

  const availableStates = Object.keys(data[country].states);
  const stationInfo = data[country].states[state];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container">
        <h2 className="title">Global</h2>
        <h1 className="subtitle">station capabilities</h1>
        <h3 className="find">Find a cargo office</h3>
        <p className="description">
          Learn more about the capabilities of our airports and stations around the world.
        </p>
        
        <div className="dropdown-wrapper">
          <div className="dropdown-container">
            <label htmlFor="country">Country</label>
            <select id="country" className="dropdown" value={country} onChange={(e) => {
              setCountry(e.target.value);
              setState(Object.keys(data[e.target.value].states)[0]);
            }}>
              <option>UAE</option>
              <option>India</option>
            </select>
          </div>
          
          <div className="dropdown-container">
            <label htmlFor="state">State</label>
            <select id="state" className="dropdown" value={state} onChange={(e) => setState(e.target.value)}>
              {availableStates.map((stateOption) => (
                <option key={stateOption}>{stateOption}</option>
              ))}
            </select>
          </div>
        </div>
        
        {stationInfo && (
          <div className="station-info">
            <h3>{state}</h3>
            <h4>Import</h4>
            <div className="info-card">
              <b>Ground handling agent</b>
              <p>{stationInfo.agent}</p>
              <p className="location">📍 {stationInfo.location}</p>
              <p className="phone">📞 {stationInfo.phone}</p>
              <p className="email">📧 <a href={`mailto:${stationInfo.email}`}>{stationInfo.email}</a></p>
              <p className="hours">🕒 {stationInfo.hours}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationCapabilities;
