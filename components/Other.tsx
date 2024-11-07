"use client";
import { useRouter } from "next/navigation";

const destinations = [
  { 
    id: 1, 
    image: "/images/img1.jpg",
    price: "₮2,999,000",
    title: "Tokya / Japan",
    travelDay: "4 өдөр / 3 шөнө",
    description:
      "TUSCANY Lorem ipsum dolor sit amet consectetur adipisicing elit. In explicabo soluta harum adipisci totam.",
    book: "Захиалах",
  },
  { id: 2,
    image: "/images/img2.jpg",
    price: "₮2,999,000",
    title: "Travelzoo members / NOLA hotel",
    travelDay: "4 day / 3 night",
    description: "Lorem ipsum dolor sit amet consectetur.",
    book: "Захиалах",
  },
  {
    id: 3,
    image: "/images/img3.jpg",
    price: "₮2,999,000",
    title: "Travelzoo members / NOLA hotel",
    travelDay: "4 day / 3 night",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dignissimos placeat.",
    book: "Захиалах",
  },
  {
    id: 4,
    image: "/images/img4.jpg",
    price: "₮2,999,000",
    title: "Travelzoo members / NOLA hotel",
    travelDay: "4 day / 3 night",
    description: "Lorem ipsum dolor sit amet consectetur.",
    book: "Захиалах",
  },
];

export default function OtherTravel() {
  const router = useRouter();

  const handleClick = (id: number) => {
    // Navigate to the details page using the id
    router.push(`../travel/details/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mx-4">Бусад Аяллууд</h1>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            onClick={() => handleClick(destination.id)}
            className="relative bg-white rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-48 object-cover"
            />
            {destination.price && (
              <div className="absolute top-0 left-0 bg-teal-500 text-white text-xs px-2 py-1">
                {destination.price}
              </div>
            )}
            <div className="h-32 mx-4 mt-2">
              <h3 className="text-lg font-semibold mb-1">{destination.title}</h3>
              {destination.travelDay && (
                <p className="text-gray-600 text-sm mb-1">
                  {destination.travelDay}
                </p>
              )}
              <p className="text-gray-500 text-sm line-clamp-2">
                {destination.description}
              </p>
            </div>
            <div className="mt-auto">
              <button 
                className="relative w-full mt-1 py-2 text-black border border-teal-600 rounded-b-lg overflow-hidden transition-all duration-300 hover:text-white hover:bg-teal-600">
                <span className="relative z-10">{destination.book}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
