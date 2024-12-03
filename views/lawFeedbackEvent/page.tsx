"use client";
import React, { useState, useEffect } from "react";
import { Form } from "@/types/form";
import Link from "next/link";
import { Trash, Eye } from "lucide-react";
import axiosInstance from "@/hooks/axios";

const NewsList = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Form[]>([]); // State for fetched data

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://shijir.tanuweb.cloud/api/v1lawevent", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const data = await res.json();
        setFormData(data.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once after initial render

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axiosInstance
          .delete("lawevent/" + id)
          .then(() => {
            alert("Амжилттай устгагдлаа");
            window.location.reload();
          })
          .catch(() => alert("Алдаа гарлаа"));
      }
    }
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base font-bold sm:text-lg ml-4">
          Хуулийн саналууд
        </span>

        <Link
          href="/FeedbackEvent/add"
          className="px-3 py-1 sm:px-4 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
        >
          <span>Хуулийн санал нэмэх</span>
        </Link>
      </div>
      {/* Content Section */}
      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Summary Card */}
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-black/50 font-light">
              Нийт хуулийн санал
            </span>
            <span className="font-semibold text-sm lg:text-lg ml-8">
              {formData?.length}
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="text-[#162C43] rounded-lg w-full min-w-[700px]">
            <thead className="bg-[#FAFAFA] rounded-lg w-full">
              <tr>
                <th className=" text-center py-4 px-2 text-xs lg:text-sm font-light">
                  Д/д
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Хуулийн Нэр
                </th>
              </tr>
            </thead>
            <tbody>
              {formData?.map((list, index) => (
                <tr key={index} className="">
                  <td className="text-xs lg:text-sm text-center  py-2 lg:py-4">
                    {index + 1}
                  </td>

                  <td>
                    <span className="text-xs lg:text-sm">{list.title}</span>
                  </td>

                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={`/lawList/${list._id}`}>
                        <Eye
                          color="orange"
                          size={20}
                          className="cursor-pointer"
                        />
                      </Link>

                      <Trash
                        color="red"
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          handleDelete(list._id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className="bg-white p-4 rounded-lg">
            <img
              src={selectedImage}
              alt="Full Size"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewsList;
