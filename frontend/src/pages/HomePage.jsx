import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

import img1 from "../images/Air-Freight-Banner.png";
import img2 from "../images/Aircraft-stream.png";
import img3 from "../images/emirates.jpg";

const sections = [
  {
    title: "Book",
    subtitle: "Fly your shipments with us anytime, anywhere",
    image: img1,
    buttonText: "Click Here",
  },
  {
    title: "Track your shipments",
    subtitle: "Retrieve your shipment status",
    image: img2,
    buttonText: "Track Flight", // New button instead of input
  },
  {
    title: "Flight Schedule",
    subtitle: "Every Flight at a Glance",
    image: img3,
    buttonText: "View Schedule", // Replaced input fields with a button
  },
];

const HomePage = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleBooking = () => {
    if (authUser) {
      navigate("/booking");
    } else {
      navigate("/login");
    }
  };

  const handleTracking = () => {
    navigate("/tracking/EY204"); // Redirects to tracking page with default flight number
  };

  const handleSchedule = () => {
    navigate("/flight-schedule"); // Redirects to flight schedule page
  };

  return (
    <div className="flex w-full min-h-screen">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="relative flex-1 p-6 flex flex-col justify-center items-center transition-all cursor-pointer"
          style={{ backgroundImage: `url(${section.image})` }}
          onHoverStart={() => setHovered(index)}
          onHoverEnd={() => setHovered(null)}
          animate={{ flex: hovered === index ? 2 : 1 }}
        >
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <p className="text-sm mt-2">{section.subtitle}</p>
          {hovered === index && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              {section.buttonText && (
                <button
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
                  onClick={
                    section.title === "Track your shipments"
                      ? handleTracking
                      : section.title === "Flight Schedule"
                      ? handleSchedule
                      : handleBooking
                  }
                >
                  {section.buttonText}
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default HomePage;
