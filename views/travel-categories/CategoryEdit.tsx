"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter, useParams } from "next/navigation";

const TravelCategoryEditView = () => {
  const [single, setSingle] = useState<{ name: string; photo: string } | null>(
    null
  );
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    photo: "",
  });
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://taiga.tanuweb.cloud/api/v1/category/${id}`)
        .then((res) => {
          setSingle(res.data.data);
          setForm({
            name: res.data.data.name || "",
            photo: res.data.data.photo || "",
          });
        })
        .catch((err) => console.error("Error fetching category data:", err));
    }
  }, [id]);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/category/${id}`, formData)
      .then((res) => {
        alert("category updated successfully!");
        router.push("/travel-categories");
      })
      .catch((err) => console.error("Error updating category:", err));
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялалын төрөл засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Column - Image Upload */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрлийн зураг</span>
            </div>
            <hr />
            <div className="w-full">
              {form.photo ? (
                <img
                  src={"https://taiga.tanuweb.cloud/uploads/" + form.photo}
                  alt="Аялалын төрөл"
                  className="w-full aspect-square"
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

        {/* Right Column - Form */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрөл</span>
            </div>
            <hr />
            <div className="w-full">
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
                    className="border py-2 text-xs px-4 rounded bg-white text-[#162c43]"
                    placeholder="Нэр оруулна уу"
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

export default TravelCategoryEditView;
