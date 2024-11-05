"use client";
// components/Swiper.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules"; // Corrected import path for modern Swiper versions
import { BannerModel } from "@/types/banner";

interface Props {
  banner: BannerModel[];
}
const SwiperComponent = ({ banner }: Props) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="h-[80vh] w-full object-cover"
    >
      {banner.map((list, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className="flex justify-center items-center w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${
                  "http://localhost:8001/uploads/" + list.file
                }')`,
              }}
            >
              <div className="text-center md:text-start px-4 max-w-lg">
                <p className="text-white text-lg md:text-2xl">{list.little}</p>
                <h1 className=" text-3xl md:text-6xl font-bold my-4 text-[#0C9488]">
                  {list.big}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperComponent;
