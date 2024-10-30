"use client";
import IMGURL from "@/constants/Constants";
import { Additional } from "@/types/additional";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  additional: Additional;
}

const AdditionalView = ({ additional }: Props) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [form, setForm] = useState<Additional>(additional);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files ? e.target.files[0] : null);
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files ? e.target.files[0] : null);
  };

  const onUpdate = () => {
    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    if (cover) formData.append("cover", cover);
    Object.keys(form).forEach((key) => {
      formData.append(key, (form as any)[key]);
    });

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/additional/update`, formData)
      .then(() => {
        alert("Амжилттай хадгалагдлаа");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 md:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Сайтын тохиргоо</span>
        <div
          onClick={onUpdate}
          className="px-4 py-2 rounded bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-white"
        >
          <span>Өөрчлөх</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 md:p-10 text-[#162C43]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full bg-white flex flex-col rounded-lg overflow-hidden p-4 md:px-20 md:py-10">
            {/* Logo Section */}
            <div className="flex w-full items-center justify-between">
              <div className="w-20 aspect-square rounded-full bg-gray-300">
                <img
                  src={
                    logo == null
                      ? IMGURL + form.logo
                      : URL.createObjectURL(logo)
                  }
                  alt="logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <input
                  type="file"
                  className="hidden"
                  id="logo"
                  onChange={handleFileChange1}
                />
                <label htmlFor="logo">
                  <span className="text-sm border rounded px-4 py-2 cursor-pointer hover:bg-slate-300 transition-all duration-300">
                    Лого солих
                  </span>
                </label>
              </div>
            </div>
            <hr className="my-4" />

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Байгууллагийн нэр",
                  name: "company",
                  placeholder: "Танусофт г.м",
                },
                {
                  label: "Цахим хаяг",
                  name: "email",
                  placeholder: "admin@gmail.com г.м",
                },
                { label: "Утас", name: "phone", placeholder: "77000000 г.м" },
                { label: "Хаяг", name: "address", placeholder: "СБД г.м" },
                {
                  label: "Facebook",
                  name: "facebook",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Instagram",
                  name: "instagram",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Youtube",
                  name: "youtube",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Viber",
                  name: "viber",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Whatsapp",
                  name: "whatsapp",
                  placeholder: "Линк оруулна уу ?",
                },
              ].map(({ label, name, placeholder }, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xs text-[#162c43]">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Нийт аялалын тоо", name: "travels", placeholder: "" },
                {
                  label: "Нийт аялагчдын тоо",
                  name: "success",
                  placeholder: "",
                },
                {
                  label: "Туршлага",
                  name: "experience",
                  placeholder: "20 жил г.м",
                },
                {
                  label: "Тайлбар 1",
                  name: "description1",
                  placeholder: "г.м",
                },
                {
                  label: "Тайлбар 2",
                  name: "description2",
                  placeholder: "г.м",
                },
              ].map(({ label, name, placeholder }, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xs text-[#162c43]">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Cover Section */}
            <div className="flex w-full items-center justify-between mt-4">
              <div className="w-20 aspect-square rounded-full bg-gray-300">
                <img
                  src={
                    cover == null
                      ? IMGURL + form.cover
                      : URL.createObjectURL(cover)
                  }
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <input
                  type="file"
                  className="hidden"
                  id="cover"
                  onChange={handleFileChange2}
                />
                <label htmlFor="cover">
                  <span className="text-sm border rounded px-4 py-2 cursor-pointer hover:bg-slate-300 transition-all duration-300">
                    Ковер зураг солих
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalView;
