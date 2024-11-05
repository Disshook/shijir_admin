"use client";
import { BannerModel } from "@/types/banner";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "axios";

interface Props {
  banner: BannerModel[];
}

const BannerList = ({ banner }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("http://localhost:8001/api/v1/banner/" + id)
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
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between  sm:px-10  top-0 z-0">
        <span className="text-[#162C43] text-sm sm:text-lg">
          Баннер жагсаалт
        </span>
        <Link
          href="/banner/add"
          className="px-3 py-1 sm:px-4 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
        >
          <span>Баннер нэмэх</span>
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-full bg-white border p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banner.map((list, index) => (
            <div
              key={index}
              className="w-full rounded-lg overflow-hidden relative group hover:border-b transition-all duration-300"
            >
              <div className="flex flex-col absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs sm:text-[10px]">{list.little}</span>
                <span className="text-[#0C9488] font-semibold text-sm sm:text-base">
                  {list.big}
                </span>
              </div>

              <div className="w-full group-hover:flex group-hover:border items-center justify-around absolute hidden h-16 sm:h-20 bg-white bottom-0 z-10 transition-all duration-300">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleDelete(list?._id!)}
                >
                  <Trash size={18} className="cursor-pointer text-red-500" />
                  <span className="text-xs sm:text-sm text-red-500">
                    Устгах
                  </span>
                </div>
                <Link
                  href={"/banner/edit/" + list._id!}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Edit size={18} className="cursor-pointer text-orange-500" />
                  <span className="text-xs sm:text-sm text-orange-500">
                    Засах
                  </span>
                </Link>
              </div>

              <div className="absolute bg-[#0C9488] text-white px-4 sm:px-8 py-1 rounded-bl-lg right-0 top-0 text-xs sm:text-sm">
                <span>{list.fileType === "image" ? "Зураг" : "Бичлэг"}</span>
              </div>

              <img
                src={"http://localhost:8001/uploads/" + list.file}
                className="w-full h-auto object-cover aspect-video z-0"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerList;
