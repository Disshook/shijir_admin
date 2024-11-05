"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter } from "next/navigation";
import Toggle from "react-toggle";

const TravelCategoryAdd = () => {
  const router = useRouter();
  const [form, setForm] = useState<Category>({
    name: "",
    isLink: false,
    language: "en",
    Link: "",
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
    formData.append("name", form.name);
    formData.append("isLink", JSON.stringify(form.isLink));
    formData.append("Link", form.Link);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("http://localhost:8001/api/v1/category", formData)
      .then(() => {
        alert("Амжилттай");
        router.push("/travel-categories");
      })
      .catch((er) => console.error(er));
  };

  const handleToggle = () => {
    setForm({
      ...form,
      isLink: !form.isLink,
    });
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялалын төрөл нэмэх</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Column - Image Upload & Settings */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          {/* Image Upload */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрлийн зураг</span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader isSquare onFileChange={handleSingleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>

          {/* Travel Category Settings */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрлийн тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">
                Линк рүү үсрэх эсэх
              </span>
              <Toggle
                id="cheese-status"
                defaultChecked={form.isLink}
                onChange={handleToggle}
              />
            </div>
            {form.isLink && (
              <div className="flex flex-col gap-2 w-full p-4">
                <span className="text-xs text-[#162c43]">Үсрэх линк</span>
                <input
                  type="text"
                  name="Link"
                  value={form.Link}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="https://facebook.com г.м"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрөл</span>
            </div>
            <hr />
            <div className="w-full p-4 flex items-center">
              <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                <span className="text-xs text-[#162c43]">
                  Аялалын төрлийн нэр
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="Гадаад аялал г.м"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelCategoryAdd;
