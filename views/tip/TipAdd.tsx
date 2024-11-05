"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter } from "next/navigation";

const TipAddView = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    title: "",
    subtitle: "",
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
    formData.append("subtitle", JSON.stringify(form.subtitle));

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://taiga.tanuweb.cloud/api/v1/tip", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/tip/");
      })
      .catch((er) => console.log(er));
  };

  const handleToggle = () => {
    setForm({
      ...form,
      isLink: !form.isLink,
    });
  };

  return (
    <>
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <div className="text-sm bg-white z-0 lg:text-lg text-[#162C43]">
          Зөвлөмж нэмэх
        </div>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-xs lg:text-sm"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зөвлөмжийн зураг</span>
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

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зөвлөмжийн тохиргоо</span>
            </div>
            <hr />
            <div className="w-full p-4 text-sm">
              <select
                name="language"
                className="w-full border rounded py-2 text-xs lg:text-sm"
                onChange={(e) => {
                  setForm({ ...form, language: e.target.value });
                }}
              >
                <option value="en">Англи</option>
                <option value="mn">Монгол</option>
                <option value="chn">Хятад</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зөвлөмж</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full p-4">
                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Зөвлөмжийн нэр</span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43]"
                    placeholder="Мэдээлэл г.м"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">
                    Зөвлөмжийн агуулга
                  </span>
                  <input
                    type="text"
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43]"
                    placeholder="Тайлбар г.м"
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

export default TipAddView;
