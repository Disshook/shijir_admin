"use client";
import React, { useState } from "react";
import { Form } from "@/types/form";

import { Trash } from "lucide-react";
import axiosInstance from "@/hooks/axios";

interface Props {
  form: Form[];
}

const FormFeedback = ({ form }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axiosInstance

          .delete("lawfeedback/" + id)
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
      {/* Content Section */}
      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Summary Card */}
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-black/50 font-light">
              Нийт хуулийн санал
            </span>
            <span className="font-semibold text-sm lg:text-lg ml-8">
              {form?.length}
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
                  Овог ,Нэр
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Имэйл хаяг
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Утас
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Агуулга
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {form?.map((list, index) => (
                <tr key={index} className="">
                  <td className="text-xs lg:text-sm text-center  py-2 lg:py-4">
                    {index + 1}
                  </td>
                  <td>
                    <div className="p-1">
                      {list.surname} <br />
                      {list.firstName}
                    </div>
                  </td>
                  <td>
                    <span className="text-xs lg:text-sm">{list.email}</span>
                  </td>
                  <td>
                    <span className="text-xs lg:text-sm ">{list.phone}</span>
                  </td>
                  <td>
                    <span className="text-xs lg:text-sm line-clamp-2 w-[500px]">
                      {list.content}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-4">
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

export default FormFeedback;
