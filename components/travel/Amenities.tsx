import React, { useState } from "react";
import { FaTv, FaWifi, FaThermometerThreeQuarters, FaFirstAid, FaCar, FaFan, FaHotTub } from "react-icons/fa";

export default function Amenities() {
  const [showAll, setShowAll] = useState(false);

  // List of amenities
  const amenities = [
    { name: "TV", icon: <FaTv /> },
    { name: "Wifi", icon: <FaWifi /> },
    { name: "Essentials", icon: <FaFirstAid /> },
    { name: "Air conditioning", icon: <FaFan /> },
    { name: "Heating", icon: <FaThermometerThreeQuarters /> },
    { name: "Hot water", icon: <FaHotTub /> },
    { name: "Free parking", icon: <FaCar /> },
    { name: "Essentials", icon: <FaFirstAid /> },
    { name: "Air conditioning", icon: <FaFan /> },
    { name: "Heating", icon: <FaThermometerThreeQuarters /> },
    { name: "Hot water", icon: <FaHotTub /> },
    { name: "Free parking", icon: <FaCar /> },
    // Additional amenities can be added here
  ];

  // Number of amenities to show before expanding
  const visibleAmenitiesCount = 6;

  return (
    <div className="mt-8">
      {/* <h2 className="text-2xl font-bold mb-4">Amenities</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {amenities.slice(0, showAll ? amenities.length : visibleAmenitiesCount).map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 hover:text-teal-600 text-gray-500">
            <p className="text-2xl ">{amenity.icon}</p>
            <p className="text-lg   ">{amenity.name}</p>
          </div>
        ))}
      </div> 

      {/* Show/Hide Amenities Button */}
      <div className="mt-4">
        <button
          className="text-black border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-600 hover:text-white transition"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Буцах" : `Бүх ${amenities.length} тохилог байдлыг харах`}
        </button>
      </div>
    </div>
  );
}
