import React, { useState } from "react";
import {motion} from 'framer-motion';

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
    inputFields: ["AWB Number"],
  },
  {
    title: "Flight Schedule",
    subtitle: "Every Flight at a Glance",
    image: img3,
    inputFields: ["Origin","Destination","Date"],
  },
];

const HomePage = () => {
  const [hovered,setHovered] = useState(null);

  return(
    <div className="flex w-full h-screen">
      {sections.map((section, index) => (
        <motion.div 
          key={index} 
          className="relative flex-1 p-6 flex flex-col justify-center items-center transition-all cursor-pointer" 
          style={{backgroundImage: `url(${section.image})`}}
          onHoverStart={() => setHovered(index)} 
          onHoverEnd={() => setHovered(null)} 
          animate={{flex: hovered === index ? 2 : 1}}
        >
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <p className="text-sm mt-2">{section.subtitle}</p>
          {hovered === index && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="mt-4"
            >
              {section.buttonText && (
                <button className="px-4 py-2 rounded-lg">
                  {section.buttonText}
                </button>
              )}
              {section.inputFields && (
                <div className="flex flex-col gap-2 mt-4">
                  {section.inputFields.map((field,idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={field}
                      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink opacity-50"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
};

export default HomePage;