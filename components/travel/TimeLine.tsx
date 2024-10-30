import React, { useState } from 'react';
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";



const Timeline = () => {
  const itinerary = [
    { day: 'Day 1', activities: 'Arrive at the destination and check in at the hotel.' },
    { day: 'Day 2', activities: 'City tour and visit to the main attractions.' },
    { day: 'Day 3', activities: 'Leisure day with optional excursions.' },
    { day: 'Day 4', activities: 'Check out and depart from the destination.' },
    { day: 'Day 5', activities: 'Check out and depart from the destination.' },
  ];

  // State to track the open/closed status of each day's activities
  const [openDay, setOpenDay] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDay(openDay === index ? null : index); // Toggle between open and closed
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <div className="w-full max-w-md">
        <h2 className="text-2xl text-start font-bold mb-4">Товч хөтөлбөр :</h2> 
        {itinerary.map((event, index) => (
          <div key={index} className="mb-4 ">
            {/* Day and Toggle Button */}
            <div className="flex items-center cursor-pointer my-2 py-2" onClick={() => toggleDropdown(index)}>
              <div className="text-teal-500 text-2xl">
                {openDay === index ? <RxEyeOpen /> : <GoEyeClosed />}
              </div>
              <div className="text-black mx-2">
                <p className=" text-2xl">{event.day}</p>
              </div>
            </div>


            {/* Activities - Toggle Visibility */}
            {openDay === index && (
              <div className="mx-8">
                <p className="text-gray-600">{event.activities}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
