"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const destinations = [
  {
    id: 1,
    image: "/images/img20.jpg", // Update with your image path
    title: "Даатгал",
    description: "Бид аяллын аюулгүй байдлыг хангах зорилгоор аяллын даатгалд хамруулдаг",
  },
  {
    id: 2,
    image: "/images/img21.jpg", // Update with your image path
    title: "Виз",
    description: "Та өөрийн мэдээллийг үнэн зөвөөр мэдүүлэх болон зорчих зорилго, аялаад ирэх санхүүгийн чадамжаа бүрэн нотолж харуулах хэрэгтэй",
  },
  {
    id: 3,
    image: "/images/img19.jpg", // Update with your image path
    title: "Ачаа",
    description: "Монгол улсын гаалийн хилээр нэвтрэх гэдэг нь хилээр орох, гарах, дамжин өнгөрөхийг хэлнэ",
  },
  {
    id: 4,
    image: "/images/img27.jpg", // Update with your image path
    title: "Галт тэрэгний хуваарь",
    description: "Монгол улсын гаалийн хилээр нэвтрэх гэдэг нь хилээр орох, гарах, дамжин өнгөрөхийг хэлнэ",
    externalLink: "https://eticket.ubtz.mn/schedule", // External link for slide 4
  },
  {
    id: 5,
    image: "/images/img26.jpg", // Update with your image path
    title: "Онгоцны хуваарь",
    description: "Монгол улсын гаалийн хилээр нэвтрэх гэдэг нь хилээр орох, гарах, дамжин өнгөрөхийг хэлнэ",
    externalLink: "https://www.ulaanbaatar-airport.mn/international-flights", // External link for slide 5
  },
];

export default function Informations() {
  const router = useRouter(); // Initialize the router

  const handleSlideClick = (destination: any) => {
    // If the slide has an external link, open in a new tab
    if (destination.externalLink) {
      window.open(destination.externalLink, '_blank');
    } else {
      // Otherwise, navigate to the details page for internal slides
      router.push(`/informations/details/${destination.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-1 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">
        Танд хэрэгтэй
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative mb-12 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleSlideClick(destination)} // Handle the click event
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="mt-4 px-4 mb-4">
                <h3 className="text-lg font-semibold text-black">
                  {destination.title}
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="line-clamp-3">{destination.description}</span>{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
