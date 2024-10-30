"use client";
import IMGURL from "@/constants/Constants";
import { Travel } from "@/types/travel";
import { useRouter } from "next/navigation";

interface Props {
  travels: Travel[];
}

export default function OutTravel({ travels }: Props) {
  const router = useRouter();

  const handleClick = (id: string) => {
    // Navigate to the details page using the id
    router.push(`../travel/details/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mx-4 ">Онцлох Аяллууд</h1>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 mt-4">
        {travels.map((destination, index) => (
          <div
            key={destination._id}
            onClick={() => handleClick(destination._id)}
            className="relative bg-white rounded-lg overflow-hidden shadow-md flex flex-col"
          >
            <img
              src={IMGURL + destination?.coverPhoto}
              alt={"1"}
              className="w-full h-48 object-cover"
            />
            {destination.price && (
              <div className="absolute top-0 left-0 bg-teal-500 text-white text-xs px-2 py-1">
                {destination.price}
              </div>
            )}
            <div className=" mx-4 my-3">
              {destination.duration && (
                <p className="text-gray-600 text-sm mb-1 line-clamp-1">
                  {destination.duration}
                </p>
              )}
              <p className="text-gray-500 text-sm line-clamp-1 ">
                {destination.title}
              </p>
            </div>
            <div className="mt-auto">
              <button className="relative w-full mt-1 py-2 text-black border border-teal-600 rounded-b-lg overflow-hidden transition-all duration-300 hover:text-white hover:bg-teal-600">
                <span className="relative z-10">Захиалах</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
