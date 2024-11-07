"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPhone } from "react-icons/fa6";
import { useParams } from "next/navigation";
import TravelMap from "./TravelMap";
import Amenities from "./Amenities";
import { Travel } from "@/types/travel";

interface Props {
  travelData: Travel;
}

export default function TravelTabs({ travelData }: Props) {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [travel, setTravel] = useState<Travel | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    setTravel(travelData);
  }, [id]);

  if (!travel)
    return (
      <div className="flex justify-center text-3xl font-bold">Loading...</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 w-full">
      {/* Responsive grid for main content and booking section */}
      <div className="flex flex-col lg:flex-row lg:space-x-1">
        {/* Left Content Section */}
        <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-6 mb-6 lg:mb-0">
          <h1 className="text-2xl lg:text-2xl font-light mb-4 text-black ">
            {travel.title}
          </h1>
          <p className=" text-[#cecece] font-light mb-4">{travel.duration}</p>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8 text-base lg:text-xl">
            <nav
              className="flex items-start justify-between 
              overflow-auto gap-1"
            >
              <button
                className={`py-2 font-medium text-sm w-full rounded-t-lg border-t border-l border-r ${
                  activeTab === "Overview"
                    ? "text-black border-b-2 border-teal-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Overview")}
              >
                Аялалын тухай
              </button>
              <button
                className={`py-2 font-medium text-sm w-full  rounded-t-lg border-t border-l border-r  ${
                  activeTab === "Itinerary"
                    ? "text-black border-b-2 border-teal-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Itinerary")}
              >
                Хөтөлбөр
              </button>
              <button
                className={`py-2 font-medium text-sm  w-full rounded-t-lg border-t border-l border-r ${
                  activeTab === "Highlights"
                    ? "text-black border-b-2 border-teal-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Highlights")}
              >
                Нэмэлт мэдээлэл
              </button>
              <button
                className={`py-2 font-medium text-sm  w-full rounded-t-lg border-t border-l border-r  ${
                  activeTab === "Map"
                    ? "text-black border-b-2 border-teal-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Map")}
              >
                Газрын зураг
              </button>
              <button
                className={`py-2 font-medium text-sm  w-full rounded-t-lg border-t border-l border-r  ${
                  activeTab === "Amenities"
                    ? "text-black border-b-2 border-teal-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Amenities")}
              >
                Тохилог байдал
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "Overview" && (
              <div className="text-base lg:text-lg text-gray-600">
                <div dangerouslySetInnerHTML={{ __html: travel.description }} />
              </div>
            )}

            {/* {activeTab === "Itinerary" && (
              <div className="max-h-96 overflow-y-auto">
                {travel.itinerary.map((dayPlan, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start">
                      <h3 className="text-lg lg:text-xl font-bold">
                        {dayPlan.day}
                      </h3>
                      <p className="text-lg lg:text-xl mx-3 text-gray-700">
                        {dayPlan.activities}
                      </p>
                    </div>
                    <p className="text-base lg:text-lg text-gray-600 ml-20">
                      {dayPlan.detailed}
                    </p>
                  </div>
                ))}
              </div>
            )} */}

            {/* {activeTab === "Highlights" && (
              <div>
                <h2 className="text-lg lg:text-xl font-bold mb-4">
                  Аялын зардалд багтсан :
                </h2>
                <ul className="list-disc ml-6">
                  {travel.highlights1.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-base lg:text-lg text-gray-600"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <h2 className="text-lg lg:text-xl font-bold my-4">
                  Аялын зардалд багтаагүй :
                </h2>
                <ul className="list-disc ml-6">
                  {travel.highlights2.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-base lg:text-lg text-gray-600"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {activeTab === "Map" && (
              <div>
                <TravelMap />
              </div>
            )}

            {activeTab === "Amenities" && (
              <div>
                <Amenities />
              </div>
            )}
          </div>
        </div>

        {/* Right Booking Section */}
        <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <div className="text-2xl  font-bold text-teal-600">
            {travel.price}₮
          </div>
          <p className="text-gray-600 mb-4 text-base lg:text-lg">
            Нэг хүний үнэ{" "}
          </p>

          <button className="bg-white text-black border text-sm border-teal-600 hover:bg-teal-600 hover:text-white   py-4 px-6 w-full rounded-lg mt-6">
            Захиалах
          </button>

          <button className="bg-white text-black border mt-12 text-start border-teal-600 hover:bg-teal-600 hover:text-white text-sm py-3 px-6 w-full rounded-lg">
            <div className="flex items-center">
              <FaPhone className="text-sm" />
              <p className="mx-2">+976-7700-1005</p>
            </div>
            <h1 className="text-sm">Аяллын зөвлөхтэй холбогдоорой</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
