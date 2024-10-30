"use client";
import React from "react";
import { Edit, Eye, Trash } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Props {
  destinations: any[];
}

const DestinationList = ({ destinations }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("https://taiga.tanuweb.cloud/api/v1/destination/" + id)
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
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-10 top-0 z-0">
        <span className="text-[#162C43] text-sm lg:text-lg">
          Хүрэх газрын жагсаалт
        </span>
        <Link
          href={"/destinations/add"}
          className="px-3 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Хүрэх газар нэмэх
        </Link>
      </div>

      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-[#162C43] font-light">
              Нийт Хүрэх газар
            </span>
            <span className="font-semibold text-sm lg:text-lg">
              {destinations?.length}
            </span>
          </div>
        </div>

        {/* Responsive table */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="text-[#162C43] rounded-lg w-full min-w-[600px]">
            <thead className="bg-[#FAFAFA] rounded-lg w-full">
              <tr>
                <th className="w-[10%] text-center py-4 px-2 text-xs lg:text-sm font-light">
                  Д/д
                </th>
                <th className="w-[40%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Нэр
                </th>
                <th className="w-[20%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Тайлбар
                </th>
                <th className="w-[30%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {destinations?.map((list, index) => (
                <tr key={list._id} className="">
                  <td className="text-xs lg:text-sm text-center py-2 lg:py-4">
                    {index + 1}
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <img
                        src={
                          "https://taiga.tanuweb.cloud/uploads/" + list?.photo
                        }
                        alt=""
                        className="w-8 lg:w-10 aspect-square bg-[#CEEEEE] rounded"
                      />
                      <span className="text-xs lg:text-sm line-clamp-1">
                        {list?.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-xs lg:text-sm text-start py-4 lg:py-4">
                    <div
                      className="line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: list?.info }}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={"/destinations/edit/" + list._id}>
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
                        onClick={() => handleDelete(list._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DestinationList;
