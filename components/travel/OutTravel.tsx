"use client";
import IMGURL from "@/constants/Constants";
import { Travel } from "@/types/travel";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  travels: Travel[];
}

export default function OutTravel({ travels }: Props) {
  const [travelData, setTravelData] = useState(travels);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle click to navigate to details
  const handleClick = (id: string) => {
    router.push(`../travel/details/${id}`);
  };

  useEffect(() => {
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let filteredTravels = [...travels];

    // Filter by category
    if (category && category !== "all") {
      filteredTravels = filteredTravels.filter(
        (travel) => travel.category._id === category
      );
    }

    // Filter by price range if provided
    if (minPrice && maxPrice) {
      filteredTravels = filteredTravels.filter(
        (travel) =>
          Number(travel.price) >= Number(minPrice) &&
          Number(travel.price) <= Number(maxPrice)
      );
    }

    // Update the filtered travels
    setTravelData(filteredTravels);
  }, [searchParams, travels]);

  return (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 w-full ">
      {travelData?.map((destination, index) => (
        <div
          key={destination._id}
          onClick={() => handleClick(destination._id)}
          className="relative bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-[30vh]"
        >
          <img
            src={IMGURL + destination.coverPhoto}
            alt={destination.title}
            className="w-full h-48 object-cover"
          />
          {destination.price && (
            <div className="absolute top-0 left-0 bg-teal-500 text-white text-xs px-2 py-1">
              {destination.price}₮
            </div>
          )}
          <div className="mx-4 mt-2">
            <h3 className="text-lg font-semibold mb-1 text-black line-clamp-1">
              {destination.title}
            </h3>
            {destination.duration && (
              <p className="text-gray-600 text-sm mb-1 line-clamp-1">
                {destination.duration}
              </p>
            )}
          </div>
          <div className="mt-auto">
            <button className="relative w-full mt-4 py-2 text-black border border-teal-600 rounded-b-lg overflow-hidden transition-all duration-300 hover:text-white hover:bg-teal-600">
              <span className="relative z-10">Захиалах</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
