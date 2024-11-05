"use client";
import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  faqs: any[];
}

const FaqsList = ({ faqs }: Props) => {
  const router = useRouter();
  const [faqsList, setFaqsList] = useState(faqs);

  const handleDelete = async (id: string) => {
    if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
      try {
        await axios.delete(`https://taiga.tanuweb.cloud/api/v1/faq/${id}`);
        alert("Амжилттай устгагдлаа");
        setFaqsList((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        alert("Алдаа гарлаа");
      }
    }
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 md:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">
          Түгээмэл асуултуудийн жагсаалт
        </span>
        <Link
          href="/faqs/add"
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Асуулт нэмэх
        </Link>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-4 w-full p-4 md:p-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-sm text-[#162C43] font-light">
              Нийт асуулт
            </span>
            <span className="font-semibold">{faqsList?.length || 0}</span>
          </div>
        </div>

        {/* Table */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="min-w-full text-[#162C43] rounded-lg w-full">
            <thead className="bg-[#FAFAFA] rounded-lg">
              <tr>
                <th className="w-[5%] text-center py-4 px-4 text-sm font-light">
                  Д/д
                </th>
                <th className="w-[50%] text-start py-4 px-4 text-sm font-light">
                  Асуулт
                </th>
                <th className="w-[20%] text-start py-4 px-4 text-sm font-light">
                  Хариулт
                </th>
                <th className="w-[25%] text-start py-4 px-4 text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {faqsList?.map((list, index) => (
                <tr key={list._id}>
                  <td className="text-sm text-center py-4">{index + 1}</td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs line-clamp-1">
                        {list?.question}
                      </span>
                    </div>
                  </td>
                  <td className="text-xs line-clamp-1 text-start p-4 flex items-center">
                    <div className="flex gap-2 items-center">
                      <span className="text-xs line-clamp-1">
                        {list?.answer}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={`/faqs/edit/${list._id}`}>
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
                        onClick={() => handleDelete(list?._id)}
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

export default FaqsList;
