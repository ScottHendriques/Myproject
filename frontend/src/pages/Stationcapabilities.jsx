import React, { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { MapPin, Phone, Mail, Globe, Clock, User } from "lucide-react";

const data = {
  UAE: {
    states: {
      "Abu Dhabi": {
        agent: "Etihad Airport Services (EAS)",
        location: "Cargo Terminal, Abu Dhabi International Airport",
        phone: "+971 2 505 4721",
        email: "cargosd@eas.co.ae",
        hours: "Open 12:00 AM - 11:59 PM",
        website: "https://www.etihad.com",
        contacts: [
          {
            name: "Huda Abbas Mohamed Bahaj",
            title: "Area Manager Cargo",
            phone: "02 - 5112108",
            email: "hbahaj@etihad.ae",
          },
          {
            name: "Rizza Jebulan",
            title: "Key Account Officer",
            phone: "+971 -02-5116823",
            email: "rjebulan@etihad.ae",
          },
          {
            name: "Chris Eddam Curado Po",
            title: "VIP Desk",
            phone: "02-5511183",
            email: "CEPo@etihad.ae",
          },
        ],
      },
    },
  },
};

const StationCapabilities = () => {
  const { theme } = useThemeStore();
  const [country, setCountry] = useState("UAE");
  const [state, setState] = useState("Abu Dhabi");

  const availableStates = Object.keys(data[country].states);
  const stationInfo = data[country].states[state];

  return (
    <div className="flex flex-col items-center p-10 min-h-screen transition-colors bg-base-100 text-base-content w-full">
      <h2 className="text-3xl font-light">Global</h2>
      <h1 className="text-5xl italic font-semibold">station capabilities</h1>
      <h3 className="text-xl font-bold mt-6">Find a cargo office</h3>
      <p className="text-center max-w-4xl mt-2">
        Learn more about the capabilities of our airports and stations around the world.
      </p>

      <div className="mt-6 space-y-4 w-96">
        <div className="form-control">
          <label className="label">Country</label>
          <select
            className="select select-bordered rounded-2xl w-full"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState(Object.keys(data[e.target.value].states)[0]);
            }}
          >
            {Object.keys(data).map((countryOption) => (
              <option key={countryOption} value={countryOption}>
                {countryOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">State</label>
          <select
            className="select select-bordered rounded-2xl w-full"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {availableStates.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      {stationInfo && (
        <div className="mt-10 shadow-md rounded-2xl p-6 w-full max-w-5xl transition-colors bg-base-200 text-base-content">
          <h2 className="text-2xl font-bold">{state}</h2>

          <div className="mt-4 border rounded-2xl p-6 flex flex-col space-y-4">
            <p className="font-semibold text-lg">Ground handling agent</p>
            <p className="text-gray-700">{stationInfo.agent}</p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={18} /> {stationInfo.location}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} /> {stationInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                <a href={`mailto:${stationInfo.email}`} className="text-blue-600">
                  {stationInfo.email}
                </a>
              </p>
              {stationInfo.website && (
                <p className="flex items-center gap-2">
                  <Globe size={18} />
                  <a href={stationInfo.website} target="_blank" className="text-blue-600">
                    {stationInfo.website}
                  </a>
                </p>
              )}
              <p className="flex items-center gap-2">
                <Clock size={18} /> {stationInfo.hours}
              </p>
            </div>
          </div>

          {stationInfo.contacts && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stationInfo.contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 border rounded-2xl shadow-md transition-colors bg-base-100 text-base-content"
                  >
                    <div className="flex items-center gap-2">
                      <User size={20} className="text-primary" />
                      <p className="font-bold">{contact.name}</p>
                    </div>
                    <p className="text-gray-700">{contact.title}</p>
                    <p className="flex items-center gap-2 mt-2">
                      <Phone size={18} className="text-primary" /> {contact.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={18} className="text-primary" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600">
                        {contact.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StationCapabilities;
