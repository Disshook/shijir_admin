"use client";
import { BannerModel } from "@/types/banner";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IMGURL } from "@/hooks/axios";
import axiosInstance from "@/hooks/axios";

interface Props {
  banner: BannerModel[];
}

const HomeList = ({ banner }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axiosInstance
          .delete("/home/" + id)
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
        <span className="text-[#162C43] text-base font-bold sm:text-lg">
          Нүүр хэсэг
        </span>

        <Link
          href="/home/add"
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
              <div className="absolute bottom-0 right-4 p-6 z-0 text-right">
                <span
                  style={{ color: list?.textcolor, width: "100%" }}
                  className={` text-[12px] w-[50%] font-bold text-[${list?.textcolor}]`}
                >
                  {list?.title}
                  <br />
                </span>
                <span className="text-[6px] text-white w-full mt-4 font-inter">
                  {list?.description}
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
                  href={"/home/edit/" + list._id}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Edit
                    size={18}
                    color="blue"
                    className="cursor-pointer text-blue-500"
                  />
                  <span className="text-xs sm:text-sm text-blue-500">
                    Засах
                  </span>
                </Link>
              </div>

              <div className="absolute bg-[#0C9488] text-white px-4 sm:px-8 py-1 rounded-bl-lg right-0 top-0 text-xs sm:text-sm">
                <span>{"Зураг"}</span>
              </div>

              <img
                src={IMGURL + list.file}
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

export default HomeList;
