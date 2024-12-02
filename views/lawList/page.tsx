"use client";
import React, { useState, useEffect } from "react";
import { Form } from "@/types/form";
import { useParams } from "next/navigation";
import { Trash } from "lucide-react";
import axiosInstance from "@/hooks/axios";

interface Props {
  form: Form[];
}

const FormFeedback = ({ form }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = useParams(); // Fetch ID from URL parameters
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);

  useEffect(() => {
    if (id) {
      // Fetch data from API
      axiosInstance
        .get(`lawevent/${id}`)
        .then((res) => {
          // Check if the response contains the 'data' field and it is an array
          const lawData = res?.data?.data;

          if (lawData) {
            // Extract 'childrens' from the first item in the lawData array
            //@ts-ignore
            const childrens = lawData?.childrens || [];
            setFilteredForms(childrens); // Set the state to children's data
          } else {
            setFilteredForms([]); // Fallback if the data is invalid
            console.error("Fetched data is not in expected format");
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setFilteredForms([]); // Fallback in case of error
        });
    }
  }, [id]);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Content Section */}
      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Summary Card */}
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-black/50 font-light">
              Нийт хуулийн санал
            </span>
            <span className="font-semibold text-sm lg:text-lg ml-8">
              {filteredForms.length}
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="text-[#162C43] rounded-lg w-full min-w-[700px]">
            <thead className="bg-[#FAFAFA] rounded-lg w-full">
              <tr>
                <th className="text-center py-4 px-2 text-xs lg:text-sm font-light">
                  Д/д
                </th>
                <th className="text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Овог ,Нэр
                </th>
                <th className="text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Имэйл хаяг
                </th>
                <th className="text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Утас
                </th>
                <th className="text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Агуулга
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Render the table rows if filteredForms is an array */}
              {Array.isArray(filteredForms) && filteredForms.length > 0 ? (
                filteredForms.map((list, index) => (
                  <tr key={index}>
                    <td className="text-xs lg:text-sm text-center py-2 lg:py-4">
                      {index + 1}
                    </td>
                    <td>
                      <div className="p-1">
                        {list.surname} {list.firstName}
                      </div>
                    </td>
                    <td>
                      <span className="text-xs lg:text-sm">{list.email}</span>
                    </td>
                    <td>
                      <span className="text-xs lg:text-sm">{list.phone}</span>
                    </td>
                    <td>
                      <span className="text-xs lg:text-sm line-clamp-2 w-[500px]">
                        {list.content}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-sm">
                    Мэдээлэл байхгүй байна.
                  </td>
                </tr>
              )}
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

export default FormFeedback;
