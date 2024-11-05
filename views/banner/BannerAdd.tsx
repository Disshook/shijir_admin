"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddBanner = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    little: "",
    big: "",
    fileType: "image",
    file: null,
  });

  const [cover, setCover] = useState<File | null>(null);

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCover(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("little", form.little);
    formData.append("big", form.big);
    formData.append("fileType", form.fileType);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("http://localhost:8001/api/v1/banner", formData)
      .then(() => {
        alert("Баннерыг амжилттай нэмлээ!");
        router.push("/banner");
      })
      .catch((err) => console.error("Error adding banner:", err));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Баннер нэмэх
        </span>
        <button
          onClick={onSubmit}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
        >
          Илгээх
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-full bg-white border p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Жижиг текст
              </label>
              <input
                type="text"
                name="little"
                value={form.little}
                onChange={handleFormValue}
                className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Том текст
              </label>
              <input
                type="text"
                name="big"
                value={form.big}
                onChange={handleFormValue}
                className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Файлын төрөл
              </label>
              <select
                name="fileType"
                value={form.fileType}
                onChange={handleFormValue}
                className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
              >
                <option value="image">Зураг</option>
                <option value="video">Бичлэг</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Файл оруулах
              </label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
