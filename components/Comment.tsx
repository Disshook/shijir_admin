"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const comments = [
  {
    name: "Sarah Park",
    stated: "09/05/2024",
    comment: "My unforgettable journey with Wandertrex exceeded all expectations! As a busy architect, I rarely have time to plan trips, but Wandertrex took care of everything",
    imgSrc: "/images/pro/pro1.jpg"
  },
  {
    name: "Minnie Lee",
    stated: "18/07/2022",
    comment: "Exploring the rugged trails of Seoraksan National Park was a dream come true. The breathtaking views of towering peaks and lush forests were simply mesmerizing.",
    imgSrc: "/images/pro/pro2.jpg"
  },
  {
    name: "Sarah Park",
    stated: "09/05/2024",
    comment: "My unforgettable journey with Wandertrex exceeded all expectations! As a busy architect, I rarely have time to plan trips, but Wandertrex took care of everything",
    imgSrc: "/images/pro/pro1.jpg"
  },
  {
    name: "Minnie Lee",
    stated: "18/07/2022",
    comment: "Exploring the rugged trails of Seoraksan National Park was a dream come true. The breathtaking views of towering peaks and lush forests were simply mesmerizing.",
    imgSrc: "/images/pro/pro2.jpg"
  },
  {
    name: "Sarah Park",
    stated: "09/05/2024",
    comment: "My unforgettable journey with Wandertrex exceeded all expectations! As a busy architect, I rarely have time to plan trips, but Wandertrex took care of everything",
    imgSrc: "/images/pro/pro3.jpg"
  },
  {
    name: "Minnie Lee",
    stated: "18/07/2022",
    comment: "Exploring the rugged trails of Seoraksan National Park was a dream come true. The breathtaking views of towering peaks and lush forests were simply mesmerizing.",
    imgSrc: "/images/pro/pro4.jpg"
  },
  // Your comments array...
];

export default function CommentSection() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto py-1 px-4">
      <h2 className="text-3xl font-bold text-black mb-6">
        Сэтгэгдлүүд
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
        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div className="relative mb-12 rounded-lg overflow-hidden shadow-lg cursor-pointer  w-full h-80 flex flex-col justify-between">
              <p className="text-gray-500 mx-4 mt-2 text-lg">"{comment.comment}"</p>
              <div className="mt-4 px-4 mb-4 flex-grow flex items-end">
                <div className="flex items-center w-full">
                  <img
                    src={comment.imgSrc}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="text-lg font-semibold text-teal-500">
                      {comment.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {comment.stated}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
