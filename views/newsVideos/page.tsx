"use client";
import React, { useState } from "react";
import { Travel } from "@/types/travel";
import { BannerModel } from "@/types/banner";

import { Edit, Trash } from "lucide-react";
import axiosInstance from "@/hooks/axios";
import Link from "next/link";
import { IMGURL } from "@/hooks/axios";

interface Props {
  news: Travel[];
  banner: BannerModel[];
}

const NewsList = ({ news, banner }: Props) => {
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

          .delete("videos/" + id)
          .then(() => {
            alert("Амжилттай устгагдлаа");
            window.location.reload();
          })
          .catch(() => alert("Алдаа гарлаа"));
      }
    }
  };
  const handleBannerDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axiosInstance

          .delete("videosbanner/" + id)
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
      {/* Header Section */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-xs sm:text-sm lg:text-lg text-[#162C43]">
          Видео мэдээний жагсаалт
        </span>
        <div className="space-x-2 sm:space-x-4">
          <Link
            href="/videosnews/add"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-white bg-[#3749E5] text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          >
            Видео мэдээ нэмэх
          </Link>
          <Link
            href="/videosnews/addBanner"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-white bg-[#3749E5] text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          >
            Видео Баннер нэмэх
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-full bg-white border p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banner.map((list, index) => (
            <div
              key={index}
              className="w-full rounded-lg overflow-hidden relative group hover:border-b transition-all duration-300"
            >
              <div className="absolute bottom-0 right-4 p-6 z-0 text-right">
                <span className="text-[#58CFF4] text-[10px] w-[100%] font-bold line-clamp-3">
                  {list?.title}
                  <br />
                </span>
                <span className="text-[6px] text-white w-full mt-4 font-inter line-clamp-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: list?.description }}
                  />
                </span>
              </div>

              <div className="w-full group-hover:flex group-hover:border items-center justify-around absolute hidden h-16 sm:h-20 bg-white bottom-0 z-10 transition-all duration-300">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleBannerDelete(list?._id!)}
                >
                  <Trash size={18} className="cursor-pointer text-red-500" />
                  <span className="text-xs sm:text-sm text-red-500">
                    Устгах
                  </span>
                </div>
                <Link
                  href={"/videosnews/editBanner/" + list._id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Edit size={18} className="cursor-pointer text-orange-500" />
                  <span className="text-xs sm:text-sm text-orange-500">
                    Засах
                  </span>
                </Link>
              </div>

              <div className="absolute bg-[#0C9488] text-white px-4 sm:px-8 py-1 rounded-bl-lg right-0 top-0 text-xs sm:text-sm">
                <span>{"Зураг"}</span>
              </div>

              <img
                src={IMGURL + list.photo}
                className="w-full h-auto object-cover aspect-video z-0"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Summary Card */}
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-black/50 font-light">
              Нийт Видео мэдээ
            </span>
            <span className="font-semibold text-sm lg:text-lg ml-8">
              {news?.length}
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
                  Мэдээний зураг
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Мэдээний гарчиг
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Мэдээний тайлбар
                </th>
                <th className=" text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {news?.map((list, index) => (
                <tr key={index} className="">
                  <td className="text-xs lg:text-sm text-center  py-2 lg:py-4">
                    {index + 1}
                  </td>
                  <td>
                    <div className="p-1">
                      <img
                        src={IMGURL + list.photo}
                        alt=""
                        className="w-20 h-10 aspect-square bg-[#CEEEEE] rounded cursor-pointer"
                        onClick={() => openImageModal(IMGURL + list.photo)}
                      />
                    </div>
                  </td>
                  <td>
                    <span className="text-xs lg:text-sm line-clamp-1">
                      <div
                        dangerouslySetInnerHTML={{ __html: list.description }}
                      />
                    </span>
                  </td>
                  <td>
                    <span className="text-xs lg:text-sm line-clamp-2 w-[500px]">
                      <div
                        dangerouslySetInnerHTML={{ __html: list.description }}
                      />
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={"/videosnews/edit/" + list._id}>
                        <Edit
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
