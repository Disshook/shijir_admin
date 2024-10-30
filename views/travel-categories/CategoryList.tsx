"use client";
import React from "react";
import { Edit, Eye, Trash } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Props {
  travels: Category[];
} 

const CategoryList = ({ travels }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("https://taiga.tanuweb.cloud/api/v1/category/" + id)
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
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялалын төрлийн жагсаалт</span>
        <Link
          href={"/travel-categories/add"}
          className="px-4 py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Аялалын төрөл нэмэх
        </Link>
      </div>

      {/* Overview Section */}
      <div className="flex flex-col gap-4 w-full p-4 lg:p-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-sm text-[#162C43] font-light">
              Нийт аялалын төрөл
            </span>
            <span className="font-semibold">{travels.length}</span>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="text-[#162C43] rounded-lg w-full min-w-[600px]">
            <thead className="bg-[#FAFAFA] rounded-lg">
              <tr>
                <th className="w-[5%] text-center py-4 px-4 text-sm font-light">
                  Д/д
                </th>
                <th className="w-[50%] text-start py-4 px-4 text-sm font-light">
                  Аялалын нэр
                </th>
                <th className="w-[20%] text-start py-4 px-4 text-sm font-light">
                  Аялалын хэл
                </th>
                <th className="w-[25%] text-start py-4 px-4 text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {travels.map((list, index) => {
                return (
                  <tr key={index} className="">
                    <td className="text-sm text-center py-4">{index + 1}</td>
                    <td className="py-4">
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            "https://taiga.tanuweb.cloud/uploads/" + list?.photo
                          }
                          alt=""
                          className="w-8 aspect-square bg-[#CEEEEE] rounded"
                        />
                        <span className="text-xs line-clamp-1">
                          {list?.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-xs text-start py-4 flex items-center">
                      <div className="flex">
                        {list.language === "en"
                          ? "Англи"
                          : list.language === "kr"
                          ? "Солонгос"
                          : "Монгол"}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <Link href={"/travel-categories/edit/" + list._id}>
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
                            handleDelete(list?._id!);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
