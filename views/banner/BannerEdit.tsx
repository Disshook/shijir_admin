"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter, useParams } from "next/navigation";

const BannerEditView = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    little: "",
    big: "",
    fileType: "image",
    photo: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8001/api/v1/banner/${id}`)
        .then((res) => {
          const bannerData = res.data.data;
          setSingle(bannerData);
          setForm({
            little: bannerData.little,
            big: bannerData.big,
            fileType: bannerData.fileType,
            photo: bannerData.file,
          });
        })
        .catch((err) => console.error("Error fetching banner:", err));
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    formData.append("little", form.little);
    formData.append("big", form.big);
    formData.append("fileType", form.fileType);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`http://localhost:8001/api/v1/banner/${id}`, formData)
      .then(() => {
        alert("Banner updated successfully!");
        router.push("/banner");
      })
      .catch((err) => console.error("Error updating banner:", err));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Баннер засах
        </span>
        <div
          className="px-3 sm:px-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full p-4 sm:p-10">
        <div className="w-full md:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43] text-base sm:text-lg">
                Баннер зураг
              </span>
            </div>
            <hr />
            <div className="w-full">
              {form.photo ? (
                <img
                  src={"http://localhost:8001/uploads/" + form.photo}
                  alt="Banner"
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <ImageUploader isSquare onFileChange={handleSingleFileChange} />
              )}
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43] text-base sm:text-lg">
                Баннер төрөл
              </span>
            </div>
            <hr />
            <div className="w-full p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full md:w-[50%]">
                  <label className="text-xs sm:text-sm text-[#162c43]">
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
                <div className="flex flex-col gap-2 w-full md:w-[50%]">
                  <label className="text-xs sm:text-sm text-[#162c43]">
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
              </div>

              <div className="flex flex-col gap-2 w-full mt-4">
                <label className="text-xs sm:text-sm text-[#162c43]">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerEditView;
