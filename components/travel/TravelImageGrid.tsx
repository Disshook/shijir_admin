"use client";
import IMGURL from "@/constants/Constants";
import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  gallery: string[];
}
const TravelImageGrid = ({ gallery }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setCurrentImageIndex(null);
  };

  const prevImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + gallery.length) % gallery.length
      );
    }
  };

  const nextImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex + 1) % gallery.length);
    }
  };

  return (
    <div>
      <div className="mx-4 mt-8 lg:mx-20">
        {/* Grid of Images */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {gallery.slice(0, 4).map((location, index) => (
            <div
              key={location}
              className={`relative overflow-hidden rounded-lg shadow-lg `}
              style={{ height: "300px" }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={IMGURL + location}
                alt={`Travel Location ${location}`}
                className="object-cover h-full w-full cursor-pointer"
              />
            </div>
          ))}
        </div> */}
        <div className="w-full flex items-center gap-1">
          <img
            src={IMGURL + gallery[0]}
            alt={`Travel Location `}
            onClick={() => handleImageClick(0)}
            className="object-cover h-[30vh] w-[30%] cursor-pointer rounded"
          />
          <img
            src={IMGURL + gallery[1]}
            alt={`Travel Location`}
            onClick={() => handleImageClick(1)}
            className="object-cover h-[30vh] w-[70%] cursor-pointer rounded"
          />
        </div>
        <div className="w-full flex items-center gap-1 mt-1">
          <img
            src={IMGURL + gallery[2]}
            alt={`Travel Location `}
            onClick={() => handleImageClick(2)}
            className="object-cover h-[30vh] w-[50%] cursor-pointer rounded"
          />
          <img
            src={IMGURL + gallery[3]}
            alt={`Travel Location`}
            onClick={() => handleImageClick(3)}
            className="object-cover h-[30vh] w-[25%] cursor-pointer rounded"
          />
          <div className="object-cover h-[30vh] w-[25%] cursor-pointer rounded  flex items-center justify-center relative overflow-hidden">
            <img
              src={IMGURL + gallery[1]}
              alt={`Travel Location `}
              onClick={() => handleImageClick(3)}
              className="object-cover h-[30vh] w-full  cursor-pointer rounded"
            />
            <span
              className="text-white absolute w-full h-full bg-black bg-opacity-80 flex items-center justify-center"
              onClick={() => handleImageClick(3)}
            >
              See More {gallery.length - 4}
            </span>
          </div>
        </div>

        {/* Image Modal */}
        {currentImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            {/* Close Button */}
            <button
              className="absolute top-4 left-4 text-white text-2xl"
              onClick={closeImageModal}
            >
              <FaTimes />
            </button>

            {/* Previous Image Button */}
            <button
              className="absolute left-8 text-white text-3xl"
              onClick={prevImage}
            >
              <FaChevronLeft />
            </button>

            {/* Next Image Button */}
            <button
              className="absolute right-8 text-white text-3xl"
              onClick={nextImage}
            >
              <FaChevronRight />
            </button>

            {/* Display Current Image */}
            <div className="max-w-full max-h-full px-4 sm:px-0">
              <img
                src={IMGURL + gallery[currentImageIndex]}
                alt={`Travel Location ${gallery[currentImageIndex]}`}
                className="object-contain h-[50vh] w-full sm:h-[60vh] md:h-[70vh] lg:h-[80vh] lg:w-[80vw] xl:w-[70vw]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelImageGrid;
