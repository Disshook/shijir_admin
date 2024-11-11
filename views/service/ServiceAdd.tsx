"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter } from "next/navigation";

const ServiceAddView = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    language: "en",
  });

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://taiga.tanuweb.cloud/api/v1/services/", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/service");
      })
      .catch((er) => console.log(er));
  };

  return (
    <>
      {/* Header Section */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">
          Үйлчилгээ нэмэх
        </span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Uploader) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
                Үйлчилгээний зураг
              </span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader isSquare onFileChange={handleSingleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs lg:text-sm text-[#162c43]">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
                Үйлчилгээ
              </span>
            </div>
            <hr />
            <div className="w-full p-4">
              <div className="flex  lg:flex-row w-full items-center gap-4">
                <div className="w-full lg:w-[50%]">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                    Үйлчилгээний нэр
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className="border py-2 pb-24 text-xs lg:text-sm px-4 rounded text-[#162c43] w-full"
                    placeholder="Мэдээлэл г.м"
                  />
                </div>
                <div className="w-full lg:w-[50%]">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                    Үйлчилгээний тайлбар
                  </span>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 pb-24 text-xs lg:text-sm px-4 rounded text-[#162c43] w-full"
                    placeholder="Мэдээлэл г.м"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceAddView;
